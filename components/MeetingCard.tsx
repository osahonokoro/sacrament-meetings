import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-blue-800">
          {new Date(meeting.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
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
  );
}