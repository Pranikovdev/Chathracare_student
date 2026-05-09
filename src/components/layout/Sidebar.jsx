import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Sidebar({ role, isMobile, onClose }) {
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isAdmin = false;
  const isNurse = false;
  const isStudent = role === "student";
  const isStyledSidebar = isStudent;
  const sidebarClass = isStudent
    ? "student-sidebar"
    : "bg-primary";
  const dashboardPath = "/student/dashboard";

  return (
    <>
      <aside className={`${isMobile ? 'w-full' : 'w-64'} ${sidebarClass} text-white min-h-screen relative overflow-hidden flex flex-col`}>

        <div className={`p-6 text-xl font-bold border-b border-blue-700 ${isStyledSidebar ? "nurse-sidebar-brand" : ""} flex items-center justify-between`}>
          <span>Chathracare</span>
          {isMobile && (
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <nav className="p-4 space-y-2 text-sm flex-1 overflow-y-auto">

          <MenuLink to={dashboardPath} label="Dashboard" isStyledSidebar={isStyledSidebar} onClick={isMobile ? onClose : undefined} />


          {role === "student" && (
            <>
              <MenuLink to="/student/health-card" label="View Health Card" isStyledSidebar={isStyledSidebar} onClick={isMobile ? onClose : undefined} />
              <MenuLink to="/student/timeline" label="View Past Medical History" isStyledSidebar={isStyledSidebar} onClick={isMobile ? onClose : undefined} />
              <MenuLink to="/student/vaccinations" label="Vaccination Tracker" isStyledSidebar={isStyledSidebar} onClick={isMobile ? onClose : undefined} />
              <MenuLink to="/student/profile" label="Profile" isStyledSidebar={isStyledSidebar} onClick={isMobile ? onClose : undefined} />
            </>
          )}

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 transition ${isStyledSidebar ? "nurse-nav-link" : ""}`}
          >
            Logout
          </button>

        </nav>

        {isStudent && (
          <div className="student-vertical-tag" aria-hidden="true">
            STUDENT
          </div>
        )}
        {isAdmin && (
          <div className="admin-vertical-tag" aria-hidden="true">
            ADMIN
          </div>
        )}
      </aside>

      {/* ── Glass Metallic Logout Modal ── */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative w-full max-w-sm rounded-[2.5rem] p-px bg-gradient-to-br from-white/40 via-white/10 to-transparent shadow-2xl animate-float-up">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/40 p-8 shadow-inner">
              {/* Metallic Accent */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-orange-500/20 flex items-center justify-center mb-6 shadow-xl border border-white/50">
                  <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Ready to leave?</h2>
                <p className="mt-3 text-slate-600 text-sm font-medium leading-relaxed">
                  Sign out to secure your session. You'll need your credentials to log back in.
                </p>

                <div className="mt-8 flex flex-col w-full gap-3">
                  <button
                    onClick={logout}
                    className="w-full py-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-black text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 uppercase tracking-widest"
                  >
                    Yes, Logout Now
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full py-4 rounded-2xl bg-white/50 hover:bg-white text-slate-700 font-bold text-sm border border-slate-200 transition-all duration-300"
                  >
                    No, stay here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuLink({ to, label, isStyledSidebar, badge, onClick }) {
  if (isStyledSidebar) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-2.5 rounded-lg transition nurse-nav-link ${isActive ? "active" : ""}`
        }
      >
        <span>{label}</span>
        {badge && (
          <span className="text-[10px] font-bold bg-blue-500/30 border border-blue-400/40 text-blue-100 px-1.5 py-0.5 rounded-full">{badge}</span>
        )}
      </NavLink>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      {label}
    </Link>
  );
}
