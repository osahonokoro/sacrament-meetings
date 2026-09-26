import { Suspense } from "react";
import { redirect } from "next/navigation";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Math.max(1, Math.floor(Number(searchParams?.page)) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  // A page past the end (e.g. an old link or hand-edited URL) goes to the last page.
  if (totalPages > 0 && currentPage > totalPages) {
    const params = new URLSearchParams({ page: String(totalPages) });
    if (query) params.set("query", query);
    redirect(`/meetings?${params.toString()}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-900">All Meetings</h1>

      <Suspense fallback={<div className="h-10 mb-6" />}>
        <MeetingSearch />
      </Suspense>

      {meetings.length === 0 ? (
        <p className="text-gray-700">
          {query ? `No meetings match "${query}".` : "No meetings found."}
        </p>
      ) : (
        <div className="grid gap-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {totalPages > 0 && (
        <Suspense fallback={null}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      )}
    </div>
  );
}
