export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Authentication will be added here in Week 05.
  return (
    <div>
      <p className="mb-6 rounded-md bg-amber-50 border border-amber-300 px-4 py-2 text-sm text-amber-900">
        Leader tools
      </p>
      {children}
    </div>
  );
}
