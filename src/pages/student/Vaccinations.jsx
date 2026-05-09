import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";

const VACCINATION_SCHEDULE = [
  { age: "Birth", vaccines: ["BCG", "Hep B1", "OPV"] },
  { age: "6 Weeks", vaccines: ["DTwP/DTaP1", "Hib-1", "IPV-1", "Hep B2", "PCV 1", "Rota-1"] },
  { age: "10 Weeks", vaccines: ["DTwP/DTaP2", "Hib-2", "IPV-2", "Hep B3", "PCV 2", "Rota-2"] },
  { age: "14 Weeks", vaccines: ["DTwP/DTaP3", "Hib-3", "IPV-3", "Hep B4", "PCV 3", "Rota-3*"] },
  { age: "6 Months", vaccines: ["Influenza-1"] },
  { age: "7 Months", vaccines: ["Influenza-2"] },
  { age: "6 – 9 Months", vaccines: ["Typhoid Conjugate Vaccine"] },
  { age: "9 Months", vaccines: ["MMR 1 (Mumps, Measles, Rubella)"] },
  { age: "12 Months", vaccines: ["Hepatitis A-1"] },
  { age: "12 – 15 Months", vaccines: ["PCV Booster"] },
  { age: "15 Months", vaccines: ["MMR 2", "Varicella"] },
  { age: "16 – 18 Months", vaccines: ["DTwP/DTaP", "Hib", "IPV"] },
  { age: "18 – 19 Months", vaccines: ["Hepatitis A-2**", "Varicella 2"] },
  { age: "4 – 6 Years", vaccines: ["DTwP/DTaP", "IPV", "MMR 3"] },
  { age: "9 – 15 Years (Girls)", vaccines: ["HPV (2 doses)"] },
  { age: "10 – 12 Years", vaccines: ["Tdap/Td"] },
  { age: "2nd to 5th Year", vaccines: ["Annual Influenza Vaccine"] }
];

export default function StudentVaccinations() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const studentId = user?.studentId || user?.id || user?.student_id;
  const studentName = user?.name || user?.username || "Student";

  useEffect(() => {
    if (studentId) {
      fetchRecords();
    }
  }, [studentId]);

  const fetchRecords = async () => {
    try {
      const res = await api.get(`/vaccinations/student/${studentId}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to fetch vaccinations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (vaccineName, ageGroup) => {
    const existing = records.find(r => r.vaccineName === vaccineName);
    const newStatus = existing?.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    const date = newStatus === "COMPLETED" ? new Date().toISOString().split('T')[0] : null;

    setSaving(true);
    try {
      const payload = {
        vaccineName,
        ageGroup,
        status: newStatus,
        vaccinationDate: date
      };
      await api.post(`/vaccinations/student/${studentId}`, payload);
      await fetchRecords();
    } catch (err) {
      console.error("Failed to update vaccination:", err);
      alert("Failed to update record. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const stats = useMemo(() => {
    const total = VACCINATION_SCHEDULE.reduce((acc, curr) => acc + curr.vaccines.length, 0);
    const completed = records.filter(r => r.status === "COMPLETED").length;
    return { total, completed, pending: total - completed };
  }, [records]);

  return (
    <DashboardLayout role="student">
      <div className="student-page space-y-6 md:space-y-8 animate-fade-in pb-12">

        {/* ── Hero Vault Banner ── */}
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 text-white shadow-2xl p-6 md:p-10 border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-4 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Official Immunization Schedule
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-3 tracking-tight">Vaccine Tracker</h1>
            <p className="text-slate-300 font-medium md:text-lg">
              Manage <strong className="text-white">{studentName}'s</strong> vaccination history. Check off vaccines as they are administered to maintain a digital record.
            </p>
          </div>
        </div>

        {/* ── Status Overview ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Doses Completed</p>
              <p className="text-3xl font-black text-slate-900">{stats.completed}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl border border-emerald-100">
              🛡️
            </div>
          </div>
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Remaining</p>
              <p className="text-3xl font-black text-blue-600">{stats.pending}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl border border-blue-100">
              📅
            </div>
          </div>
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Schedule</p>
              <p className="text-3xl font-black text-slate-900">{stats.total}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center text-2xl border border-slate-100">
              📋
            </div>
          </div>
        </div>

        {/* ── Vaccination List ── */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Age-Wise Vaccine Schedule</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tap the checkmark to record vaccination</p>
            </div>
            {saving && <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
          </div>

          <div className="divide-y divide-slate-50">
            {VACCINATION_SCHEDULE.map((group, idx) => (
              <div key={idx} className="p-6 md:p-8 group hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Age Label */}
                  <div className="w-32 shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                      {group.age}
                    </span>
                  </div>

                  {/* Vaccines in this age group */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.vaccines.map((vName) => {
                      const record = records.find(r => r.vaccineName === vName);
                      const isDone = record?.status === "COMPLETED";

                      return (
                        <button
                          key={vName}
                          disabled={saving}
                          onClick={() => handleToggle(vName, group.age)}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                            isDone 
                              ? "bg-emerald-50 border-emerald-100 text-emerald-900" 
                              : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
                          }`}
                        >
                          <div className="min-w-0 mr-3">
                            <p className={`text-xs font-black truncate ${isDone ? "text-emerald-900" : "text-slate-900"}`}>
                              {vName}
                            </p>
                            {isDone && record.vaccinationDate && (
                              <p className="text-[9px] font-bold text-emerald-600 mt-0.5">
                                Given: {new Date(record.vaccinationDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 transition-colors ${
                            isDone 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "bg-white border-slate-200 text-transparent"
                          }`}>
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="4">
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
