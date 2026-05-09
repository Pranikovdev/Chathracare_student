import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

function formatScreeningDate(dateStr) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch (e) {
    return dateStr;
  }
}

export default function StudentCurrentReport() {
  const { user } = useAuth();
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.studentId || user?.id || user?.student_id) {
      fetchLatestReport();
    }
  }, [user]);

  const fetchLatestReport = async () => {
    const id = user?.studentId || user?.id || user?.student_id;
    try {
      // Fetch both current and history to find the most recent one
      const [currentRes, historyRes] = await Promise.all([
        api.get(`/screening/student/${id}`).catch(() => ({ data: null })),
        api.get(`/screening/student/${id}/history`).catch(() => ({ data: [] }))
      ]);

      const current = currentRes.data;
      const recentHistory = historyRes.data && historyRes.data.length > 0 ? historyRes.data[0] : null;

      setLatest(current || recentHistory);
    } catch (err) {
      console.error("Failed to fetch latest report:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="student-page p-6">
          <p className="text-blue-600 animate-pulse">Loading report...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!latest) {
    return (
      <DashboardLayout role="student">
        <div className="student-page">
          <div className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6">
            <h1 className="text-2xl font-bold text-blue-900">Current Screening Report</h1>
            <p className="text-sm text-blue-600 mt-2">No screening report available.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="student-page">
        <div className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6">
          <h1 className="text-2xl font-bold text-blue-900">Current Screening Report</h1>
          <p className="text-sm text-blue-600 mt-1">
            Latest archived screening from your health history.
          </p>
        </div>

        <div className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Report ID" value={`#${latest.id}`} />
            <Field label="Screening Date" value={formatScreeningDate(latest.lastScreeningDate || latest.archivedAt || latest.screeningDate)} />
            <Field label="Blood Group" value={latest.bloodGroup} />
            <Field label="Blood Pressure" value={latest.bloodPressure} />
            <Field label="Heart Rate" value={`${latest.heartRate} bpm`} />
            <Field label="Temperature" value={`${latest.temperature} C`} />
            <Field label="Height" value={`${latest.height} cm`} />
            <Field label="Weight" value={`${latest.weight} kg`} />
            <Field label="Vision Status" value={latest.visionStatus} />
            <Field label="Hearing Status" value={latest.hearingStatus} />
            <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/30">
              <div className="text-xs text-blue-600 font-semibold">Vaccination Status</div>
              <a href="/student/vaccinations" className="text-blue-900 font-bold mt-1 hover:underline flex items-center gap-2">
                View Official Tracker
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <Field label="Current Medication" value={latest.currentMedication} />
            <Field label="Allergies" value={latest.allergies} />
            <Field label="Chronic Conditions" value={latest.chronicConditions} />
          </div>

          <div className="mt-6 border border-blue-100 rounded-xl p-4">
            <div className="text-xs text-blue-600 font-semibold">Notes</div>
            <div className="text-blue-900 mt-2">{latest.notes}</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, value }) {
  return (
    <div className="border border-blue-100 rounded-xl p-4">
      <div className="text-xs text-blue-600 font-semibold">{label}</div>
      <div className="text-blue-900 font-semibold mt-1">{value}</div>
    </div>
  );
}
