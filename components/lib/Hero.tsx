import React from "react";

const bloodTypes = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Hero glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 70% 50%, rgba(200,16,46,0.20) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 15% 80%, rgba(139,0,0,0.28) 0%, transparent 60%)
          `,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side - Text Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-red-900/30 border border-red-700/40 text-rose-400 text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-widest mb-7">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block animate-pulse" />
            প্রতি ২ সেকেন্ডে একজনের রক্ত প্রয়োজন
          </div>

          <h1 className="font-bold text-white leading-tight tracking-tight text-4xl md:text-5xl">
            একটি <span className="text-rose-400">রক্ত</span> দান, 
            <br />
            একটি <em className="text-rose-400 not-italic">জীবন বাঁচায়।</em>
          </h1>

          <p className="mt-6 text-white/60 font-light text-lg leading-relaxed max-w-md">
            বাংলাদেশের সবচেয়ে বড় রক্তদান নেটওয়ার্কে যোগ দিন। রক্তদাতাদের সাথে
            সংযুক্ত হন, ডোনেশন শিডিউল করুন এবং আজই আপনার সম্প্রদায়ে জীবন বাঁচাতে
            সাহায্য করুন।
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-red-700 hover:bg-rose-500 text-white font-medium px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-700/35"
            >
              🩸 রক্ত দিন
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-medium px-8 py-4 rounded-full transition-all"
            >
              🔍 রক্তদাতা খুঁজুন
            </a>
          </div>
        </div>

        {/* Right Side - Blood Types Card */}
        <div className="flex justify-center">
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 w-full max-w-sm overflow-hidden">
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(200,16,46,0.3), transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <span className="text-8xl block text-center mb-3 animate-bounce">
              🩸
            </span>

            <p className="text-white/35 text-xs text-center uppercase tracking-widest mb-4">
              উপলব্ধ রক্তের গ্রুপ
            </p>

            <div className="grid grid-cols-4 gap-2">
              {bloodTypes.map((type) => (
                <div
                  key={type}
                  className="rounded-xl py-3 text-center text-base font-black border bg-red-900/15 border-red-700/25 text-rose-400 hover:bg-red-900/30 hover:scale-105 transition-all cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                জরুরি রক্ত দরকার?
              </p>
              <a
                href="#"
                className="mt-2 inline-block bg-red-700 hover:bg-rose-500 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all w-full"
              >
                এখনই অনুরোধ করুন →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}