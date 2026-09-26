import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import { formatMeetingDate } from "@/lib/format";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            {formatMeetingDate(meeting.date)}
          </h1>
          <p className="text-sm text-gray-500 capitalize mt-1">
            {meeting.meetingType} meeting
          </p>
        </div>
      </div>

      <div className="space-y-4 text-gray-800">
        <p><strong>Presiding:</strong> {meeting.presiding}</p>
        <p><strong>Conducting:</strong> {meeting.conducting}</p>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <div>
            <strong>Announcements:</strong>
            <ul className="list-disc ml-6 mt-1">
              {meeting.announcements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>Opening Hymn:</strong> #{meeting.openingHymn.number} –{" "}
          {meeting.openingHymn.title}
        </p>
        <p><strong>Opening Prayer:</strong> {meeting.openingPrayer}</p>

        {meeting.wardBusiness.length > 0 && (
          <div>
            <strong>Ward Business:</strong>
            <ul className="list-disc ml-6 mt-1">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>

        <p>
          <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} –{" "}
          {meeting.sacramentHymn.title}
        </p>

        {meeting.speakers.length > 0 && (
          <div>
            <strong>Speakers / Musical Numbers:</strong>
            <ul className="list-disc ml-6 mt-1">
              {meeting.speakers.map((item, index) => (
                <li key={index}>
                  {item.name}
                  {item.topic ? ` – ${item.topic}` : ""}{" "}
                  <span className="text-sm text-gray-500">
                    ({item.type})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>Closing Hymn:</strong> #{meeting.closingHymn.number} –{" "}
          {meeting.closingHymn.title}
        </p>
        <p><strong>Closing Prayer:</strong> {meeting.closingPrayer}</p>
      </div>
    </div>
  );
}