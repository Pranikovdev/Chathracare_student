import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const SERVICE_SLIDES = [
  {
    title: "Basic Health Metrics",
    desc: "Core baseline tracking for student wellness and screening readiness.",
    bg: "/gencheckup_b.png",
    thumb: "/gencheckup_s.png",
  },
  {
    title: "Dental Examination",
    desc: "Structured oral assessments with clear findings for school records.",
    bg: "/dental_b.png",
    thumb: "/dental_s.png",
  },
  {
    title: "Student Care Assistant",
    desc: "Focused evaluation of visible condition changes and nursing care concerns.",
    bg: "/injuries_b.png",
    thumb: "/injuries_s.png",
  },
  {
    title: "Provisional Diagnosis",
    desc: "Early clinical interpretation to speed follow-up and treatment planning.",
    bg: "/diagnosis_b.png",
    thumb: "/diagnosis_s.png",
  },
  {
    title: "Medical History",
    desc: "Build a complete health context for informed and proactive school care.",
    bg: "/medhistoy_b.png",
    thumb: "/medhistory_s.png",
  },
  {
    title: "Digital Health Card",
    desc: "Generate student-specific health summaries for clear and quick reference.",
    bg: "/digitalhs_b.png",
    thumb: "/digitalhs_s.png",
  },
];

export default function Home() {
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const handleHeroCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = Math.max(-5, Math.min(5, -relY * 8));
    const tiltY = Math.max(-7, Math.min(7, relX * 12));
    setHeroTilt({ x: tiltX, y: tiltY });
  };

  const resetHeroCardTilt = () => setHeroTilt({ x: 0, y: 0 });

  useEffect(() => {
    const items = document.querySelectorAll(".reveal-on-scroll");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar matchHero />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden pb-24 bg-[#153f8f]">
        <div className="absolute inset-0 grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-[#d7e4fb] via-[#b8ccf3] to-[#7d9fe0] md:rounded-tl-[28px] md:rounded-tr-[56px]" />
          <div className="bg-gradient-to-br from-[#173f8d] via-[#18459a] to-[#1d4aa0]" />
        </div>
        <div className="absolute left-4 top-[47%] z-20 -translate-y-1/2 hidden md:block">
          <span className="home-vertical-tag">
            CHATHRACARE
          </span>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-8%] top-20 w-80 h-80 rounded-full bg-white/50 blur-3xl" />
          <div className="absolute right-[-8%] top-0 w-[28rem] h-[28rem] rounded-full bg-blue-200/20 blur-3xl" />
          <div className="absolute right-16 bottom-8 w-64 h-64 rounded-full border border-blue-200/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
          {/* Left Curved Blue Panel */}
          <div className="relative flex justify-center md:justify-start reveal-on-scroll">
            <div
              className="relative w-full max-w-md md:translate-x-2 md:-translate-y-4 hero-card-parallax"
              onMouseMove={handleHeroCardMove}
              onMouseLeave={resetHeroCardTilt}
              style={{
                "--hero-tilt-x": `${heroTilt.x}deg`,
                "--hero-tilt-y": `${heroTilt.y}deg`,
              }}
            >
              <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-[#d6e3fb] via-[#a7c1ef] to-[#5f84cb] shadow-[0_24px_50px_rgba(10,37,95,0.30)]" />
              <div className="absolute -right-6 top-12 h-40 w-40 rounded-full border border-blue-100/50" />
              <div className="absolute -left-8 bottom-12 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
              <div className="relative z-10 m-4 md:m-6 aspect-[3/4] overflow-hidden rounded-[30px] border border-white/65 bg-[#eaf1ff]/95 shadow-[0_14px_30px_rgba(30,64,175,0.20)]">
                <img
                  src="/doctor.png"
                  alt="Doctor"
                  className="h-full w-full object-cover drop-shadow-[0_20px_35px_rgba(15,23,42,0.26)]"
                />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-20">
                  <div className="bg-blue-700/90 backdrop-blur-sm text-white rounded-2xl shadow-xl px-5 py-3.5 border border-blue-200/35">
                    <div className="text-sm font-semibold tracking-[0.01em]">Trusted by Families, Doctors and Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Dark Panel Content */}
          <div className="text-white md:pl-6 reveal-on-scroll reveal-delay-1 flex flex-col items-center text-center md:items-start md:text-left mt-6 md:mt-0">
            <span className="inline-flex bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.14em] uppercase">
              Student Health System
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold mt-8 mb-6 md:mb-8 leading-[1.03] text-white tracking-tight drop-shadow-[0_10px_22px_rgba(3,15,45,0.5)] [text-shadow:0_1px_0_rgba(255,255,255,0.2)]">
              Smarter Care,
              <br className="md:inline hidden" />
              <span className="md:hidden"> </span>
              <span className="bg-gradient-to-r from-[#ffffff] via-[#dbeafe] to-[#93c5fd] bg-clip-text text-transparent drop-shadow-[0_6px_16px_rgba(56,189,248,0.25)]">
                Stronger Schools
              </span>
            </h1>

            <p className="text-blue-100/95 mb-8 md:mb-10 max-w-xl text-[1.03rem] leading-relaxed mx-auto md:mx-0">
              Centralized student medical records for schools with secure access,
              proactive tracking, and faster decisions for nurses and parents.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full">
              <Link to="/login" className="hero-login-shell">
                <span className="hero-login-core">Login</span>
              </Link>
              <Link to="/contact" className="hero-login-shell">
                <span className="hero-login-core">Contact Us</span>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full">
              <HeroStat value="Comprehensive" label="Student records" />
              <HeroStat value="Dedicated" label="Nurse support" />
              <HeroStat value="Accelerated" label="Report delivery" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Bridge */}
      <section className="pt-0 pb-8 -mt-8 md:-mt-10 relative z-10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(239,246,255,0.9))] shadow-[0_24px_50px_rgba(30,64,175,0.16)] grid md:grid-cols-2 lg:grid-cols-4 gap-3 p-3 md:p-4">
            <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-blue-200/45 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-orange-200/35 blur-3xl" />
            <Feature
              title="24/7 Access"
              desc="Student health records anytime."
              icon="clock"
            />
            <Feature
              title="Secure Records"
              desc="Protected by role-based access."
              icon="shield"
            />
            <Feature
              title="Easy Transfer"
              desc="Quick migration between schools."
              icon="transfer"
            />
            <Feature
              title="Health Card"
              desc="Student-specific health summaries with secure access."
              icon="shield"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pt-20 pb-10 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="services-slider-head reveal-on-scroll">
            <div className="services-slider-copy">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 text-blue-900">
                Extra Ordinary Health Solutions
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Chathracare provides a complete set of student health services
                that are easy to track, secure to manage, and simple to access.
              </p>
            </div>
          </div>
          <div className="reveal-on-scroll reveal-delay-1">
            <ServicesSlider slides={SERVICE_SLIDES} />
          </div>
        </div>
      </section>

    </>
  );
}

/* Components */

function Stat({ title, desc }) {
  return (
    <div className="text-center">
      <h3 className="font-semibold text-blue-900 text-lg">
        {title}
      </h3>
      <p className="text-sm text-blue-600 mt-2">
        {desc}
      </p>
    </div>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 min-w-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
      <div className="text-[1.05rem] font-medium text-white leading-tight whitespace-normal">
        {value}
      </div>
      <div className="text-[1.05rem] font-medium text-blue-100/95 mt-1 leading-tight">{label}</div>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className="group relative z-10 overflow-hidden rounded-2xl border border-blue-100/90 bg-[linear-gradient(155deg,rgba(255,255,255,0.96),rgba(236,245,255,0.88))] px-4 py-5 text-center shadow-[0_14px_28px_rgba(30,64,175,0.11)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(30,64,175,0.2)]">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-blue-500 via-blue-400 to-orange-400 opacity-85" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-100/70 blur-xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-blue-100/70 blur-xl" />
      <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 via-white to-orange-100 text-blue-700 flex items-center justify-center mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-blue-100/70">
        {icon === "clock" && (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        )}
        {icon === "shield" && (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        )}
        {icon === "transfer" && (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 7h11l-3-3" />
            <path d="M17 17H6l3 3" />
          </svg>
        )}
      </div>
      <h3 className="font-semibold text-blue-900 text-[1.3rem] mt-3.5 leading-tight">
        {title}
      </h3>
      <p className="text-[0.95rem] text-blue-600/95 mt-2 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function ServicesSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width:767px)").matches;

  const centerCard = (index, behavior = "smooth") => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !track.children[index]) return;

    const card = track.children[index];
    if (isMobile()) {
      if (index === 0) {
        wrap.scrollTo({ top: 0, behavior });
        return;
      }
      if (index === slides.length - 1) {
        wrap.scrollTo({ top: wrap.scrollHeight - wrap.clientHeight, behavior });
        return;
      }
      wrap.scrollTo({
        top: card.offsetTop - (wrap.clientHeight / 2 - card.clientHeight / 2),
        behavior,
      });
      return;
    }

    if (index === 0) {
      wrap.scrollTo({ left: 0, behavior });
      return;
    }
    if (index === slides.length - 1) {
      wrap.scrollTo({ left: wrap.scrollWidth - wrap.clientWidth, behavior });
      return;
    }

    wrap.scrollTo({
      left: card.offsetLeft - (wrap.clientWidth / 2 - card.clientWidth / 2),
      behavior,
    });
  };

  const activate = (index, shouldScroll = true) => {
    const next = Math.min(Math.max(index, 0), slides.length - 1);
    if (next === activeIndex) return;
    setActiveIndex(next);
    if (shouldScroll) {
      requestAnimationFrame(() => centerCard(next));
    }
  };

  const go = (step) => {
    activate(activeIndex + step, true);
  };

  const onTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
      go((isMobile() ? dy : dx) > 0 ? -1 : 1);
    }
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
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <div className="services-slider-shell">
      <div className="services-slider-controls">
        <button
          type="button"
          className="services-nav-btn"
          aria-label="Previous service"
          onClick={() => go(-1)}
          disabled={activeIndex === 0}
        >
          ‹
        </button>
        <button
          type="button"
          className="services-nav-btn"
          aria-label="Next service"
          onClick={() => go(1)}
          disabled={activeIndex === slides.length - 1}
        >
          ›
        </button>
      </div>

      <div className="services-slider-wrap" ref={wrapRef}>
        <div
          className="services-slider-track"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className="services-project-card"
              data-active={index === activeIndex ? "true" : undefined}
              onMouseEnter={() => window.matchMedia("(hover:hover)").matches && activate(index, true)}
              onClick={() => activate(index, true)}
            >
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
          <button
            type="button"
            key={slide.title}
            aria-label={`Go to ${slide.title}`}
            className={`services-slider-dot${index === activeIndex ? " active" : ""}`}
            onClick={() => activate(index, true)}
          />
        ))}
      </div>
    </div>
  );
}