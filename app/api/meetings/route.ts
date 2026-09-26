import { getMeetings, getMeetingsByDate } from "@/lib/meetings-db";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  if (date && !DATE_PATTERN.test(date)) {
    return Response.json(
      { error: "Invalid date. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }

  try {
    const meetings = date
      ? await getMeetingsByDate(date)
      : await getMeetings(query, page);
    return Response.json(meetings);
  } catch (error) {
    console.error("GET /api/meetings failed:", error);
    return Response.json({ error: "Failed to load meetings" }, { status: 500 });
  }
}
