import Link from "next/link";

const footerLinks = {
  "প্ল্যাটফর্ম": ["রক্তদাতা খুঁজুন", "ব্লাড ব্যাংক", "রক্ত দিন", "রক্ত অনুরোধ করুন"],
  "প্রতিষ্ঠান": ["আমাদের সম্পর্কে", "ক্যাম্পেইন", "অংশীদার", "ব্লগ"],
  "সহায়তা": ["সাধারণ প্রশ্ন", "যোগাযোগ", "গোপনীয়তা নীতি", "শর্তাবলী"],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A0A0A] pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🩸</span>
              <span className="font-bold text-white text-lg">
                <span className="text-rose-400">রক্ত</span> দান
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              বাংলাদেশের সবচেয়ে বিশ্বস্ত রক্তদান প্ল্যাটফর্ম। ২০২১ সাল থেকে
              রক্তদাতাদের সাথে রোগীদের সংযুক্ত করে আসছি।
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:bg-red-700/30 hover:border-red-700/50 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8 text-white/25 text-xs">
          <span>© ২০২৬ রক্ত দান। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>🩸 বাংলাদেশ থেকে ভালোবাসা নিয়ে তৈরি</span>
        </div>
      </div>
    </footer>
  );
}