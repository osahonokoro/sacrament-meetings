// Meeting dates are stored as 'YYYY-MM-DD'. `new Date('YYYY-MM-DD')` parses as
// UTC midnight, so formatting in the viewer's local zone can show the previous
// day. Formatting in UTC keeps the calendar date exactly as stored.
export function formatMeetingDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
