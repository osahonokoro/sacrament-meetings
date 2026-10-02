import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-blue-900 mb-3">
        Meeting not found
      </h1>
      <p className="text-gray-700 mb-6">
        We could not find a meeting with that ID. It may have been deleted, or
        the link may be incorrect.
      </p>
      <Link
        href="/meetings"
        className="inline-block rounded bg-blue-700 text-white px-4 py-2 font-medium hover:bg-blue-800"
      >
        Back to meetings
      </Link>
    </div>
  );
}