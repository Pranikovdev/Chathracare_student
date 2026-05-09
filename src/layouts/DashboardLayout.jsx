import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout({ role, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainClass =
    role === "admin"
      ? "flex-1 admin-main-bg overflow-y-auto p-4 md:p-6"
      : role === "nurse"
        ? "flex-1 nurse-main-bg overflow-y-auto p-4 md:p-6"
        : role === "student"
          ? "flex-1 student-main-bg overflow-y-auto p-4 md:p-8"
          : "flex-1 bg-blue-50 overflow-y-auto p-4 md:p-6";

  return (
    <div className={`flex h-screen overflow-hidden role-theme-${role}`}>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar role={role} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-white z-50 transform transition-transform">
            <Sidebar role={role} isMobile={true} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header (Top Navbar) */}
        <div className="md:hidden bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100 flex items-center justify-between h-16 px-4 shrink-0 z-10 transition-colors">
          <div className="font-bold text-lg text-blue-900 drop-shadow-sm flex items-center gap-2">
            {/* Logo shape */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              CC
            </div>
            Chathracare
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-blue-900 p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <main className={mainClass}>
          {children}
        </main>
      </div>

    </div>
  );
}
