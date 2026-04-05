"use client";
import { useState } from "react";

const bloodTypes = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
const empty = { name: "", blood: "", phone: "", station: "", address: "", division: "" };

export default function BloodDonorForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "নাম আবশ্যক";
    if (!form.blood) e.blood = "রক্তের গ্রুপ বেছে নিন";
    if (!form.phone.trim()) e.phone = "ফোন নম্বর আবশ্যক";
    else if (!/^01[3-9]\d{8}$/.test(form.phone.replace(/[-\s]/g, ""))) e.phone = "সঠিক বাংলাদেশি নম্বর দিন";
    if (!form.station.trim()) e.station = "থানার নাম আবশ্যক";
    if (!form.address.trim()) e.address = "ঠিকানা আবশ্যক";
    if (!form.division) e.division = "বিভাগ বেছে নিন";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    console.log("Donor data:", form);
    setForm(empty);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const field = (label: string, k: keyof typeof empty, placeholder = "", type = "text") => (
    <div>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">{label}</label>
      <input
        type={type}
        value={form[k] as string}
        onChange={e => { setForm({ ...form, [k]: e.target.value }); setErrors({ ...errors, [k]: "" }); }}
        placeholder={placeholder}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60 ${errors[k] ? "border-red-500/60" : "border-white/10"}`}
      />
      {errors[k] && <p className="text-red-400 text-xs mt-1.5">{errors[k]}</p>}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
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
        <div className="mb-8 text-center">
          <span className="text-4xl block mb-3">🩸</span>
          <h1 className="text-white font-bold text-2xl tracking-tight">নতুন রক্তদাতা যোগ করুন</h1>
          <p className="text-white/35 text-sm mt-1.5">নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন</p>
        </div>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 md:p-8 space-y-5">

          {field("পূর্ণ নাম", "name", "যেমন: Md Karim")}

          {/* Blood type */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">রক্তের গ্রুপ</label>
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

          {field("ফোন নম্বর", "phone", "01XXXXXXXXX", "tel")}

          {/* Division */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">বিভাগ</label>
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

          {field("থানা", "station", "যেমন: Dhamrai")}
          {field("সম্পূর্ণ ঠিকানা", "address", "যেমন: Kalampur, Dhamrai, Dhaka")}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-red-700 hover:bg-rose-600 text-white font-semibold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 text-sm mt-2 cursor-pointer"
          >
            🩸 রক্তদাতা যোগ করুন
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