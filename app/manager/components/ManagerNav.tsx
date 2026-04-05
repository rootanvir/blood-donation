"use client";
import { useState } from "react";

const tabs = [
  { id: "add", label: "রক্তদাতা যোগ", icon: "🩸" },
  { id: "list", label: "দাতার তালিকা", icon: "📋" },
  { id: "requests", label: "রক্তের অনুরোধ", icon: "🔔" },
  { id: "camps", label: "ক্যাম্পেইন", icon: "📍" },
  { id: "settings", label: "সেটিংস", icon: "⚙️" },
];

export default function ManagerNav({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeTab = tabs.find(t => t.id === active);

  return (
    <div>

      {/* Desktop tab bar */}
      <div className="hidden md:block border-b border-white/8 bg-black/10 overflow-x-auto">
        <div className="flex min-w-max px-12">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${active === t.id
                ? "border-rose-500 text-white"
                : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
                }`}
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tab bar - dropdown */}
      <div className="md:hidden border-b border-gray-800 bg-black/10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer"
        >
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <span>{activeTab?.icon}</span>
            <span>{activeTab?.label}</span>
          </div>
          <svg
            className={`w-4 h-4 text-white/70 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {menuOpen && (
          <div className="border-t border-white/8 pb-1">
            {tabs.filter(t => t.id !== active).map(t => (
              <button
                key={t.id}
                onClick={() => { setActive(t.id); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-5 py-3 text-sm transition-all cursor-pointer text-white/40 hover:text-white/70 hover:bg-white/5 border-l-2 border-transparent"
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}