import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function VerifyHealthCard() {
    const { qrData } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const [formData, setFormData] = useState({
        studentSchoolId: "",
        dob: ""
    });

    const handleVerify = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/health-card/scan", {
                qrCodeData: qrData,
                studentSchoolId: formData.studentSchoolId,
                dob: formData.dob
            });
            setData(res.data);
            setVerifying(false);
        } catch (err) {
            console.error("Verification failed:", err);
            setError(err.response?.data?.message || "Verification failed. Please check Student ID and DOB.");
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#e9f0ff] via-[#eef4ff] to-[#fff4e5] p-4">
                {/* Background Decorative Circles */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
                    <div className="absolute right-[-8rem] top-24 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
                    <div className="absolute left-1/3 bottom-[-6rem] h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
                </div>

                <div className="relative max-w-6xl mx-auto h-full flex items-center justify-center">
                    <div className="w-full grid md:grid-cols-2 gap-6 items-stretch">
                        {/* Login Card */}
                        <section className="rounded-[30px] border border-white/80 bg-white/65 backdrop-blur-md p-3 md:p-4 shadow-[0_34px_80px_rgba(30,64,175,0.2)]">
                            <div className="rounded-3xl bg-[linear-gradient(160deg,#f6f8fd_0%,#f7f9ff_58%,#fff2db_100%)] border border-white/80 p-5 md:p-7 flex flex-col h-full min-h-[450px]">
                                <div className="inline-flex items-center gap-2 text-slate-900 font-bold">
                                    <span className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-orange-500 inline-block" />
                                    Chathracare
                                </div>

                                <div className="mt-8">
                                    <span className="inline-block text-[10px] font-black tracking-[0.16em] uppercase text-blue-700">
                                        Secure Verification Portal
                                    </span>
                                    <h1 className="mt-2 text-3xl md:text-4xl leading-tight font-bold text-slate-900">Verify Identity</h1>
                                    <p className="mt-3 text-slate-600 max-w-sm font-medium">Please enter student credentials to access the emergency medical profile.</p>
                                </div>

                                <form onSubmit={handleVerify} className="mt-8 space-y-4">
                                    <div className="auth-input-shell flex items-center rounded-2xl border border-slate-200 bg-white/95 overflow-hidden shadow-[0_6px_14px_rgba(15,23,42,0.05)] transition">
                                        <span className="w-12 h-12 flex items-center justify-center text-slate-500 border-r border-slate-200 bg-slate-50">
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Student School ID"
                                            className="w-full px-4 py-3.5 bg-transparent text-slate-900 placeholder:text-slate-400 font-bold focus:outline-none"
                                            value={formData.studentSchoolId}
                                            onChange={(e) => setFormData({ ...formData, studentSchoolId: e.target.value })}
                                        />
                                    </div>

                                    <div className="auth-input-shell flex items-center rounded-2xl border border-slate-200 bg-white/95 overflow-hidden shadow-[0_6px_14px_rgba(15,23,42,0.05)] transition">
                                        <span className="w-12 h-12 flex items-center justify-center text-slate-500 border-r border-slate-200 bg-slate-50">
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-4 py-3.5 bg-transparent text-slate-900 placeholder:text-slate-400 font-bold focus:outline-none [color-scheme:light]"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>

                                    {error && (
                                        <div className="text-rose-500 text-xs font-bold bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 flex items-center gap-2">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-2xl py-4 text-white font-black bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 shadow-[0_12px_30px_rgba(30,64,175,0.22)] hover:brightness-105 transition disabled:opacity-50 tracking-wide uppercase text-sm"
                                    >
                                        {loading ? "Verifying..." : "Access Medical History"}
                                    </button>
                                </form>

                                <div className="mt-auto pt-6 border-t border-white/50 flex items-center justify-between">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                                        Authorized Emergency View<br />All access is strictly logged
                                    </p>
                                    <div className="w-10 h-10 rounded-full border border-slate-200 text-slate-400 grid place-items-center font-black">
                                        HC
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Visual Section */}
                        <section className="hidden md:flex rounded-[30px] border border-white/70 bg-white/30 backdrop-blur-sm p-4 h-full">
                            <div className="w-full h-full rounded-3xl overflow-hidden border border-white/70 bg-white/50 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
                                    alt="Medical Verification"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                                <div className="absolute bottom-10 left-10 text-white z-10">
                                    <h3 className="text-2xl font-black tracking-tight">Rapid Response Data</h3>
                                    <p className="text-white/80 font-bold mt-2 max-w-xs">Helping first responders make informed clinical decisions instantly.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    // Main records view
    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
            <style>{`
                @media print {
                    @page {
                        margin: 1.5cm;
                        size: portrait;
                    }
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                        padding: 0 !important;
                        color: #000 !important;
                    }
                    .max-w-3xl {
                        max-width: 100% !important;
                        width: 100% !important;
                    }
                    /* Ensure all colors and gradients print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-scheme: light !important;
                    }
                    /* Force solid backgrounds for print engines that struggle with transparency */
                    .bg-rose-50, .bg-blue-50, .bg-slate-50, .bg-rose-600, .bg-blue-600 {
                        background-color: inherit !important;
                        border: 1px solid #ddd !important;
                    }
                    .text-rose-600 { color: #dc2626 !important; }
                    .text-blue-600 { color: #2563eb !important; }
                    
                    /* Prevent cards from breaking across pages */
                    .bg-white, .border {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                }
            `}</style>
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 text-sm font-black">
                            CC
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">CHATHRACARE</h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Health Registry</p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="no-print px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-black text-[10px] uppercase tracking-wider shadow-lg shadow-blue-200"
                    >
                        Print Profile
                    </button>
                </div>

                {/* Critical Information Alert */}
                <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 md:p-8">
                    <h2 className="text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></div>
                        Clinical Alerts
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm transition hover:scale-[1.02]">
                            <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-1">Blood Group</p>
                            <p className="text-4xl font-black text-rose-600">{data.bloodGroup || "UNKNOWN"}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm transition hover:scale-[1.02]">
                            <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-1">Allergies</p>
                            <p className={`text-xl font-black ${data.allergies ? "text-rose-600" : "text-emerald-700 uppercase"}`}>
                                {data.allergies || "No Known Allergies"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Patient Overview */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center text-white text-4xl font-black shrink-0 shadow-lg border-4 border-white">
                        {data.studentName?.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-black text-slate-900 mb-2">{data.studentName}</h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-wider">
                                <span className="text-blue-700">ID:</span> #{data.studentSchoolId}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-wider">
                                <span className="text-blue-700">DOB:</span> {data.dateOfBirth}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-wider">
                                <span className="text-blue-700">SCHOOL:</span> {data.currentSchool}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Links */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4">Guardian Contact</h3>
                        <p className="font-black text-slate-900 mb-2 text-lg">{data.parentName || "N/A"}</p>
                        <a href={`tel:${data.parentPhone}`} className="mt-auto px-4 py-3 bg-blue-50 rounded-xl text-xs font-black text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Parent
                        </a>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4">Emergency Contact</h3>
                        <p className="font-black text-slate-900 mb-2 text-lg">{data.emergencyContactName || "N/A"}</p>
                        <a href={`tel:${data.emergencyContactPhone}`} className="mt-auto px-4 py-3 bg-rose-50 rounded-xl text-xs font-black text-rose-700 hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Emergency
                        </a>
                    </div>
                </div>

                {/* Latest Vitals */}
                {data.latestScreening && (
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Current Screening Vitals</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged: {data.latestScreening.date}</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { label: "Blood Pressure", value: data.latestScreening.bloodPressure || "--", icon: "BP", color: "rose" },
                                { label: "Heart Rate", value: `${data.latestScreening.heartRate || "--"} BPM`, icon: "HR", color: "pink" },
                                { label: "Temperature", value: `${data.latestScreening.temperature || "--"} °C`, icon: "TP", color: "amber" },
                                { label: "Height", value: `${data.latestScreening.height || "--"} cm`, icon: "HT", color: "blue" },
                                { label: "Weight", value: `${data.latestScreening.weight || "--"} kg`, icon: "WT", color: "indigo" },
                                { label: "BMI", value: data.latestScreening.height && data.latestScreening.weight ? (data.latestScreening.weight / ((data.latestScreening.height / 100) ** 2)).toFixed(1) : "--", icon: "BM", color: "emerald" },
                            ].map((v, i) => (
                                <div key={i} className={`p-5 rounded-[2rem] border bg-slate-50 border-slate-100 flex flex-col items-center text-center`}>
                                    <span className={`w-8 h-8 rounded-xl bg-slate-900 text-[10px] font-black text-white flex items-center justify-center mb-3 shadow-lg`}>{v.icon}</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{v.label}</p>
                                    <p className={`text-xl font-black text-slate-900`}>{v.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Additional Observations from Latest Screening */}
                        {data.latestScreening.responses?.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Clinical Findings</h4>
                                <div className="flex flex-wrap gap-3">
                                    {data.latestScreening.responses.map((r, i) => (
                                        <ClinicalFindingTag key={i} question={r.questionText} answer={r.answer} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* History Timeline */}
                <div className="space-y-6 pb-20">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight px-2">Clinical History Timeline</h3>
                    <div className="space-y-4">
                        {data.medicalHistory?.length > 0 ? (
                            data.medicalHistory.map((h, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm transition hover:border-blue-200">
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {h.date}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mb-5">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest"><span className="text-slate-300">Ht:</span> {h.height}cm</div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest"><span className="text-slate-300">Wt:</span> {h.weight}kg</div>
                                        <div className="text-[10px) font-black text-slate-500 uppercase tracking-widest"><span className="text-slate-300">BP:</span> {h.bloodPressure}</div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-50">
                                        {h.responses?.map((r, ri) => (
                                            <ClinicalFindingTag key={ri} question={r.questionText} answer={r.answer} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-black text-sm uppercase tracking-widest">No Historical Records Found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

function ClinicalFindingTag({ question, answer }) {
  const isYes = typeof answer === 'string' && answer.toLowerCase() === 'yes';
  const isNo = typeof answer === 'string' && answer.toLowerCase() === 'no';
  const cleanCategory = question ? question.replace(/\?$/, '') : "Observation";

  if (isYes) {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-red-600 border border-red-700 rounded-2xl w-full sm:w-auto flex-1 min-w-[220px]">
        <span className="text-sm font-bold text-white leading-tight">
          {cleanCategory}
        </span>

        <span className="bg-white text-red-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm shrink-0 flex flex-col items-center leading-tight">
          <span>Needed</span>
          <span>Attention</span>
        </span>
      </div>
    )
  }

  if (isNo) {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl w-full sm:w-auto flex-1 min-w-[220px]">
        <span className="text-sm font-bold text-emerald-900 leading-tight">{cleanCategory}</span>
        <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm shrink-0">Clear</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl w-full sm:w-auto flex-1 min-w-[220px]">
      <span className="text-sm font-bold text-slate-500 leading-tight">{cleanCategory}</span>
      <span className="bg-white border border-slate-200 text-slate-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm shrink-0 line-clamp-1 max-w-[120px]">{answer}</span>
    </div>
  )
}
