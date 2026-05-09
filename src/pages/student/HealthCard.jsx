import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

export default function StudentHealthCard() {
    const { user } = useAuth();
    const [card, setCard] = useState(null);
    const [latest, setLatest] = useState(null);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.studentId || user?.id || user?.student_id) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        const id = user?.studentId || user?.id || user?.student_id;
        try {
            const [cardRes, screeningRes, studentRes] = await Promise.all([
                api.get(`/health-card/student/${id}`).catch(() => ({ data: null })),
                api.get(`/screening/student/${id}`).catch(() => ({ data: null })),
                api.get(`/students/${id}`).catch(() => ({ data: null }))
            ]);
            setCard(cardRes?.data || null);
            setLatest(screeningRes?.data || null);
            setStudent(studentRes?.data || null);
        } catch (err) {
            console.error("Failed to fetch health card data:", err);
        } finally {
            setLoading(false);
        }
    };

    const bmi = latest?.bmi
        ? latest.bmi
        : (latest?.height && latest?.weight
            ? (latest.weight / ((latest.height / 100) ** 2)).toFixed(1)
            : "—");

    const handleDownload = () => window.print();

    if (loading) return (
        <DashboardLayout role="student">
            <div className="student-page p-6 text-blue-600 animate-pulse">Loading health card...</div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout role="student">
            <style>{`
                @media print {
                    @page {
                        margin: 0.5cm;
                        size: portrait;
                    }
                    /* Base reset for printing */
                    body {
                        visibility: hidden !important;
                        background: white !important;
                    }
                    /* Keep our target card visible and centered */
                    #health-card-print, 
                    #health-card-print * {
                        visibility: visible !important;
                    }
                    #health-card-print {
                        position: absolute !important;
                        left: 50% !important;
                        top: 2cm !important;
                        transform: translateX(-50%) !important;
                        width: 90% !important;
                        max-width: 650px !important;
                        border: 1px solid #eee !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        display: block !important;
                    }
                    /* Ensure buttons and dashboard chrome are hidden */
                    .no-print, nav, aside, header, .dashboard-sidebar, .dashboard-header {
                        display: none !important;
                        visibility: hidden !important;
                    }
                    /* Force colors to show up in PDF */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                }
            `}</style>
            <div className="student-page">
                {/* ATM-style card — centred in the column */}
                <div
                    id="health-card-print"
                    className="w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-blue-100 mx-auto"
                    style={{ fontFamily: "system-ui, sans-serif", alignSelf: "center" }}
                >
                    {/* Card header strip */}
                    <div className="bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] px-5 py-4 text-white flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">Chathracare · Health ID</p>
                            <h2 className="text-lg font-black leading-tight mt-0.5 text-white">{card?.studentName || student?.name || "Student Name"}</h2>
                            <p className="text-blue-100 text-xs mt-0.5">
                                {student?.studentClass || "—"} - {student?.section || "—"} · {card?.schoolName || "Chathracare Network"}
                            </p>
                        </div>
                        {/* QR Code */}
                        <div className="bg-white rounded-2xl p-3 shadow-lg flex flex-col items-center shrink-0">
                            {card?.qrCodeImage ? (
                                <img src={card.qrCodeImage} alt="QR Code" className="w-[124px] h-[124px] object-contain" />
                            ) : (
                                <svg width="124" height="124" viewBox="0 0 21 21" fill="none">
                                    <rect width="21" height="21" fill="white" />
                                    <rect x="1" y="1" width="7" height="7" rx="1" fill="#1e40af" />
                                    <rect x="2" y="2" width="5" height="5" rx="0.5" fill="white" />
                                    <rect x="3" y="3" width="3" height="3" fill="#1e40af" />
                                    <rect x="13" y="1" width="7" height="7" rx="1" fill="#1e40af" />
                                    <rect x="14" y="2" width="5" height="5" rx="0.5" fill="white" />
                                    <rect x="15" y="3" width="3" height="3" fill="#1e40af" />
                                    <rect x="1" y="13" width="7" height="7" rx="1" fill="#1e40af" />
                                    <rect x="2" y="14" width="5" height="5" rx="0.5" fill="white" />
                                    <rect x="3" y="15" width="3" height="3" fill="#1e40af" />
                                    <rect x="9" y="1" width="2" height="2" fill="#1e40af" />
                                    <rect x="9" y="4" width="1" height="2" fill="#1e40af" />
                                    <rect x="11" y="4" width="2" height="1" fill="#1e40af" />
                                    <rect x="9" y="7" width="3" height="1" fill="#1e40af" />
                                    <rect x="13" y="9" width="2" height="2" fill="#1e40af" />
                                    <rect x="9" y="9" width="4" height="1" fill="#1e40af" />
                                    <rect x="9" y="11" width="2" height="2" fill="#1e40af" />
                                    <rect x="12" y="12" width="3" height="1" fill="#1e40af" />
                                    <rect x="9" y="14" width="1" height="3" fill="#1e40af" />
                                    <rect x="11" y="13" width="2" height="2" fill="#1e40af" />
                                    <rect x="14" y="14" width="3" height="2" fill="#1e40af" />
                                    <rect x="10" y="18" width="1" height="2" fill="#1e40af" />
                                </svg>
                            )}
                            <p className="text-[10px] text-center text-blue-900 font-extrabold mt-1 uppercase tracking-tighter">Verified QR</p>
                        </div>
                    </div>

                    {/* Card body */}
                    <div className="bg-white px-5 py-4">
                        {/* ID row */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                            <div>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase">Student ID</p>
                                <p className="font-mono font-bold text-blue-800 text-sm">{card?.studentSchoolId || student?.studentSchoolId || user?.studentSchoolId || "—"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase">Health ID</p>
                                <p className="font-mono font-bold text-blue-800 text-sm">{card?.cardNumber || "—"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase">DOB</p>
                                <p className="font-bold text-blue-800 text-sm">
                                    {(() => {
                                        if (!student?.dob) return "—";
                                        const [y, m, d] = student.dob.split("-");
                                        return d && m && y ? `${d}/${m}/${y}` : student.dob;
                                    })()}
                                </p>
                            </div>
                        </div>

                        {/* Vitals grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {[
                                { label: "Blood Group", value: card?.bloodGroup || latest?.bloodGroup || student?.bloodGroup || "—", bg: "bg-rose-50 text-rose-700" },
                                { label: "BMI", value: bmi, bg: "bg-emerald-50 text-emerald-700" },
                                { label: "Height", value: latest ? `${latest.height} cm` : "—", bg: "bg-blue-50 text-blue-700" },
                                { label: "Weight", value: latest ? `${latest.weight} kg` : "—", bg: "bg-indigo-50 text-indigo-700" },
                                { label: "Pulse", value: latest?.heartRate ? `${latest.heartRate} bpm` : "—", bg: "bg-amber-50 text-amber-700" },
                                { label: "Temp", value: latest?.temperature ? `${latest.temperature} °C` : "—", bg: "bg-teal-50 text-teal-700" },
                            ].map((v, i) => (
                                <div key={i} className={`${v.bg} rounded-xl p-2 text-center`}>
                                    <p className="text-[9px] font-bold uppercase tracking-wide opacity-70">{v.label}</p>
                                    <p className="font-black text-xs leading-tight mt-0.5">{v.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Conditions */}
                        {(card?.chronicConditions || card?.allergies) && (
                            <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 mb-4">
                                {card.chronicConditions && <p className="text-[10px] text-orange-800"><span className="font-bold">Conditions:</span> {card.chronicConditions}</p>}
                                {card.allergies && <p className="text-[10px] text-orange-800"><span className="font-bold">Allergies:</span> {card.allergies}</p>}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <p className="text-[9px] text-gray-400">Valid · {card?.expiryDate ? `Expires ${new Date(card.expiryDate).toLocaleDateString()}` : "Active"}</p>
                            <button
                                onClick={handleDownload}
                                className="no-print flex items-center gap-2 bg-blue-600 text-white text-[10px] font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Save PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
