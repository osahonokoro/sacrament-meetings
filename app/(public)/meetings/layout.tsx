// Member-facing meetings section. Site navigation lives in NavLinks (Header);
// this layout scopes loading.tsx and shared styling to the /meetings routes.
export default function PublicMeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section aria-label="Sacrament meetings">{children}</section>;
}
