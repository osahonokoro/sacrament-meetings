import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getMeetingsByDate } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  // Opt out of build-time prerendering: "this Sunday" must be computed per request.
  await connection();

  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay()); // 0 = Sunday

  // Build YYYY-MM-DD from local date parts (toISOString would shift to UTC).
  const sundayDate = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const meetings = await getMeetingsByDate(sundayDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  // Fallback if no meeting is found for this Sunday
  redirect("/meetings");
}
