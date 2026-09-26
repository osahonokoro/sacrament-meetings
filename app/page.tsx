import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        Sacrament Meeting Planner
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Plan, view, and print sacrament meeting agendas for your ward or branch.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/meetings"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          View All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Current Meeting
        </Link>
      </div>
    </div>
  );
}