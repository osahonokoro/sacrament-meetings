"use client";

import Link from "next/link";

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-red-700 mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-700 mb-6">
        We could not load the meetings list. This may be a temporary issue.
      </p>
      <p className="text-sm text-gray-500 mb-6">{error.message}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={reset}
          className="rounded bg-blue-700 text-white px-4 py-2 font-medium hover:bg-blue-800"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded border border-blue-700 text-blue-700 px-4 py-2 font-medium hover:bg-blue-50"
        >
          Back to meetings
        </Link>
      </div>
    </div>
  );
}