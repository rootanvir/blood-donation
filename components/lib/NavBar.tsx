'use client'
import Link from "next/link";
import { useState } from "react";
import { LogIn } from 'lucide-react';
import { useRouter } from "next/navigation";

const navLinks = ["রক্তদাতা খুঁজুন", "ব্লাড ব্যাংক", "ক্যাম্পেইন", "আমাদের সম্পর্কে"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-500">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-5 ">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-3xl leading-none">🩸</span>
          <span className="font-bold text-xl text-white tracking-tight">
            <span className="text-rose-400">রক্ত</span> দান
          </span>
        </Link>

        {/* Desktop links */}
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
          <button 
            className="flex items-center gap-2 bg-rose-700 hover:bg-rose-600 p-2 rounded-full cursor-pointer px-6 shadow-lg transition-all"
            onClick={() => router.push("login")}
          >
            <span className="text-white">লগইন</span>
            <LogIn className="w-4 h-4 text-white" />
          </button>
        </ul>

        {/* Mobile: CTA pill + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="text-white p-1"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 pb-5 pt-3 flex flex-col gap-1 border-t border-white/10">
          {navLinks.map((l) => (
            <Link
              key={l}
              href="#"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-sm font-medium py-2.5 border-b border-white/10 last:border-0 no-underline transition-colors"
            >
              {l}
            </Link>
          ))}
          <button 
            className="flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-600 rounded-full cursor-pointer px-6 py-2.5 shadow-lg transition-all mt-2"
            onClick={() => router.push("login")}
          >
            <span className="text-white">লগইন</span>
            <LogIn className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </nav>
  );
}