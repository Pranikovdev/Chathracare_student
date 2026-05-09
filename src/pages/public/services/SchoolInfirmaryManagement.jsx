import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function SchoolInfirmaryManagement() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24 overflow-hidden">
            <Navbar />

            {/* Hero Section - Dark & Premium */}
            <section className="relative bg-[#0f111a] pt-28 pb-32 lg:pt-36 lg:pb-40 px-6 overflow-hidden">
                {/* Abstract Glows */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Hero Text */}
                    <div className="order-2 lg:order-1">
                        <Link to="/services" className="inline-flex items-center text-indigo-300 font-medium hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            View All Services
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                            A Safer Health <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-200">Environment.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                            We support schools in establishing a well-organized school infirmary system that serves as the first point of care for students.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem] transform 3 scale-105 blur-lg" />
                        <img
                            src="/service_infirmary.png"
                            alt="School Infirmary Management"
                            className="relative rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-full h-[350px] lg:h-[450px] object-cover"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 left-8 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Assistance</p>
                                <p className="text-indigo-950 font-extrabold">Immediate Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Intro Text */}
            <section className="max-w-4xl mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-6">
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light text-center">
                        ChathraCare supports schools in establishing and maintaining a well-organized school infirmary system that ensures students receive immediate medical attention when health concerns arise during school hours. The infirmary serves as the first point of care for students who experience illness, discomfort, or minor injuries while in school.
                    </p>
                    <p className="text-md md:text-lg text-slate-600 leading-relaxed font-light text-center border-t border-slate-100 pt-6">
                        As part of this service, ChathraCare provides a trained nurse who is responsible for managing the school infirmary and attending to students throughout the school day. The presence of a dedicated nurse ensures that students receive timely attention without disrupting academic activities, reducing the burden on teachers and school administrators.
                    </p>
                </div>
            </section>

            {/* Structured Info Grid */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What the Infirmary Service Includes</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Providing a safe, structured, and rapid response to minor health situations on campus.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {/* Card 1 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-blue-100">🩺</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">Student Health Assistance</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Students who feel unwell during school hours can visit the infirmary where the nurse evaluates their condition and provides appropriate care.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-orange-500" />
                        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-orange-100">🩹</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-orange-600 transition-colors">First Aid Support</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Immediate first aid is provided for minor injuries or health concerns that occur within the school premises.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-emerald-100">👁️</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">Health Observation</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">The nurse observes the student's condition and determines whether the student can return to class or requires further attention.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500" />
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-indigo-100">📁</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">Health Record Entry</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Any health event handled in the infirmary can be recorded in the student’s health profile within the ChathraCare platform when necessary.</p>
                    </div>
                </div>
            </section>

            {/* The Difference Section Container */}
            <section className="mt-32 max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />

                    <div className="relative p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-16 items-center">

                        <div className="lg:w-1/2 text-white">
                            <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 uppercase tracking-widest text-xs font-bold rounded-full mb-6 border border-indigo-400/30">The Advantage</span>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-100">What Makes ChathraCare Different</h2>
                            <p className="text-lg text-indigo-50 leading-relaxed font-light mb-6">
                                In many schools, infirmaries operate as basic first-aid rooms without structured documentation or health tracking. ChathraCare enhances the role of the school infirmary by integrating it with the student health management system.
                            </p>
                            <p className="font-bold text-xl text-indigo-200">
                                Through structured infirmary management, ChathraCare helps schools create a safer and more responsive health environment.
                            </p>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-3xl p-8 shadow-xl text-slate-800 relative border-t-4 border-violet-400">
                                <div className="absolute -left-4 -top-4 w-12 h-12 bg-violet-400 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                                </div>
                                <p className="text-lg leading-relaxed font-semibold text-slate-700 pt-2">
                                    "This ensures that health incidents managed within the school are documented, organized, and linked to the student’s health records."
                                </p>
                                <div className="h-px bg-slate-200 my-6" />
                                <p className="text-sm text-indigo-700 font-bold uppercase tracking-wide">
                                    Providing better continuity of information between daily school healthcare and future specialized screenings.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
