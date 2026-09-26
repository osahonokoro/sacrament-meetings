"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "This Sunday" },
  { href: "/meetings/new", label: "New Meeting" },
];

// "/" and the fixed sub-routes match exactly; "Meetings" also stays active on a
// meeting's detail page (/meetings/5) but not on /meetings/current or /meetings/new.
function isActive(pathname: string, href: string): boolean {
  if (href !== "/meetings") return pathname === href;
  return (
    pathname === "/meetings" ||
    (pathname.startsWith("/meetings/") &&
      !links.some((l) => l.href !== "/meetings" && pathname === l.href))
  );
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap gap-1">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-md px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-white ${
                  active
                    ? "bg-white text-blue-900 font-semibold"
                    : "text-white hover:bg-blue-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
