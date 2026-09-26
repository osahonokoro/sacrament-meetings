import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    return Response.json({ error: "Invalid meeting ID" }, { status: 400 });
  }

  try {
    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      return Response.json({ error: "Meeting not found" }, { status: 404 });
    }

    return Response.json(meeting);
  } catch (error) {
    console.error(`GET /api/meetings/${id} failed:`, error);
    return Response.json({ error: "Failed to load meeting" }, { status: 500 });
  }
}
