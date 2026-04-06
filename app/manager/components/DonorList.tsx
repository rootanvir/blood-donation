"use client";
import { useEffect, useState } from "react";
import { getDonors } from "@/components/lib/donors";

type Donor = {
  id: number;
  name: string;
  blood: string;
  phone: string;
  division: string;
  police_station: string;
  address: string;
  created_at: string;
};

export default function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getDonors();
        setDonors(data);
      } catch (err) {
        console.error("Failed to fetch donors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <p className="text-white/30 text-sm animate-pulse">লোড হচ্ছে...</p>
    </div>
  );

  if (donors.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <span className="text-4xl mb-3">🩸</span>
      <p className="text-white/30 text-sm">কোনো দাতা পাওয়া যায়নি</p>
    </div>
  );

  return (
    <div
      className="min-h-screen px-4 py-6 md:px-12"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 100%, rgba(139,0,0,0.15) 0%, transparent 50%),
          #0f0505
        `,
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-bold text-xl">দাতার তালিকা</h2>
            <p className="text-white/35 text-sm mt-0.5">মোট {donors.length} জন নিবন্ধিত দাতা</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* Head */}
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">নাম</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">গ্রুপ</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">ফোন</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">বিভাগ</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">থানা</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">ঠিকানা</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {donors.map((d, i) => (
                  <tr
                    key={d.id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-0"
                  >
                    <td className="px-4 py-3 text-white/30 text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{d.name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-10 h-7 rounded-lg bg-red-900/30 border border-red-700/30 text-rose-400 text-xs font-black">
                        {d.blood}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">{d.phone}</td>
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">{d.division}</td>
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">{d.police_station}</td>
                    <td className="px-4 py-3 text-white/40 text-xs">{d.address || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}