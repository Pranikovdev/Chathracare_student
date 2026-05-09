import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";

export default function StudentProfile() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = user?.studentId || user?.id || user?.student_id;
    if (id) {
      fetchStudentData(id);
    }
  }, [user]);

  const fetchStudentData = async (id) => {
    try {
      const res = await api.get(`/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.error("Failed to fetch student profile:", err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex items-center justify-center h-full">
          <div className="text-blue-600 animate-pulse font-bold">Loading profile info...</div>
        </div>
      </DashboardLayout>
    );
  }

  const name = student?.name || user?.name || "Student";
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <DashboardLayout role="student">
      <div className="student-page">
        {/* Profile header card */}
        <div className="student-card bg-white rounded-2xl shadow border border-blue-100 p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-200 flex items-center justify-center transition shadow-md"
              >
                <span className="text-4xl font-black text-blue-600 select-none">{initials}</span>
              </div>
            </div>

            {/* Name + meta */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-blue-900">{name}</h1>
              <p className="text-sm text-blue-500 mt-0.5">
                {student?.studentClass ? `Class ${student.studentClass}` : user?.className ? `Class ${user.className}` : "N/A"}
                {student?.section ? ` - ${student.section}` : user?.section ? ` - ${user.section}` : ""}
                · {student?.schoolName || user?.schoolName || "Chathracare Network"}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full">Student ID: {student?.studentSchoolId || user?.studentSchoolId || "—"}</span>
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full">Health ID: {student?.studentHealthId || "TRQ-LIVE-ID"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Info label="Full Name" value={name} />
          <Info label="Student ID" value={student?.studentSchoolId || user?.studentSchoolId} />
          <Info label="Class & Section" value={`${student?.studentClass || user?.className || ""} ${student?.section || user?.section || ""}`} />
          <Info label="Gender" value={student?.gender || user?.gender} />
          <Info label="Date of Birth" value={(() => {
            const dob = student?.dob || user?.dob;
            if (!dob) return "—";
            const [y, m, d] = dob.split("-");
            return d && m && y ? `${d}/${m}/${y}` : dob;
          })()} />
          <Info label="Parent/Guardian Name" value={student?.parent_name || user?.parent_name} />
          <Info label="Blood Group" value={student?.bloodGroup || "—"} />
          <Info label="School" value={student?.schoolName || user?.schoolName} />
          <Info label="Emergency Contact" value={student?.phone || user?.phone} />
          <Info label="Academic Year" value="2025–26" />
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }) {
  return (
    <div className="student-card bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
      <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wide">{label}</div>
      <div className="text-blue-900 font-semibold mt-1 text-sm">{value || "—"}</div>
    </div>
  );
}
