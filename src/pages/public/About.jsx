import Navbar from "../../components/layout/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      {/* ─── Introduction Section ─── */}
      <section className="py-20 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_55%,#f8fbff_100%)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="relative mx-auto w-full max-w-xl lg:sticky lg:top-24 pb-8 lg:pb-0">
            {/* Background glowing blob */}
            <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-br from-blue-100/70 to-orange-100/50 blur-2xl z-0" />

            {/* Single Elegant Feature Image */}
            <img
              src="/about_main_nurse.png"
              className="relative z-10 w-full aspect-[4/3] rounded-[2rem] border-[6px] border-white shadow-[0_20px_50px_rgba(30,64,175,0.15)] object-cover"
              alt="School health examination"
            />

            {/* Floating Badge */}
            <div className="absolute z-30 -bottom-8 left-1/2 -translate-x-1/2 lg:bottom-12 lg:-right-10 lg:translate-x-0 rounded-2xl border border-blue-50 bg-white/95 px-6 py-5 shadow-2xl backdrop-blur-md transition-transform hover:-translate-y-1 duration-300 w-max">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-500 mb-1">Our Mission</p>
                  <p className="text-xl font-extrabold text-blue-950 leading-none">500,000+</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Students by 2030</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:pr-2 flex flex-col justify-center">
            <div>
              <span className="inline-flex bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 leading-tight mb-8">
                Prioritizing Student Health & Well-being
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 leading-relaxed text-[15px] lg:text-[17px]">
              <p>
                Student health is one of the most important, yet often overlooked, aspects of a strong education system. Many health conditions that affect children—such as vision problems, dental issues, nutritional deficiencies, and developmental concerns—remain undetected for years due to the lack of structured health monitoring during school life.
              </p>

              <p>
                Our initiative was created with the belief that early detection and preventive healthcare can significantly improve the well-being and future of young individuals. By bringing organized healthcare services directly into schools, we aim to ensure that <strong className="font-semibold text-slate-800">every student receives timely health assessments, proper monitoring, and access to essential medical support.</strong>
              </p>

              <p>
                Through a combination of specialist-led health screenings, on-campus medical care, and digital health record management, we provide schools with a comprehensive system to track and support student health over time. Our platform enables parents, schools, and healthcare professionals to stay informed and proactive about a child&apos;s well-being.
              </p>

              <div className="mt-8 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400 rounded-l-xl"></div>
                <p className="font-medium text-blue-900 bg-white/60 backdrop-blur-sm p-6 pl-8 rounded-xl border border-blue-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] leading-relaxed italic">
                  &quot;Our goal is to build a sustainable school healthcare ecosystem that promotes preventive care, improves health awareness, and helps create healthier learning environments for the next generation.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Commitment Section (Mission, Vision, Values) ─── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              Our Commitment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Driving Healthier Generations
            </h2>
          </div>

          {/* Premium Mission & Vision Split Card */}
          <div className="mb-28 max-w-6xl mx-auto relative group">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100" />
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100" />

            <div className="grid lg:grid-cols-2 rounded-[2.5rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] overflow-hidden shadow-[0_30px_60px_rgba(15,23,42,0.4)] border border-slate-700/50 relative z-10">

              {/* Mission Pane */}
              <div className="relative p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-700/50 flex flex-col justify-start h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-500/20 backdrop-blur-md">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Our Mission</h3>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                  To enable preventive healthcare for students through structured school health screenings and continuous medical monitoring for around <strong className="font-semibold text-blue-300">500,000 students by 2030</strong>.
                </p>
              </div>

              {/* Vision Pane */}
              <div className="relative p-12 lg:p-16 flex flex-col justify-start h-full overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-orange-400" />
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-8 border border-orange-500/20 backdrop-blur-md">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Our Vision</h3>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                  To ensure every student grows with access to proactive and organized healthcare.
                </p>
              </div>

            </div>
          </div>

          {/* Core Values / Pillars */}
          <div className="mt-20">
            <div className="flex items-center justify-center mb-10 gap-4">
              <div className="h-px bg-slate-200 flex-1 max-w-[100px]" />
              <h3 className="text-2xl font-bold text-center text-blue-900">Our Core Values</h3>
              <div className="h-px bg-slate-200 flex-1 max-w-[100px]" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Children First",
                  desc: "The well-being of students guides every decision we make.",
                  icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "blue"
                },
                {
                  title: "Preventive Approach",
                  desc: "We focus on identifying health concerns early to support better long-term outcomes.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  color: "orange"
                },
                {
                  title: "Technology-Driven",
                  desc: "Digital tools help us organize, monitor, and manage student health efficiently.",
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  color: "blue"
                },
                {
                  title: "Meaningful Impact",
                  desc: "Our work aims to build healthier generations and stronger communities.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  color: "orange"
                },
                {
                  title: "School-Centered",
                  desc: "Bringing healthcare directly into schools ensures consistent monitoring during growth.",
                  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                  color: "blue"
                }
              ].map((value, idx) => (
                <div key={idx} className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-[0_12px_30px_rgba(30,64,175,0.06)] transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${value.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
