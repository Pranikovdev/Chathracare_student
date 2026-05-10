import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const SERVICE_SLIDES = [
  { title: "Basic Health Metrics", desc: "Core baseline tracking for student wellness and screening readiness.", bg: "/gencheckup_b.png", thumb: "/gencheckup_s.png" },
  { title: "Dental Examination", desc: "Structured oral assessments with clear findings for school records.", bg: "/dental_b.png", thumb: "/dental_s.png" },
  { title: "Student Care Assistant", desc: "Focused evaluation of visible condition changes and nursing care concerns.", bg: "/injuries_b.png", thumb: "/injuries_s.png" },
  { title: "Provisional Diagnosis", desc: "Early clinical interpretation to speed follow-up and treatment planning.", bg: "/diagnosis_b.png", thumb: "/diagnosis_s.png" },
  { title: "Medical History", desc: "Build a complete health context for informed and proactive school care.", bg: "/medhistoy_b.png", thumb: "/medhistory_s.png" },
  { title: "Digital Health Card", desc: "Generate student-specific health summaries for clear and quick reference.", bg: "/digitalhs_b.png", thumb: "/digitalhs_s.png" },
];

export default function Home() {
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const handleHeroCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x: Math.max(-5, Math.min(5, -relY * 8)), y: Math.max(-7, Math.min(7, relX * 12)) });
  };

  const resetHeroCardTilt = () => setHeroTilt({ x: 0, y: 0 });

  useEffect(() => {
    const items = document.querySelectorAll(".reveal-on-scroll");
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar matchHero />
      <section id="home" className="relative overflow-hidden bg-[#1a3f8f]">
        <div className="absolute inset-0 hidden md:grid md:grid-cols-2 pointer-events-none">
          <div className="bg-gradient-to-br from-[#d7e4fb] via-[#b8ccf3] to-[#7d9fe0]" />
          <div className="bg-gradient-to-br from-[#173f8d] via-[#18459a] to-[#1d4aa0]" />
        </div>
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#1a3f8f] to-[#1a4db5] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-8%] top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[-8%] top-0 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        <div className="absolute left-2 top-[47%] z-20 -translate-y-1/2 hidden md:flex flex-row items-center gap-2">
          <span className="home-vertical-tag">CHATHRACARE</span>
          <span
            className="text-[0.6rem] font-semibold tracking-[0.16em] uppercase text-white/70 select-none whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Powered by TARQEN Solutions
          </span>
        </div>

        {/* MOBILE */}
        <div className="md:hidden relative z-10 px-5 pt-8 pb-12 flex flex-col items-center text-center">
          <span className="inline-flex bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-white">Student Health System</span>
          <h1 className="text-[2.1rem] font-extrabold mt-5 leading-[1.1] text-white tracking-tight">Smarter Care,{" "}<span className="text-[#93c5fd]">Stronger Schools</span></h1>
          <p className="text-blue-100 mt-4 text-[0.93rem] leading-relaxed max-w-sm">Centralized student medical records for schools with secure access, proactive tracking, and faster decisions for nurses and parents.</p>
          <div className="mt-8 w-full max-w-[260px] relative" onMouseMove={handleHeroCardMove} onMouseLeave={resetHeroCardTilt}>
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#d6e3fb] via-[#a7c1ef] to-[#5f84cb] shadow-[0_20px_40px_rgba(10,37,95,0.35)]" />
            <div className="relative z-10 m-3 aspect-[3/4] overflow-hidden rounded-[24px] border border-white/65 bg-[#eaf1ff]/95 shadow-inner">
              <img src="/doctor.png" alt="Doctor" className="h-full w-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <div className="bg-blue-700/90 backdrop-blur-sm text-white rounded-xl shadow-xl px-3 py-2.5 border border-blue-200/35">
                  <div className="text-[0.78rem] font-semibold">Trusted by Families, Doctors and Students</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 w-full max-w-sm">
            <HeroStat value="Comprehensive" label="Student records" />
            <HeroStat value="Dedicated" label="Nurse support" />
            <HeroStat value="Accelerated" label="Report delivery" />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-24 md:grid-cols-2 gap-10 items-center min-h-[520px]">
          <div className="relative flex justify-center md:justify-start reveal-on-scroll">
            <div className="relative w-full max-w-md md:translate-x-2 md:-translate-y-4 hero-card-parallax" onMouseMove={handleHeroCardMove} onMouseLeave={resetHeroCardTilt} style={{ "--hero-tilt-x": `${heroTilt.x}deg`, "--hero-tilt-y": `${heroTilt.y}deg` }}>
              <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-[#d6e3fb] via-[#a7c1ef] to-[#5f84cb] shadow-[0_24px_50px_rgba(10,37,95,0.30)]" />
              <div className="absolute -right-6 top-12 h-40 w-40 rounded-full border border-blue-100/50" />
              <div className="absolute -left-8 bottom-12 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
              <div className="relative z-10 m-6 aspect-[3/4] overflow-hidden rounded-[30px] border border-white/65 bg-[#eaf1ff]/95 shadow-[0_14px_30px_rgba(30,64,175,0.20)]">
                <img src="/doctor.png" alt="Doctor" className="h-full w-full object-cover drop-shadow-[0_20px_35px_rgba(15,23,42,0.26)]" />
                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <div className="bg-blue-700/90 backdrop-blur-sm text-white rounded-2xl shadow-xl px-5 py-3.5 border border-blue-200/35">
                    <div className="text-sm font-semibold tracking-[0.01em]">Trusted by Families, Doctors and Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white md:pl-6 reveal-on-scroll reveal-delay-1 flex flex-col items-start text-left">
            <span className="inline-flex bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.14em] uppercase">Student Health System</span>
            <h1 className="text-5xl lg:text-[4rem] font-extrabold mt-8 mb-8 leading-[1.03] text-white tracking-tight drop-shadow-[0_10px_22px_rgba(3,15,45,0.5)]">
              Smarter Care,<br />
              <span className="bg-gradient-to-r from-[#ffffff] via-[#dbeafe] to-[#93c5fd] bg-clip-text text-transparent">Stronger Schools</span>
            </h1>
            <p className="text-blue-100/95 mb-10 max-w-xl text-[1.03rem] leading-relaxed">Centralized student medical records for schools with secure access, proactive tracking, and faster decisions for nurses and parents.</p>
            <div className="mt-12 grid grid-cols-3 gap-3 max-w-3xl w-full">
              <HeroStat value="Comprehensive" label="Student records" />
              <HeroStat value="Dedicated" label="Nurse support" />
              <HeroStat value="Accelerated" label="Report delivery" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="pt-0 pb-8 -mt-6 md:-mt-10 relative z-10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-blue-100/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(239,246,255,0.9))] shadow-[0_24px_50px_rgba(30,64,175,0.16)] grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 p-2 md:p-4">
            <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-blue-200/45 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-orange-200/35 blur-3xl" />
            <Feature title="24/7 Access" desc="Student health records anytime." icon="clock" />
            <Feature title="Secure Records" desc="Protected by role-based access." icon="shield" />
            <Feature title="Easy Transfer" desc="Quick migration between schools." icon="transfer" />
            <Feature title="Health Card" desc="Student-specific health summaries." icon="shield" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pt-16 md:pt-20 pb-10 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="services-slider-head reveal-on-scroll">
            <div className="services-slider-copy">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full">WHAT WE DO</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-4 text-blue-900">Our Services</h2>
              <p className="text-gray-600 mt-3 max-w-2xl text-sm md:text-base">Chathracare provides a complete set of student health services that are easy to track, secure to manage, and simple to access.</p>
            </div>
          </div>
          <div className="reveal-on-scroll reveal-delay-1">
            <ServicesSlider slides={SERVICE_SLIDES} />
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section id="founder" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-70" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-100/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center mb-12 reveal-on-scroll">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full tracking-wide">
              Founder's Vision
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Text — always first on mobile, left on desktop */}
            <div className="reveal-on-scroll order-1 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 leading-snug">
                A Vision Rooted in <span className="text-blue-600">Purpose</span>
              </h2>

              {/* Opening quote mark */}
              <div className="text-6xl text-blue-200 font-serif leading-none mb-2 select-none">"</div>

              <div className="space-y-4 text-gray-600 text-[1.02rem] md:text-[1.05rem] leading-relaxed">
                <p>Coming from a middle-class family in rural India, I have personally witnessed the many challenges people face in accessing quality healthcare. These experiences shaped my perspective early in life and instilled in me a deep sense of responsibility to contribute meaningfully to society.</p>
                <p>After completing my medical education, I realized that one of the most crucial gaps in our healthcare system lies in the early identification and management of health issues among children and young individuals. The youth of our nation represent the true backbone of a developing country, and their health and well-being directly influence the future of our society.</p>
                <p>I strongly believe in the principle that <span className="font-semibold text-blue-800">prevention is better than cure</span>. Many long-term health problems can be significantly reduced if potential concerns are identified and addressed during the early stages of a child's growth and development. By systematically observing, understanding, and supporting students during their formative years, we can prevent numerous health complications later in life.</p>
                <p>My vision is to build a streamlined, efficient, and technologically integrated healthcare ecosystem that focuses on preventive care for children and youth. Through this initiative, we aspire to bridge the gap between technology and healthcare, creating a sustainable system that supports healthier generations and empowers communities with better awareness, early detection, and timely intervention.</p>
              </div>

              {/* Closing quote mark — right-aligned */}
              <div className="text-6xl text-blue-200 font-serif leading-none mt-2 select-none text-right">"</div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent" />
                <span className="text-xs text-blue-400 font-medium tracking-widest uppercase">CháthraCare</span>
              </div>
            </div>

            {/* Photo — second on mobile, right on desktop */}
            <div className="reveal-on-scroll reveal-delay-1 order-2 md:order-2 flex flex-col items-center md:sticky md:top-24">
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <div className="absolute inset-0 rounded-full border-[3px] border-blue-200 scale-110" />
                <div className="absolute inset-0 rounded-full border border-blue-100 scale-125 opacity-50" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(30,64,175,0.22)] bg-gradient-to-br from-blue-100 to-blue-200">
                  <img
                    src="https://res.cloudinary.com/dezv0qrah/image/upload/v1770066303/1_Dr._Jai_Vardhan_Reddy_Founder_CEO_kuiwkj.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover object-top relative z-10"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="absolute inset-0 items-center justify-center hidden">
                    <svg viewBox="0 0 24 24" className="w-24 h-24 text-blue-300" fill="currentColor">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-blue-900">Dr. Jayavardhan</h3>
                <p className="text-blue-500 text-sm mt-1 font-medium">Founder &amp; CEO, TARQEN Solutions</p>
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-100 rounded-2xl px-5 py-4 max-w-xs mx-auto shadow-sm">
                  <p className="text-blue-800 text-[0.85rem] italic leading-relaxed">
                    "Prevention is better than cure — and every child deserves a healthier tomorrow."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sample Screening Report */}
      <section id="sample-report" className="py-20 md:py-28 bg-[#F1F5F9] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-14 reveal-on-scroll">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full tracking-wide">
              Sample Report
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mt-4 text-blue-900">
              What a Screening Report Looks Like
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
              Every student gets a structured, confidential health record — accessible to nurses, parents, and administrators.
            </p>
          </div>

          {/* Report Card */}
          <div className="reveal-on-scroll bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

            {/* Top bar */}
            <div className="bg-gradient-to-r from-[#1a3f8f] to-[#1d4aa0] px-6 md:px-10 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" /><path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Health Record Portal</p>
                  <p className="text-blue-200 text-[0.7rem]">Verified Institutional Data • Confidential</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex bg-white/15 border border-white/20 text-white text-[0.7rem] font-semibold px-3 py-1.5 rounded-full">
                Sample Preview
              </span>
            </div>

            <div className="p-4 sm:p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

              {/* Left: Student Profile — horizontal on mobile, vertical on desktop */}
              <div className="lg:col-span-1 space-y-4">

                {/* Profile card: side-by-side avatar+name on mobile */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100">
                  <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border-4 border-white shadow-md">
                      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                    <div className="sm:text-center">
                      <h3 className="text-base sm:text-lg font-black text-gray-900">Arjun K. Sharma</h3>
                      <p className="text-[0.65rem] font-bold text-blue-600 uppercase tracking-widest mt-0.5">ID: TRQ-2025-089</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-slate-200 my-3 sm:my-4" />
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                    {[
                      { label: "Age / Gender", value: "14 / Male" },
                      { label: "Blood Group", value: "O+", valueClass: "text-red-600" },
                      { label: "Grade / Section", value: "9th / B" },
                      { label: "Enrollment", value: "June 2023" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-[0.6rem] font-bold text-gray-400 uppercase">{item.label}</p>
                        <p className={`text-xs sm:text-sm font-bold mt-0.5 ${item.valueClass || "text-gray-800"}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security card: collapsed to 2-col row on mobile */}
                <div className="bg-[#1a2a4a] rounded-2xl p-4 sm:p-6 text-white">
                  <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-teal-400">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" /><path d="M9 12l2 2 4-4" />
                    </svg>
                    Security Status
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[0.6rem] text-gray-400 font-bold uppercase mb-1">Data Encryption</p>
                      <p className="text-[0.7rem] sm:text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shrink-0" /> AES-256 Multi-Layer
                      </p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[0.6rem] text-gray-400 font-bold uppercase mb-1">Access Logging</p>
                      <p className="text-[0.7rem] sm:text-xs font-medium">Institutional Admin Only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Medical Data */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">

                {/* Vitals: 2-col on mobile, 4-col on md+ */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100">
                  <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-3 sm:mb-5 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Latest Vitals Summary
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { label: "Heart Rate", value: "72 bpm", status: "Normal", bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-600" },
                      { label: "SpO2", value: "99%", status: "Optimal", bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-600" },
                      { label: "Height", value: "162 cm", status: "85th Pct.", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
                      { label: "Weight", value: "54 kg", status: "Healthy", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
                    ].map((item) => (
                      <div key={item.label} className={`p-3 sm:p-4 rounded-xl border ${item.bg} ${item.border}`}>
                        <p className="text-[0.58rem] sm:text-[0.62rem] font-bold text-gray-400 uppercase mb-1">{item.label}</p>
                        <p className="text-base sm:text-xl font-black text-gray-900">{item.value}</p>
                        <p className={`text-[0.58rem] sm:text-[0.62rem] font-bold uppercase mt-1 ${item.text}`}>{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual/Dental + Growth — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100">
                    <h5 className="font-bold text-sm text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      Visual &amp; Dental
                    </h5>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { label: "Visual Acuity (L/R)", value: "6/6, 6/6", pct: 100, bar: "bg-teal-500" },
                        { label: "Dental Health Index", value: "Grade A", pct: 80, bar: "bg-blue-500" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-[0.7rem] sm:text-xs font-semibold text-gray-600">{item.label}</span>
                            <span className="text-[0.7rem] sm:text-xs font-black text-gray-900">{item.value}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full ${item.bar} rounded-full`} style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      ))}
                      <p className="text-[0.62rem] text-gray-400 italic pt-1">*Screened Jan 14, 2025 by Dr. Sarah J.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100">
                    <h5 className="font-bold text-sm text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-teal-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                      </svg>
                      Growth Analytics
                    </h5>
                    <div className="h-20 sm:h-24 flex items-end gap-1 sm:gap-1.5 px-1">
                      {[40, 55, 65, 80, 75, 90, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-teal-100 rounded-t-md relative h-full">
                          <div className="absolute bottom-0 left-0 right-0 bg-teal-500 rounded-t-md" style={{ height: `${h}%` }} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 sm:mt-3 flex justify-between text-[0.58rem] sm:text-[0.62rem] font-bold text-gray-400 uppercase">
                      <span>2023 Intake</span><span>Jan 2025</span>
                    </div>
                  </div>
                </div>

                {/* Physician Summary */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-[0.04]">
                    <svg viewBox="0 0 24 24" className="w-16 h-16 sm:w-20 sm:h-20 text-gray-900" fill="currentColor">
                      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-2 sm:mb-3">Physician's Summary</h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    Student shows excellent physiological progress. Nutrition markers are within optimal ranges. Recommended continuing existing sports participation and standard caloric intake protocols. No allergies or chronic conditions noted.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-teal-50 text-teal-700 text-[0.65rem] sm:text-[0.7rem] font-bold rounded-full border border-teal-100">Cleared for Sports</span>
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[0.65rem] sm:text-[0.7rem] font-bold rounded-full border border-blue-100">Longitudinal Peak Care</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom disclaimer */}
            <div className="border-t border-slate-100 px-6 md:px-10 py-4 bg-slate-50 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-[0.7rem] text-gray-400">* Sample report for demonstration only. All data is fictional.</p>
              <span className="text-[0.7rem] font-bold text-blue-600 uppercase tracking-wide">CháthraCare · Confidential</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Sub-components */

function HeroStat({ value, label }) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-2 py-2.5 md:px-4 md:py-3 min-w-0">
      <div className="text-[0.72rem] sm:text-[0.85rem] md:text-[1.05rem] font-semibold text-white leading-tight">{value}</div>
      <div className="text-[0.68rem] sm:text-[0.8rem] md:text-[0.95rem] text-blue-200 mt-0.5 leading-tight">{label}</div>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className="group relative z-10 overflow-hidden rounded-xl md:rounded-2xl border border-blue-100/90 bg-[linear-gradient(155deg,rgba(255,255,255,0.96),rgba(236,245,255,0.88))] px-3 py-4 md:px-4 md:py-5 text-center shadow-[0_14px_28px_rgba(30,64,175,0.11)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(30,64,175,0.2)]">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-blue-500 via-blue-400 to-orange-400 opacity-85" />
      <div className="relative z-10 w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-100 via-white to-orange-100 text-blue-700 flex items-center justify-center mx-auto ring-1 ring-blue-100/70">
        {icon === "clock" && (<svg viewBox="0 0 24 24" className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>)}
        {icon === "shield" && (<svg viewBox="0 0 24 24" className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" /><path d="M9 12l2 2 4-4" /></svg>)}
        {icon === "transfer" && (<svg viewBox="0 0 24 24" className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h11l-3-3" /><path d="M17 17H6l3 3" /></svg>)}
      </div>
      <h3 className="font-semibold text-blue-900 text-[0.8rem] md:text-[1.3rem] mt-2 md:mt-3.5 leading-tight">{title}</h3>
      <p className="text-[0.7rem] md:text-[0.95rem] text-blue-600/95 mt-1 md:mt-2 leading-relaxed hidden sm:block">{desc}</p>
    </div>
  );
}

function ServicesSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width:767px)").matches;

  const centerCard = (index, behavior = "smooth") => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !track.children[index]) return;
    const card = track.children[index];
    if (isMobile()) {
      if (index === 0) { wrap.scrollTo({ top: 0, behavior }); return; }
      if (index === slides.length - 1) { wrap.scrollTo({ top: wrap.scrollHeight - wrap.clientHeight, behavior }); return; }
      wrap.scrollTo({ top: card.offsetTop - (wrap.clientHeight / 2 - card.clientHeight / 2), behavior });
      return;
    }
    if (index === 0) { wrap.scrollTo({ left: 0, behavior }); return; }
    if (index === slides.length - 1) { wrap.scrollTo({ left: wrap.scrollWidth - wrap.clientWidth, behavior }); return; }
    wrap.scrollTo({ left: card.offsetLeft - (wrap.clientWidth / 2 - card.clientWidth / 2), behavior });
  };

  const activate = (index, shouldScroll = true) => {
    const next = Math.min(Math.max(index, 0), slides.length - 1);
    if (next === activeIndex) return;
    setActiveIndex(next);
    if (shouldScroll) requestAnimationFrame(() => centerCard(next));
  };

  const go = (step) => activate(activeIndex + step, true);
  const onTouchStart = (e) => { touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) go((isMobile() ? dy : dx) > 0 ? -1 : 1);
  };

  useEffect(() => {
    centerCard(activeIndex, "auto");
    const onResize = () => centerCard(activeIndex, "auto");
    const onKeyDown = (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("keydown", onKeyDown); };
  }, [activeIndex]);

  return (
    <div className="services-slider-shell">
      <div className="services-slider-controls">
        <button type="button" className="services-nav-btn" aria-label="Previous service" onClick={() => go(-1)} disabled={activeIndex === 0}>‹</button>
        <button type="button" className="services-nav-btn" aria-label="Next service" onClick={() => go(1)} disabled={activeIndex === slides.length - 1}>›</button>
      </div>
      <div className="services-slider-wrap" ref={wrapRef}>
        <div className="services-slider-track" ref={trackRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {slides.map((slide, index) => (
            <article key={slide.title} className="services-project-card" data-active={index === activeIndex ? "true" : undefined}
              onMouseEnter={() => window.matchMedia("(hover:hover)").matches && activate(index, true)}
              onClick={() => activate(index, true)}>
              <img className="services-project-card-bg" src={slide.bg} alt="" />
              <div className="services-project-card-content">
                <img className="services-project-card-thumb" src={slide.thumb} alt={slide.title} />
                <div>
                  <h3 className="services-project-card-title">{slide.title}</h3>
                  <p className="services-project-card-desc">{slide.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="services-slider-dots">
        {slides.map((slide, index) => (
          <button type="button" key={slide.title} aria-label={`Go to ${slide.title}`}
            className={`services-slider-dot${index === activeIndex ? " active" : ""}`}
            onClick={() => activate(index, true)} />
        ))}
      </div>
    </div>
  );
}
