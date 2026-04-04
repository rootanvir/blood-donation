import Link from "next/link";

const navLinks = ["রক্তদাতা খুঁজুন", "ব্লাড ব্যাংক", "ক্যাম্পেইন", "আমাদের সম্পর্কে"];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#1A0A0A]/30 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="text-3xl leading-none">🩸</span>
        <span className="font-bold text-xl text-white tracking-tight">
          <span className="text-rose-400">রক্ত</span> দান
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((l) => (
          <li key={l}>
            <Link
              href="#"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors no-underline"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="#"
        className="hidden md:inline-flex items-center gap-2 bg-red-700 hover:bg-rose-500 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-700/30 no-underline"
      >
        🩸 এখনই দিন
      </Link>
    </nav>
  );
}