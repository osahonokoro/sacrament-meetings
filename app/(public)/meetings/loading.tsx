export default function MeetingsLoading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse">
      <span className="sr-only">Loading meetings...</span>
      <div className="h-9 w-48 bg-gray-200 rounded mb-6" />
      <div className="h-10 w-full bg-gray-200 rounded mb-6" />
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
