"use client";
import { useState } from "react";
import { addDonor } from "@/components/lib/donors";

const bloodTypes = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
const empty = { name: "", blood: "", phone: "", station: "", address: "", division: "" };

export default function BloodDonorForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "নাম আবশ্যক";
    if (!form.blood) e.blood = "রক্তের গ্রুপ বেছে নিন";
    if (!form.phone.trim()) e.phone = "ফোন নম্বর আবশ্যক";
    else if (!/^01\d{9}$/.test(form.phone.replace(/[-\s]/g, ""))) e.phone = "সঠিক ১১ ডিজিটের নম্বর দিন";
    if (!form.station.trim()) e.station = "থানার নাম আবশ্যক";
    if (!form.division) e.division = "বিভাগ বেছে নিন";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      await addDonor(form);
      setForm(empty);
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Failed to add donor:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center px-4 py-5"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 100%, rgba(139,0,0,0.15) 0%, transparent 50%),
          #0f0505
        `,
      }}
    >
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-6 text-center">

          <p className="text-white font-bold text-2xl tracking-tight">নতুন রক্তদাতা যোগ করুন</p>
          <p className="text-white/35 text-sm mt-1.5">নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন</p>
        </div>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 md:p-8 space-y-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">পূর্ণ নাম</label>
            <input
              type="text"
              value={form.name}
              onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
              placeholder="যেমন: Md Karim"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60 ${errors.name ? "border-red-500/60" : "border-white/10"}`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
          </div>

          {/* Blood type */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">রক্তের গ্রুপ</label>
            <div className="grid grid-cols-4 gap-2">
              {bloodTypes.map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => { setForm({ ...form, blood: b }); setErrors({ ...errors, blood: "" }); }}
                  className={`cursor-pointer py-2.5 rounded-xl text-sm font-black border transition-all ${form.blood === b ? "bg-red-700 border-red-600 text-white" : "bg-white/5 border-white/10 text-rose-400 hover:bg-white/10"}`}
                >
                  {b}
                </button>
              ))}
            </div>
            {errors.blood && <p className="text-red-400 text-xs mt-1.5">{errors.blood}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">ফোন নম্বর</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
              placeholder="01XXXXXXXXX"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60 ${errors.phone ? "border-red-500/60" : "border-white/10"}`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
          </div>

          {/* Division */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">বিভাগ</label>
            <select
              value={form.division}
              onChange={e => { setForm({ ...form, division: e.target.value }); setErrors({ ...errors, division: "" }); }}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all focus:border-rose-500/60 ${errors.division ? "border-red-500/60" : "border-white/10"}`}
            >
              <option value="" disabled className="bg-[#1a0505]">বিভাগ বেছে নিন</option>
              {divisions.map(d => <option key={d} value={d} className="bg-[#1a0505]">{d}</option>)}
            </select>
            {errors.division && <p className="text-red-400 text-xs mt-1.5">{errors.division}</p>}
          </div>

          {/* Station */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">থানা</label>
            <input
              type="text"
              value={form.station}
              onChange={e => { setForm({ ...form, station: e.target.value }); setErrors({ ...errors, station: "" }); }}
              placeholder="যেমন: Dhamrai"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60 ${errors.station ? "border-red-500/60" : "border-white/10"}`}
            />
            {errors.station && <p className="text-red-400 text-xs mt-1.5">{errors.station}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">সম্পূর্ণ ঠিকানা <span className="text-emerald-500">(বাধ্যতামূলক নয়)</span></label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              placeholder="যেমন: Kalampur, Dhamrai, Dhaka"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-700 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 text-sm cursor-pointer"
          >
            {loading ? "সংরক্ষণ হচ্ছে..." : "🩸 রক্তদাতা যোগ করুন"}
          </button>

          {submitted && (
            <p className="text-center text-emerald-400 text-sm animate-pulse">
              ✓ সফলভাবে সংরক্ষিত হয়েছে
            </p>
          )}
        </div>
      </div>
    </div>
  );
}