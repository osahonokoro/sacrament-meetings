import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (isNaN(meetingId)) {
    return Response.json({ error: "Invalid meeting ID" }, { status: 400 });
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json({ error: "Meeting not found" }, { status: 404 });
  }

  return Response.json(meeting);
}