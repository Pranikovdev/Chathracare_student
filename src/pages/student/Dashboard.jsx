import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.studentId || user?.id || user?.student_id) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    const id = user?.studentId || user?.id || user?.student_id;
    if (!id) return;

    setLoading(true);
    try {
      // Fetch profile, current screening, and history in parallel
      const [studentRes, screeningRes, historyRes] = await Promise.all([
        api.get(`/students/${id}`),
        api.get(`/screening/student/${id}`).catch(() => ({ data: null })),
        api.get(`/screening/student/${id}/history`).catch(() => ({ data: [] }))
      ]);

      setStudent(studentRes.data);

      // Use current record if it exists, otherwise fallback to most recent history
      const current = screeningRes.data;
      const recentHistory = historyRes.data && historyRes.data.length > 0 ? historyRes.data[0] : null;

      setLatestRecord(current || recentHistory);
    } catch (err) {
      console.error("Dashboard data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const bmi = latestRecord?.height && latestRecord?.weight
    ? (latestRecord.weight / ((latestRecord.height / 100) ** 2)).toFixed(1)
    : null;

  const bmiStatus = bmi
    ? bmi < 18.5 ? { label: "Underweight", color: "text-orange-500", bar: "bg-orange-400", pct: 30 }
      : bmi < 25 ? { label: "Healthy", color: "text-emerald-600", bar: "bg-emerald-400", pct: 65 }
        : bmi < 30 ? { label: "Overweight", color: "text-orange-600", bar: "bg-orange-500", pct: 80 }
          : { label: "Obese", color: "text-red-600", bar: "bg-red-500", pct: 95 }
    : null;

  const vitals = latestRecord ? [
    { label: "BMI", value: bmi || "—", icon: "⚖️", bg: "bg-rose-50 border-rose-200", text: "text-rose-700" },
    { label: "Height", value: `${latestRecord.height} cm`, icon: "📏", bg: "bg-blue-50 border-blue-200", text: "text-blue-700" },
    { label: "Weight", value: `${latestRecord.weight} kg`, icon: "⚖️", bg: "bg-indigo-50 border-indigo-200", text: "text-indigo-700" },
    { label: "Heart Rate", value: latestRecord.heartRate ? `${latestRecord.heartRate} bpm` : "—", icon: "💓", bg: "bg-pink-50 border-pink-200", text: "text-pink-700" },
    { label: "Temp", value: latestRecord.temperature ? `${latestRecord.temperature}°C` : "—", icon: "🌡️", bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
    { label: "Blood Pressure", value: latestRecord.bloodPressure || "—", icon: "💊", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
  ] : [];

  const HEALTH_TIPS = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Take a 10-minute walk after every meal to aid digestion.",
    "Get 8–10 hours of sleep per night for optimal health.",
    "Eat at least 2 servings of fruit and 3 servings of vegetables today.",
  ];
  const todayTip = HEALTH_TIPS[new Date().getDay() % HEALTH_TIPS.length];

  const studentName = student?.name || user?.name || user?.username || "Student";
  const studentInitials = studentName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <DashboardLayout role="student">
      <div className="student-page space-y-6">

        {/* ── Hero Banner ──────────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#f97316] p-6 md:p-8 text-white shadow-xl shadow-blue-200/50">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
          <div className="pointer-events-none absolute right-24 -bottom-10 w-32 h-32 bg-white/10 rounded-full" />
          <div className="pointer-events-none absolute right-6 bottom-4 w-16 h-16 bg-orange-400/30 rounded-full" />

          <div className="relative flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg">
                {studentInitials}
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">Good day 👋</p>
                <h1 className="text-2xl md:text-3xl font-black leading-tight text-white">{studentName}</h1>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="bg-white/20 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {student?.studentClass || "N/A"} {student?.section ? `- ${student.section}` : ""}
                  </span>
                  <span className="bg-white/20 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    ID: {student?.studentSchoolId || user?.studentSchoolId || user?.student_id || "..."}
                  </span>
                  <span className="bg-white/20 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase">
                    {student?.gender || "—"} · {student?.age ? `${student.age} yrs` : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Vitals Mini Cards ─────────────────────────── */}
        {vitals.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-3">Latest Vitals</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {vitals.map((v, i) => (
                <div key={i} className={`${v.bg} border rounded-2xl p-3 text-center flex flex-col items-center gap-1 hover:shadow-md transition`}>
                  <span className="text-xl">{v.icon}</span>
                  <span className={`text-xs font-bold text-gray-500 uppercase tracking-wide leading-tight`}>{v.label}</span>
                  <span className={`text-sm font-black ${v.text} leading-tight`}>{v.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BMI Indicator ─────────────────────────── */}
        <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-1">BMI Indicator</h3>
          {bmi && bmiStatus ? (
            <>
              <div className="flex items-end gap-2 mt-2 mb-3">
                <span className="text-4xl font-black text-gray-800">{bmi}</span>
                <span className={`text-sm font-bold mb-1 ${bmiStatus.color}`}>{bmiStatus.label}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
                <div className={`h-3 rounded-full transition-all duration-700 ${bmiStatus.bar}`} style={{ width: `${bmiStatus.pct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-1">
                <span>Underweight</span><span>Healthy</span><span>Obese</span>
              </div>
            </>
          ) : (
            <p className="text-gray-400 italic text-sm mt-3">No data available</p>
          )}
        </div>


        {/* ── Health Tip + Emergency ─────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Health Tip of the Day */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="text-3xl mt-0.5">💡</div>
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Health Tip of the Day</p>
              <p className="text-sm font-semibold text-emerald-900 leading-relaxed">{todayTip}</p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="text-3xl mt-0.5">🚨</div>
            <div>
              <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-1">Emergency Contact</p>
              <p className="text-sm font-semibold text-rose-900">Parent / Guardian</p>
              <a href="tel:+919876543210" className="text-lg font-black text-rose-600 hover:text-rose-700 transition">+91 98765 43210</a>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
