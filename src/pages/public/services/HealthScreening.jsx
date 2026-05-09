import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function HealthScreening() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24 overflow-hidden">
            <Navbar />

            {/* Hero Section - Dark & Premium */}
            <section className="relative bg-slate-900 pt-28 pb-32 lg:pt-36 lg:pb-40 px-6 overflow-hidden">
                {/* Abstract Glows */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Hero Text */}
                    <div className="order-2 lg:order-1">
                        <Link to="/services" className="inline-flex items-center text-blue-300 font-medium hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            View All Services
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                            The Foundation of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">School Healthcare.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                            Our approach focuses on early identification of health concerns and continuous monitoring of student well-being during their vital formative years.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-[2.5rem] transform rotate-3 scale-105 blur-lg" />
                        <img
                            src="/service_health_screening.png"
                            alt="Health Screening in progress"
                            className="relative rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-full h-[350px] lg:h-[450px] object-cover"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Frequency</p>
                                <p className="text-blue-950 font-extrabold">Biannual Testing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Intro Text */}
            <section className="max-w-4xl mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light text-center">
                        By bringing structured medical screenings directly into schools, we ensure that students receive timely health assessments without disrupting their academic environment. Every student undergoes a systematic evaluation by a multidisciplinary team.
                    </p>
                </div>
            </section>

            {/* Screenings Grid */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Screenings We Conduct</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Key health domains evaluated to identify unnoticed issues affecting growth and learning.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-inner border border-blue-100">🦷</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Dental Screening</h3>
                        <p className="text-slate-600 leading-relaxed">Evaluation of oral health conditions including cavities, gum health, alignment issues, and overall dental hygiene.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl mb-6 shadow-inner border border-orange-100">👁️</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Vision Screening</h3>
                        <p className="text-slate-600 leading-relaxed">Assessment of eyesight, visual acuity, and early signs of vision problems that may affect academic performance.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-6 shadow-inner border border-emerald-100">🩺</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Pediatric Health</h3>
                        <p className="text-slate-600 leading-relaxed">General health examination focusing on growth parameters, nutritional indicators, and overall physical development.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 lg:col-start-1 lg:col-end-2">
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-6 shadow-inner border border-purple-100">🔬</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Dermatology</h3>
                        <p className="text-slate-600 leading-relaxed">Identification of common skin conditions, infections, allergies, or dermatological concerns among students.</p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 lg:col-span-2">
                        <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-2xl mb-6 shadow-inner border border-pink-100">👂</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">ENT Screening</h3>
                        <p className="text-slate-600 leading-relaxed">Evaluation of ear, nose, and throat health including hearing concerns, infections, and respiratory-related observations.</p>
                    </div>
                </div>
            </section>

            {/* The Difference Section Container */}
            <section className="mt-32 max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />

                    <div className="relative p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 text-white">
                            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 uppercase tracking-widest text-xs font-bold rounded-full mb-6 border border-blue-400/30">The Advantage</span>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-100">What Makes ChathraCare Different</h2>
                            <p className="text-lg text-blue-50 leading-relaxed font-light mb-6">
                                Unlike traditional health camps that provide one-time screenings without follow-up, ChathraCare implements a structured and continuous health monitoring system within schools.
                            </p>
                            <p className="font-bold text-xl text-blue-200">
                                Our biannual logic transforms one-time checks into sustainable preventive care.
                            </p>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-3xl p-8 shadow-xl text-slate-800 relative border-t-4 border-orange-400">
                                <div className="absolute -left-4 -top-4 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                                </div>
                                <p className="text-lg leading-relaxed font-semibold text-slate-700 pt-2">
                                    Every screening conducted through ChathraCare is part of an organized workflow where the findings are digitally recorded, maintained, and tracked over time.
                                </p>
                                <div className="h-px bg-slate-200 my-6" />
                                <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">
                                    This allows schools and parents to observe health trends, identify recurring concerns, and ensure that necessary medical attention is provided when required.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
