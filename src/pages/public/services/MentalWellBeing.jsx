import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function MentalWellBeing() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24 overflow-hidden">
            <Navbar />

            {/* Hero Section - Dark & Premium */}
            <section className="relative bg-slate-900 pt-28 pb-32 lg:pt-36 lg:pb-40 px-6 overflow-hidden">
                {/* Abstract Glows */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Hero Text */}
                    <div className="order-2 lg:order-1">
                        <Link to="/services" className="inline-flex items-center text-rose-300 font-medium hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            View All Services
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                            Supporting the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-200">Whole Student.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                            Emotional and behavioral challenges during childhood deeply influence learning, confidence, and social development.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-rose-500/20 rounded-[2.5rem] transform rotate-3 scale-105 blur-lg" />
                        <img
                            src="/service_mental_wellbeing_v2.png"
                            alt="Mental Well-Being Professional Counseling"
                            className="relative rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-full h-[350px] lg:h-[450px] object-cover"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 right-8 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Compassion</p>
                                <p className="text-rose-950 font-extrabold">Holistic Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Intro Text */}
            <section className="max-w-4xl mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-6">
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light text-center">
                        ChathraCare recognizes that a student’s overall health includes both physical and psychological well-being. To support this crucial aspect of student health, ChathraCare beautifully incorporates mental well-being screening as part of the comprehensive health screening program.
                    </p>
                    <p className="text-md md:text-lg text-slate-600 leading-relaxed font-light text-center border-t border-slate-100 pt-6">
                        During the scheduled screening sessions, a qualified psychiatrist is part of the medical team and evaluates students for signs of emotional or behavioral concerns. These assessments are conducted in a sensitive and age-appropriate manner, ensuring that students feel entirely comfortable during the process.
                    </p>
                </div>
            </section>

            {/* Screenings Grid */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What the Screening Focuses On</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">The objective is not to diagnose, but to identify early indicators of challenges such as stress or attention difficulties.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-blue-100">🌿</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Emotional Health</h3>
                        <p className="text-slate-600 leading-relaxed">Observing signs of stress, anxiety, or emotional difficulties that may unknowingly impact a child’s daily life and learning patterns.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center text-3xl mb-6 shadow-inner border border-violet-100">🤝</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Behavioral Observations</h3>
                        <p className="text-slate-600 leading-relaxed">Understanding behavioral patterns that may clearly indicate challenges in core attention, social interaction, or peer adjustment.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 md:col-span-2 lg:col-span-1">
                        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-3xl mb-6 shadow-inner border border-rose-100">🌱</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Developmental Awareness</h3>
                        <p className="text-slate-600 leading-relaxed">Identifying internal concerns related to emotional development and deep psychological well-being during the student’s most formative, accelerated growth years.</p>
                    </div>

                </div>
            </section>

            {/* The Difference Section Container */}
            <section className="mt-32 max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />

                    <div className="relative p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-16 items-center">

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-3xl p-8 shadow-xl text-slate-800 relative border-t-4 border-pink-400">
                                <div className="absolute -left-4 -top-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                                </div>
                                <p className="text-lg leading-relaxed font-semibold text-slate-700 pt-2">
                                    "ChathraCare ensures that mental well-being is addressed directly alongside physical health during the screening process."
                                </p>
                                <div className="h-px bg-slate-200 my-6" />
                                <p className="text-sm text-rose-700 font-bold uppercase tracking-wide">
                                    By including a psychiatrist as part of the primary screening team, we provide a holistic approach to student health.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2 text-white">
                            <span className="inline-block px-4 py-2 bg-rose-500/20 text-rose-300 uppercase tracking-widest text-xs font-bold rounded-full mb-6 border border-rose-400/30">The Advantage</span>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-100">What Makes ChathraCare Different</h2>
                            <p className="text-lg text-rose-50 leading-relaxed font-light mb-6">
                                Mental health support is often completely overlooked in traditional school health programs. This robust approach allows schools and parents to become fully aware of the true mental well-being of students.
                            </p>
                            <p className="font-bold text-xl text-rose-200">
                                Encouraging early clinical support and a healthier learning environment.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
