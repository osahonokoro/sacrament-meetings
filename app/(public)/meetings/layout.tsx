import Link from "next/link";

export default function PublicMeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav aria-label="Meetings" className="mb-6 print:hidden">
        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/meetings" className="text-blue-800 underline-offset-4 hover:underline">
              All Meetings
            </Link>
          </li>
          <li>
            <Link href="/meetings/current" className="text-blue-800 underline-offset-4 hover:underline">
              This Sunday
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
