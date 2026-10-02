import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { formatMeetingDate } from "@/lib/format";
import { deleteMeetingAction } from "@/lib/actions";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <Link href={`/meetings/${meeting.id}`} className="block">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-blue-800">
            {formatMeetingDate(meeting.date)}
          </h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
            {meeting.meetingType}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Conducting: {meeting.conducting}
        </p>
        <p className="text-sm text-gray-600">
          Presiding: {meeting.presiding}
        </p>
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          Edit
        </Link>
        <form action={deleteMeetingAction}>
          <input type="hidden" name="id" value={meeting.id} />
          <button
            type="submit"
            className="text-sm font-medium text-red-600 hover:underline"
            aria-label={`Delete meeting on ${formatMeetingDate(meeting.date)}`}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}