import Link from "next/link";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-blue-800 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          Sacrament Meeting Planner
        </Link>
        <p className="text-sm">{today}</p>
      </div>
    </header>
  );
}