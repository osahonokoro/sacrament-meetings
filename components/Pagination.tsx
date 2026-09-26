"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const linkClass =
  "rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition";
const disabledClass =
  "rounded-lg bg-gray-200 px-4 py-2 text-gray-600 cursor-not-allowed";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between gap-4"
    >
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className={linkClass}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>Previous</span>
      )}

      <span className="text-gray-800 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className={linkClass}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>Next</span>
      )}
    </nav>
  );
}
