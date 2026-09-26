export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <h1 className="text-3xl font-bold text-blue-900">
      Edit Meeting {id} — Coming in Week 04
    </h1>
  );
}
