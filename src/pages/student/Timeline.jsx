import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function bmiLabel(bmi) {
  if (bmi < 18.5) return { text: "Underweight", color: "text-amber-600" };
  if (bmi < 25) return { text: "Healthy", color: "text-emerald-600" };
  if (bmi < 30) return { text: "Overweight", color: "text-orange-600" };
  return { text: "Obese", color: "text-red-600" };
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className="text-xs font-semibold text-gray-700">{value || "—"}</span>
    </div>
  );
}

export default function StudentTimeline() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    if (user?.studentId || user?.id || user?.student_id) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const id = user?.studentId || user?.id || user?.student_id;

      // Fetch current active screening and archived history
      const [currentRes, historyRes] = await Promise.all([
        api.get(`/screening/student/${id}`).catch(() => ({ data: null })),
        api.get(`/screening/student/${id}/history`).catch(() => ({ data: [] }))
      ]);

      const historyData = historyRes.data || [];
      const currentData = currentRes.data;

      // Merge current record at the top if it doesn't already exist in history
      // (sometimes the current record might be the same as the top history if recently archived, 
      // but usually HealthRecords and MedicalHistory are separate tables)
      let combined = [...historyData];
      if (currentData) {
        // Simple check to avoid double entry if they share the same ID (though unlikely with history pattern)
        const alreadyExists = combined.some(h => h.id === currentData.id);
        if (!alreadyExists) {
          combined = [currentData, ...combined];
        }
      }

      // Sort by date descending
      combined.sort((a, b) => {
        const dateA = new Date(a.lastScreeningDate || a.archivedAt || a.screeningDate);
        const dateB = new Date(b.lastScreeningDate || b.archivedAt || b.screeningDate);
        return dateB - dateA;
      });

      setRecords(combined);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="student-page p-6 text-blue-600 animate-pulse">Loading medical history...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="student-page">
        {/* Page header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-blue-900">Past Medical History</h1>
          <p className="text-sm text-gray-400 mt-0.5">{records.length} screening records on file</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical guide line */}
          <div className="absolute left-[18px] top-4 bottom-4 w-px bg-blue-100" />

          <div className="space-y-3">
            {records.map((item, idx) => {
              const bmiVal = item.bmi || (item.height && item.weight ? (item.weight / ((item.height / 100) ** 2)).toFixed(1) : "—");
              const { text: bmiText, color: bmiColor } = bmiLabel(parseFloat(bmiVal) || 0);
              const isLatest = idx === 0;

              return (
                <div key={item.id} className="relative flex gap-4 items-start">
                  {/* Timeline dot */}
                  <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center z-10 mt-0.5 border-2 ${isLatest ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-200" : "bg-white border-gray-200 text-gray-300"
                    }`}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Main card */}
                  <div className={`flex-1 rounded-xl border p-4 transition hover:shadow-sm ${isLatest ? "border-blue-100 bg-white shadow-sm" : "border-gray-100 bg-white"
                    }`}>
                    {/* Top row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-gray-800">{item.lastScreeningDate ? new Date(item.lastScreeningDate).toLocaleDateString() : "—"}</span>
                        {isLatest && (
                          <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Latest</span>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedRecord(item)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition whitespace-nowrap underline-offset-2 hover:underline"
                      >
                        Full Report →
                      </button>
                    </div>

                    {/* Vitals grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide leading-none">Height</p>
                        <p className="text-[11px] font-bold text-gray-800 mt-0.5 leading-tight">{item.height} cm</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide leading-none">Weight</p>
                        <p className="text-[11px] font-bold text-gray-800 mt-0.5 leading-tight">{item.weight} kg</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide leading-none">BMI</p>
                        <p className="text-[11px] font-bold text-gray-800 mt-0.5 leading-tight">{bmiVal}</p>
                        <p className={`text-[9px] font-semibold leading-none mt-0.5 ${bmiColor}`}>{bmiText}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide leading-none">Temp</p>
                        <p className="text-[11px] font-bold text-gray-800 mt-0.5 leading-tight">{item.temperature}°C</p>
                      </div>
                    </div>

                    {/* Snapshot of top responses */}
                    {item.responses && item.responses.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-50 flex flex-wrap gap-2 items-center">
                        {item.responses.slice(0, 3).map((resp, rIdx) => (
                          <span key={rIdx} className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                            {resp.questionCode || "OBS"}: {resp.answer}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Full Report Modal ── */}
      {selectedRecord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Full Health Report</p>
                <h2 className="text-lg font-bold mt-0.5">{selectedRecord.lastScreeningDate ? new Date(selectedRecord.lastScreeningDate).toLocaleDateString() : "-"}</h2>
                <p className="text-blue-200 text-xs mt-1">Session ID: #{selectedRecord.id}</p>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="text-blue-200 hover:text-white transition p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Blood Group", value: selectedRecord.bloodGroup },
                  { label: "Height", value: `${selectedRecord.height} cm` },
                  { label: "Weight", value: `${selectedRecord.weight} kg` },
                  { label: "BMI", value: selectedRecord.bmi || (selectedRecord.height && selectedRecord.weight ? (selectedRecord.weight / ((selectedRecord.height / 100) ** 2)).toFixed(1) : "—") },
                  { label: "Blood Pressure", value: selectedRecord.bloodPressure },
                  { label: "Heart Rate", value: selectedRecord.heartRate ? `${selectedRecord.heartRate} bpm` : "—" },
                  { label: "Temperature", value: selectedRecord.temperature ? `${selectedRecord.temperature}°C` : "—" },
                ].map((v, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-wide mb-1">{v.label}</span>
                    <span className="text-sm font-black text-blue-900">{v.value || "—"}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b pb-2">Clinical Observations</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedRecord.responses && selectedRecord.responses.map((resp, rIdx) => (
                    <ClinicalFindingTag key={rIdx} question={resp.questionText} answer={resp.answer} />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setSelectedRecord(null)} className="student-btn-primary px-5 py-2 text-sm font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
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
