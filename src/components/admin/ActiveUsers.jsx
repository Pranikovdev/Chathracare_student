import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";

/**
 * ActiveUsers — Real-time active users panel for the Admin Dashboard.
 * Shows who is currently logged in: nurses (with names), students, and admins.
 * Auto-refreshes every 15 seconds for real-time monitoring.
 */
export default function ActiveUsers({ fullDisplay = false, onStatsUpdate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [expandedSection, setExpandedSection] = useState("nurses");

  const fetchActiveSessions = useCallback(async () => {
    try {
      const res = await api.get("/admin/active-sessions");
      setData(res.data);
      if (onStatsUpdate) {
        onStatsUpdate({
          total: res.data.totalActive,
          nurses: res.data.activeNurses,
          students: res.data.activeStudents,
          admins: res.data.activeAdmins
        });
      }
      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Failed to fetch active sessions:", err);
      setError("Unable to fetch active sessions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveSessions();
    const interval = setInterval(fetchActiveSessions, 15000); // Refresh every 15 seconds
    return () => clearInterval(interval);
  }, [fetchActiveSessions]);

  const formatTime = (timeStr) => {
    if (!timeStr) return "—";
    const date = new Date(timeStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ${diffMins % 60}m ago`;
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  const formatLoginTime = (timeStr) => {
    if (!timeStr) return "—";
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  if (loading && !data) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
          <h2 className="text-sm font-bold text-gray-800">Active Users</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center text-lg">⚠️</div>
          <h2 className="text-sm font-bold text-red-700">Connection Error</h2>
        </div>
        <p className="text-xs text-red-500 mb-3">{error}</p>
        <button
          onClick={fetchActiveSessions}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Retry →
        </button>
      </div>
    );
  }

  const totalActive = data?.totalActive || 0;
  const activeNurses = data?.activeNurses || 0;
  const activeStudents = data?.activeStudents || 0;
  const activeAdmins = data?.activeAdmins || 0;
  const nurseDetails = data?.nurseDetails || [];
  const studentDetails = data?.studentDetails || [];
  const adminDetails = data?.adminDetails || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Header with live indicator ── */}
      <div className="p-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <div className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">Live Active Users</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Updated {formatTime(lastRefresh.toISOString())} · Auto-refreshes
            </p>
          </div>
        </div>
        <button
          onClick={fetchActiveSessions}
          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition group"
          title="Refresh now"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* ── Total Active Badge ── */}
      <div className="mx-5 mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl px-5 py-4 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute left-1/2 -bottom-6 w-16 h-16 bg-white/5 rounded-full" />
        <div className="flex items-center justify-between relative">
          <div>
            <p className="text-emerald-100 text-xs font-semibold">Total Online</p>
            <p className="text-4xl font-black mt-0.5">{totalActive}</p>
          </div>
          <div className="flex gap-3">
            <CountChip label="Staff" count={activeAdmins + activeNurses} icon="🏥" />
            <CountChip label="Students" count={activeStudents} icon="🎓" />
          </div>
        </div>
      </div>

      {/* ── Role Breakdown Tabs ── */}
      {!fullDisplay && (
        <div className="px-5 flex gap-2 mb-3">
          <RoleTab
            label="Nurses"
            count={activeNurses}
            color="emerald"
            active={expandedSection === "nurses"}
            onClick={() => setExpandedSection(expandedSection === "nurses" ? null : "nurses")}
          />
          <RoleTab
            label="Students"
            count={activeStudents}
            color="blue"
            active={expandedSection === "students"}
            onClick={() => setExpandedSection(expandedSection === "students" ? null : "students")}
          />
          <RoleTab
            label="Admins"
            count={activeAdmins}
            color="purple"
            active={expandedSection === "admins"}
            onClick={() => setExpandedSection(expandedSection === "admins" ? null : "admins")}
          />
        </div>
      )}
 
       {/* ── Expanded Sections ── */}
       <div className={`px-5 pb-5 ${fullDisplay ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : ""}`}>
         {/* ── Nurses Section (PRIORITY - Shows Names for Security) ── */}
         {(expandedSection === "nurses" || fullDisplay) && (
           <div className="space-y-3">
             {fullDisplay && (
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Nurses Online
                 </h3>
                 <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{activeNurses}</span>
               </div>
             )}
             {nurseDetails.length === 0 ? (
               <EmptyState emoji="👩‍⚕️" text="No nurses online" />
             ) : (
               nurseDetails.map((nurse, i) => (
                 <div
                   key={nurse.id || i}
                   className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-50 transition group"
                 >
                   <div className="relative">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                       {getInitials(nurse.name)}
                     </div>
                     <div className="absolute -bottom-px -right-px w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-gray-900 truncate">{nurse.name}</p>
                     <p className="text-[11px] text-gray-500 truncate">{nurse.email}</p>
                   </div>
                   <div className="text-right shrink-0">
                     <p className="text-xs font-semibold text-emerald-700">
                       🕐 {formatLoginTime(nurse.loginTime)}
                     </p>
                     <DeviceInfoDisplay ipAddress={nurse.ipAddress} deviceDetails={nurse.deviceDetails} />
                   </div>
                 </div>
               ))
             )}
           </div>
         )}
 
         {/* ── Students Section ── */}
         {(expandedSection === "students" || fullDisplay) && (
           <div className="space-y-3">
             {fullDisplay && (
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                   Students Online
                 </h3>
                 <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{activeStudents}</span>
               </div>
             )}
             {studentDetails.length === 0 ? (
               <EmptyState emoji="🎓" text="No students online" />
             ) : (
               <div>
                 {studentDetails.slice(0, fullDisplay ? 15 : 10).map((student, i) => (
                   <div
                     key={student.id || i}
                     className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 mb-2 hover:bg-blue-50 transition"
                   >
                     <div className="relative">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                         {getInitials(student.name)}
                       </div>
                       <div className="absolute -bottom-px -right-px w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-sm font-bold text-gray-900 truncate">{student.name}</p>
                       <p className="text-[11px] text-gray-500">ID: {student.studentSchoolId}</p>
                     </div>
                     <div className="text-right shrink-0">
                       <p className="text-xs font-semibold text-blue-700">
                         🕐 {formatLoginTime(student.loginTime)}
                       </p>
                       <DeviceInfoDisplay ipAddress={student.ipAddress} deviceDetails={student.deviceDetails} />
                     </div>
                   </div>
                 ))}
                 {studentDetails.length > (fullDisplay ? 15 : 10) && (
                   <p className="text-xs text-center text-gray-400 mt-2 font-medium">
                     + {studentDetails.length - (fullDisplay ? 15 : 10)} more students online
                   </p>
                 )}
               </div>
             )}
           </div>
         )}
 
         {/* ── Admins Section ── */}
         {(expandedSection === "admins" || fullDisplay) && (
           <div className="space-y-3">
             {fullDisplay && (
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                   Admins Online
                 </h3>
                 <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{activeAdmins}</span>
               </div>
             )}
             {adminDetails.length === 0 ? (
               <EmptyState emoji="🔒" text="No other admins" />
             ) : (
               adminDetails.map((admin, i) => (
                 <div
                   key={admin.id || i}
                   className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100 hover:bg-purple-50 transition"
                 >
                   <div className="relative">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                       {getInitials(admin.name)}
                     </div>
                     <div className="absolute -bottom-px -right-px w-3.5 h-3.5 bg-purple-500 rounded-full border-2 border-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-gray-900 truncate">{admin.name}</p>
                     <p className="text-[11px] text-gray-500 truncate">{admin.email}</p>
                   </div>
                   <div className="text-right shrink-0">
                     <p className="text-xs font-semibold text-purple-700">
                       🕐 {formatLoginTime(admin.loginTime)}
                     </p>
                     <DeviceInfoDisplay ipAddress={admin.ipAddress} deviceDetails={admin.deviceDetails} />
                   </div>
                 </div>
               ))
             )}
           </div>
         )}
       </div>

      {/* ── Security Notice ── */}
      <div className="mx-5 mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
        <span className="text-lg mt-0.5">🛡️</span>
        <div>
          <p className="text-xs font-bold text-amber-800">Security Monitoring Active</p>
          <p className="text-[11px] text-amber-600 mt-0.5">
            All login sessions are tracked with IP addresses and timestamps for audit compliance.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Components ── */

function CountChip({ label, count, icon }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[60px]">
      <p className="text-xs">{icon}</p>
      <p className="text-lg font-black">{count}</p>
      <p className="text-[10px] text-emerald-100">{label}</p>
    </div>
  );
}

function RoleTab({ label, count, color, active, onClick }) {
  const colorMap = {
    emerald: {
      active: "bg-emerald-100 border-emerald-300 text-emerald-700",
      idle: "bg-gray-50 border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600",
    },
    blue: {
      active: "bg-blue-100 border-blue-300 text-blue-700",
      idle: "bg-gray-50 border-gray-200 text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600",
    },
    purple: {
      active: "bg-purple-100 border-purple-300 text-purple-700",
      idle: "bg-gray-50 border-gray-200 text-gray-500 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600",
    },
  };

  const classes = active ? colorMap[color].active : colorMap[color].idle;

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-bold transition ${classes}`}
    >
      {label}
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/70 text-[10px] font-black">
        {count}
      </span>
    </button>
  );
}

function EmptyState({ emoji, text }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="text-3xl mb-2">{emoji}</span>
      <p className="text-sm text-gray-400 font-medium">{text}</p>
    </div>
  );
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function parseUserAgent(ua) {
  if (!ua) return "Unknown Device";
  let os = "Unknown OS";
  let browser = "Web Browser";

  if (ua.includes("Windows NT 10.0") || ua.includes("Windows 11")) os = "Windows";
  else if (ua.includes("Windows NT")) os = "Windows (Legacy)";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Postman")) browser = "Postman API";

  return `${os} · ${browser}`;
}

const locationCache = {};

function DeviceInfoDisplay({ ipAddress, deviceDetails }) {
  const [location, setLocation] = useState("Locating...");

  useEffect(() => {
    let isMounted = true;
    const isLocal = !ipAddress || 
                    ipAddress === "unknown" || 
                    ipAddress === "127.0.0.1" || 
                    ipAddress === "0:0:0:0:0:0:0:1" || 
                    ipAddress.startsWith("192.168.") || 
                    ipAddress.startsWith("10.") || 
                    ipAddress.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./);

    if (isLocal) {
      setLocation("Local Network (Private)");
      return;
    }

    if (locationCache[ipAddress]) {
      setLocation(locationCache[ipAddress]);
      return;
    }

    // Attempt to geolocate using ipapi.co
    fetch(`https://ipapi.co/${ipAddress}/json/`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data && data.city) {
          const locStr = `${data.city}, ${data.region_code || data.country_name}`;
          locationCache[ipAddress] = locStr;
          setLocation(locStr);
        } else {
          setLocation("Unknown Location");
        }
      })
      .catch(() => {
        if (isMounted) setLocation("Unknown Location");
      });

    return () => { isMounted = false; };
  }, [ipAddress]);

  return (
    <div className="text-[10px] text-gray-500 mt-1 flex flex-col items-end gap-0.5">
      <div className="flex items-center gap-1">
        <span className="opacity-70">IP:</span>
        <span className="font-mono text-gray-600 font-semibold">{ipAddress || "N/A"}</span>
      </div>
      <div className="flex items-center gap-1 text-gray-400">
        <span title={deviceDetails}>💻 {parseUserAgent(deviceDetails)}</span>
      </div>
      <div className="flex items-center gap-1 text-blue-500/80 font-medium">
        🌍 {location}
      </div>
    </div>
  );
}
