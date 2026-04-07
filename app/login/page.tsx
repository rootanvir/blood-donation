"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { managerLogin } from "@/app/actions/auth";

const empty = { user: "", pswd: "" };

export default function ManagerLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        let newErrors: Record<string, string> = {};

        if (!form.user.trim()) {
            newErrors.user = "ইউজার নাম দিতে হবে";
        }

        if (!form.pswd.trim()) {
            newErrors.pswd = "পাসওয়ার্ড দিতে হবে";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setIsLoading(true);
        setErrors({});

        try {
            const formData = new FormData();
            formData.append("user", form.user.trim());
            formData.append("pswd", form.pswd);

            await managerLogin(formData);
            
            // The redirect will happen in the server action
            // If we get here without error, manually redirect
            router.push("/manager");
            router.refresh();
        } catch (error: any) {
            // Handle the error message from server
            if (error.message === "NEXT_REDIRECT") {
                // This is the redirect, so we should redirect
                router.push("/manager");
                router.refresh();
            } else {
                setErrors({ general: error.message || "লগইন ব্যর্থ হয়েছে" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-950 ">

            {/* Back to home */}
            <div className="w-full max-w-md mb-6 ">
                <button
                    onClick={() => router.push("/")}
                    className="cursor-pointer inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    হোম পেজে ফিরে যান
                </button>
            </div>

            <div className="w-full max-w-md ">

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-4xl block mb-3">🩸</span>
                    <h1 className="text-white font-bold text-2xl tracking-tight">ম্যানেজার লগইন</h1>
                    <p className="text-white/35 text-sm mt-1.5">শুধুমাত্র অনুমোদিত ব্যক্তিদের জন্য</p>
                </div>

                {/* Security badge */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center gap-1.5 bg-emerald-900/20 border border-emerald-700/25 text-emerald-400 text-xs px-3 py-1.5 rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        সুরক্ষিত সংযোগ
                    </div>
                </div>

                <div className="bg-white/3 border border-gray-600 rounded-2xl p-6 md:p-8 space-y-4">

                    {/* Username Field */}
                    <div>
                        <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">ইউজার</label>
                        <input
                            type="text"
                            placeholder="*********"
                            value={form.user}
                            onChange={(e) => {
                                setForm({ ...form, user: e.target.value });
                                setErrors({ ...errors, user: "" });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60"
                        />
                        {errors.user && (
                            <p className="text-red-500 text-xs mt-1">{errors.user}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">পাসওয়ার্ড</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={form.pswd}
                                onChange={(e) => {
                                    setForm({ ...form, pswd: e.target.value });
                                    setErrors({ ...errors, pswd: "" });
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/8 focus:border-rose-500/60"
                            />
                            {errors.pswd && (
                                <p className="text-red-500 text-xs mt-1">{errors.pswd}</p>
                            )}

                            {/* Password Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* General Error */}
                    {errors.general && (
                        <p className="text-red-500 text-sm text-center bg-red-950/50 py-2 px-4 rounded-lg">
                            {errors.general}
                        </p>
                    )}

                    {/* Login Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-red-700 hover:bg-rose-600 disabled:bg-red-800/70 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.985] text-sm cursor-pointer disabled:cursor-not-allowed"
                    >
                        {isLoading ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}
                    </button>

                </div>

                <p className="text-center text-rose-500 text-xs mt-6">
                    অননুমোদিত প্রবেশ আইনত দণ্ডনীয়
                </p>
            </div>
        </div>
    );
}