import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import EditMeetingForm from "./edit-form";

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Edit Meeting</h1>
      <EditMeetingForm meeting={meeting} />
    </div>
  );
}