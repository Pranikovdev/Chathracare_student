import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function HealthRecords() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24 overflow-hidden">
            <Navbar />

            {/* Hero Section - Dark & Premium */}
            <section className="relative bg-[#0f172a] pt-28 pb-32 lg:pt-36 lg:pb-40 px-6 overflow-hidden">
                {/* Abstract Glows */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

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
                            Empowering Care with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Digital Tracking.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                            Each screening performed by our medical teams is securely documented and stored to construct your student’s long-term health profile.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-[2.5rem] transform -rotate-3 scale-105 blur-lg" />
                        <img
                            src="/service_health_records.png"
                            alt="Health Records Analysis"
                            className="relative rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-full h-[350px] lg:h-[450px] object-cover"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 right-8 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Storage</p>
                                <p className="text-emerald-950 font-extrabold">Instant & Secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Intro Text */}
            <section className="max-w-4xl mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light text-center">
                        ChathraCare maintains a structured digital record for every student based on the information collected during the biannual health screenings. This allows schools and parents to securely review a student's medical trajectory. All screening findings are instantly logged via tablet directly into the secure cloud platform.
                    </p>
                </div>
            </section>

            {/* Structured Info Grid */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What the Health Record Includes</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Organized into precise domains to capture multi-faceted medical assessments continuously.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {/* Card 1 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-blue-100">📊</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">Basic Health Metrics</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Records of essential growth indicators such as height, weight, and other baseline measurements visually observed and tracked over multiple semesters.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500" />
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-indigo-100">🦷</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">Dental Examination</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Complete charting detailing oral health issues including cavities, bleeding gums, bite alignment, and an aggregated dental hygiene grade.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-orange-500" />
                        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-orange-100">📋</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-orange-600 transition-colors">Provisional Diagnosis</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Initial clinical observations provided by the doctor, flagging potential health roadblocks that require external, specialized diagnostic evaluation.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-rose-500" />
                        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-rose-100">📁</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-rose-600 transition-colors">Medical History</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Information related to pre-existing illnesses, complex allergies, or active long-term health constraints flagged during the student onboarding process.</p>
                    </div>
                </div>
            </section>

            {/* The Digital Health Card Banner Highlight */}
            <section className="mt-32 max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />

                    <div className="relative p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-16 items-center">

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-3xl p-8 shadow-xl text-slate-800 relative border-t-4 border-emerald-400">
                                <div className="absolute -left-4 -top-4 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                                </div>
                                <p className="text-lg leading-relaxed font-semibold text-slate-700 pt-2">
                                    "The card provides a clear, highly-digestible overview of the student’s health status and recorded information."
                                </p>
                                <div className="h-px bg-slate-200 my-6" />
                                <p className="text-sm text-emerald-700 font-bold uppercase tracking-wide">
                                    Parents are instantly informed when screening reports are finalized and available for mobile viewing.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2 text-white">
                            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 uppercase tracking-widest text-xs font-bold rounded-full mb-6 border border-emerald-400/30">The Outcome</span>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-white">The Digital Health Card</h2>
                            <p className="text-lg text-blue-50 leading-relaxed font-light mb-6">
                                Every student receives an exclusive Digital Health Card that summarizes the key outcomes of the screening. It serves as a single portable identity mapping their lifetime trajectory.
                            </p>
                            <p className="font-bold text-xl text-emerald-200">
                                Maintains ironclad continuity, bridging past evaluations directly to future medical interventions.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
