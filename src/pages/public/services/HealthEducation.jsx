import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function HealthEducation() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24 overflow-hidden">
            <Navbar />

            {/* Hero Section - Dark & Premium */}
            <section className="relative bg-slate-900 pt-28 pb-32 lg:pt-36 lg:pb-40 px-6 overflow-hidden">
                {/* Abstract Glows */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-yellow-600/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Hero Text */}
                    <div className="order-2 lg:order-1">
                        <Link to="/services" className="inline-flex items-center text-amber-300 font-medium hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            View All Services
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                            Building Habits for a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Healthier Future.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                            Promoting good health among students goes beyond screenings and treatment. It's about developing lifelong awareness during childhood.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-[2.5rem] transform 3 scale-105 blur-lg" />
                        <img
                            src="/service_health_education.png"
                            alt="Health Education Session"
                            className="relative rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-full h-[350px] lg:h-[450px] object-cover"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 left-8 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Focus Area</p>
                                <p className="text-amber-950 font-extrabold">Healthy Lifestyles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Intro Text */}
            <section className="max-w-4xl mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-6">
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light text-center">
                        ChathraCare believes that promoting good health among students goes beyond medical screenings and treatment. Developing healthy habits and awareness during childhood plays a critical role in preventing many long-term health problems.
                    </p>
                    <p className="text-md md:text-lg text-slate-600 leading-relaxed font-light text-center border-t border-slate-100 pt-6">
                        Health education sessions are conducted within the school environment and are designed to be age-appropriate, practical, and engaging for students. These sessions focus on building awareness about common health issues and encouraging students to adopt healthy daily practices that support their growth and development.
                    </p>
                </div>
            </section>

            {/* Structured Info Grid */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Areas Covered in Health Education</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Topics that are highly relevant to the everyday lives of students and their overall well-being.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {/* Card 1 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-blue-100">🧼</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">Personal Hygiene</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Guidance on maintaining proper hygiene practices such as handwashing, oral hygiene, and general cleanliness to prevent infections and illnesses.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-orange-500" />
                        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-orange-100">🍎</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-orange-600 transition-colors">Nutrition and Healthy Eating</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Awareness about balanced diets, healthy food habits, and the importance of proper nutrition for growth and energy.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-emerald-100">🏃</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">Lifestyle and Physical Health</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Encouraging active lifestyles, proper sleep habits, and reducing unhealthy habits that can affect long-term health.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-violet-500" />
                        <div className="w-16 h-16 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-violet-100">🛡️</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-violet-600 transition-colors">Preventive Health Awareness</h3>
                        <p className="text-slate-600 leading-relaxed text-[17px]">Helping students understand how early attention to health concerns can prevent more serious problems later.</p>
                    </div>
                </div>
            </section>

            {/* The Difference Section Container */}
            <section className="mt-32 max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />

                    <div className="relative p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-16 items-center">

                        <div className="lg:w-1/2 text-white">
                            <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 uppercase tracking-widest text-xs font-bold rounded-full mb-6 border border-amber-400/30">The Advantage</span>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-100">What Makes ChathraCare Different</h2>
                            <p className="text-lg text-amber-50 leading-relaxed font-light mb-6">
                                Many health education initiatives in schools are conducted as one-time awareness talks without continuity. ChathraCare approaches health education as an ongoing component of the school healthcare ecosystem.
                            </p>
                            <p className="font-bold text-xl text-amber-200">
                                Our programs complement the biannual health screenings.
                            </p>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-3xl p-8 shadow-xl text-slate-800 relative border-t-4 border-yellow-400">
                                <div className="absolute -left-4 -top-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                                </div>
                                <p className="text-lg leading-relaxed font-semibold text-slate-700 pt-2">
                                    "By combining medical screenings with practical health awareness, ChathraCare helps create a school environment where students are equipped to maintain healthy habits."
                                </p>
                                <div className="h-px bg-slate-200 my-6" />
                                <p className="text-sm text-amber-700 font-bold uppercase tracking-wide">
                                    Helping students better understand the importance of maintaining their health between screenings.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
