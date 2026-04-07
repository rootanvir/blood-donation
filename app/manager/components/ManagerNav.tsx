"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/logout";

const tabs = [
  { id: "add", label: "রক্তদাতা যোগ", icon: "🩸" },
  { id: "list", label: "দাতার তালিকা", icon: "📋" },
  { id: "requests", label: "রক্তের অনুরোধ", icon: "🔔" },
  { id: "camps", label: "ক্যাম্পেইন", icon: "📍" },
  { id: "settings", label: "সেটিংস", icon: "⚙️" },
];

export default function ManagerNav({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?");
    
    if (!confirmLogout) {
      return;
    }
    
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("লগআউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* ── Desktop nav ── */}
      <div className="hidden md:flex items-center justify-between border-b border-white/8 bg-black/20 backdrop-blur-md px-8 h-14">

        {/* Left — brand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-lg">🩸</span>
          <span className="font-bold text-white text-base tracking-tight">
            <span className="text-rose-400">রক্ত</span> দান
          </span>
        </div>

        {/* Center — tabs */}
        <div className="flex items-center h-full">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-1.5 px-4 h-full text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                active === t.id
                  ? "border-rose-500 text-white"
                  : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              <span className="text-sm">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Right — notification + logout */}
        <div className="shrink-0 flex items-center gap-3">
          {/* Notification button */}
          <button className="relative p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/8 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {/* Logout button - Desktop only */}
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">
              {isLoggingOut ? "লগআউট..." : "লগআউট"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile top bar (no logout button here) ── */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/8 bg-black/20 backdrop-blur-md">

        {/* Left — hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center — brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg">🩸</span>
          <span className="font-bold text-white text-base tracking-tight">
            <span className="text-rose-400">রক্ত</span> দান
          </span>
        </div>

        {/* Right — only notification button (no logout) */}
        <button className="relative p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
      </div>

      {/* ── Mobile sidebar overlay with logout button in drawer ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 h-full bg-[#130303] border-r border-white/10 flex flex-col z-10">

            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <span className="text-xl">🩸</span>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">রক্তদান ব্যবস্থাপনা</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sidebar links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setActive(t.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    active === t.id
                      ? "bg-rose-500/15 text-white border border-rose-500/25"
                      : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Sidebar footer with logout button (only in drawer) */}
            <div className="px-5 py-4 border-t border-white/8 space-y-3">
              {/* Logout button in drawer for mobile */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{isLoggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}</span>
              </button>
              
              {/* System status */}
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/30">সিস্টেম সক্রিয়</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}