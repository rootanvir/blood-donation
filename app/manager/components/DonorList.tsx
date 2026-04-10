"use client";
import { useEffect, useState, useMemo } from "react";
import { getDonors, getAllDonors } from "@/components/lib/donors";

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

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const DIVISIONS = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
const PAGE_SIZE = 10;

const selectStyle: React.CSSProperties = {
  background: "#1a0808",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "8px 16px",
  fontSize: "14px",
  color: "rgba(255,255,255,0.7)",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "36px",
};

export default function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchThana, setSearchThana] = useState("");
  const [filterBlood, setFilterBlood] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [page, setPage] = useState(1);

  // Fetch ONLY the first 10 donors initially
  useEffect(() => {
    const fetchInitialDonors = async () => {
      try {
        setLoading(true);
        const { data, count } = await getDonors(10); // Only fetches 10 most recent donors
        setDonors(data);
        setTotalCount(count || 0);
      } catch (err) {
        console.error("Failed to fetch donors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialDonors();
  }, []);

  const isSearching = searchName.trim() !== "" || searchThana.trim() !== "" || filterBlood !== "" || filterDivision !== "";

  // When searching, fetch ALL donors and filter
  useEffect(() => {
    if (!isSearching) {
      // Reset to initial 10 donors when search is cleared
      const resetToInitial = async () => {
        setLoading(true);
        try {
          const { data, count } = await getDonors(10);
          setDonors(data);
          setTotalCount(count || 0);
        } catch (err) {
          console.error("Failed to reset donors:", err);
        } finally {
          setLoading(false);
        }
      };
      resetToInitial();
      return;
    }
    
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const allData = await getAllDonors(); // Fetch all for search
        const filtered = allData.filter((d) => {
          const matchName = !searchName || d.name.toLowerCase().includes(searchName.toLowerCase());
          const matchThana = !searchThana || d.police_station.toLowerCase().includes(searchThana.toLowerCase());
          const matchBlood = !filterBlood || d.blood === filterBlood;
          const matchDivision = !filterDivision || d.division === filterDivision;
          return matchName && matchBlood && matchDivision && matchThana;
        });
        setDonors(filtered);
        setTotalCount(filtered.length);
        setPage(1);
      } catch (err) {
        console.error("Failed to search donors:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [searchName, searchThana, filterBlood, filterDivision, isSearching]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const paginated = isSearching 
    ? donors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : donors; // Already only 10 donors

  if (loading && donors.length === 0) return (
    <div className="flex items-center justify-center py-32">
      <p className="text-white/30 text-sm animate-pulse">লোড হচ্ছে...</p>
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
        <div className="mb-6">
          <h2 className="text-white font-bold text-xl">দাতার তালিকা</h2>
          <p className="text-white/35 text-sm mt-0.5">
            মোট {totalCount} জন নিবন্ধিত দাতা
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-3 mb-3">
          <input
            type="text"
            placeholder="নাম দিয়ে খুঁজুন..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="flex-1 min-w-[150px] rounded-xl px-4 py-2 text-sm text-white placeholder-white/25 outline-none transition-colors"
            style={{ background: "#1a0808", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <input
            type="text"
            placeholder="থানা দিয়ে খুঁজুন..."
            value={searchThana}
            onChange={(e) => setSearchThana(e.target.value)}
            className="flex-1 min-w-[150px] rounded-xl px-4 py-2 text-sm text-white placeholder-white/25 outline-none transition-colors"
            style={{ background: "#1a0808", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <select value={filterBlood} onChange={(e) => setFilterBlood(e.target.value)} style={selectStyle}>
            <option value="" style={{ background: "#1a0808", color: "rgba(255,255,255,0.6)" }}>সব রক্তের গ্রুপ</option>
            {BLOOD_GROUPS.map((b) => (
              <option key={b} value={b} style={{ background: "#1a0808", color: "white" }}>{b}</option>
            ))}
          </select>
          <select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} style={selectStyle}>
            <option value="" style={{ background: "#1a0808", color: "rgba(255,255,255,0.6)" }}>সব বিভাগ</option>
            {DIVISIONS.map((div) => (
              <option key={div} value={div} style={{ background: "#1a0808", color: "white" }}>{div}</option>
            ))}
          </select>
        </div>

        {/* Result count — shown only when searching */}
        {isSearching && (
          <p className="text-white/40 text-xs mb-4 px-1">
            {totalCount === 0
              ? "কোনো ফলাফল পাওয়া যায়নি"
              : `${totalCount} জন পাওয়া গেছে`}
          </p>
        )}

        {/* Table */}
        <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {["#", "নাম", "গ্রুপ", "ফোন", "বিভাগ", "থানা", "ঠিকানা"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <span className="text-3xl mb-2">🩸</span>
                        <p className="text-white/30 text-sm">কোনো দাতা পাওয়া যায়নি</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((d, i) => (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-0">
                      <td className="px-4 py-3 text-white/30 text-xs">
                        {isSearching ? (page - 1) * PAGE_SIZE + i + 1 : i + 1}
                      </td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination — only when searching and results exceed one page */}
        {isSearching && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-1">
            <p className="text-white/25 text-xs">
              পৃষ্ঠা {page} / {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ background: "#2a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              >
                ← আগে
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ background: "#2a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              >
                পরে →
              </button>
            </div>
          </div>
        )}

        {/* Footer — default mode */}
        {!isSearching && (
          <p className="text-white/20 text-xs mt-3 px-1">সর্বশেষ ১০ জন দাতা দেখানো হচ্ছে</p>
        )}

      </div>
    </div>
  );
}