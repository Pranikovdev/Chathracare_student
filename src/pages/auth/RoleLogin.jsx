import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";

const DEMO_OTP = "123456";

const roleConfig = {
  student: {
    title: "Welcome to Chathracare",
    subtitle: "Student access for health records and updates.",
    helper: "Use your student ID and date of birth to continue.",
    inputOne: "School Student ID",
    inputTwo: "DOB (DD-MM-YYYY)",
    homePath: "/student/dashboard",
    accent: "from-[#1d4ed8] via-[#1e40af] to-[#f97316]",
    chip: "Student Portal",
  },
};

export default function RoleLogin({ role = "student" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mfaToken, setMfaToken] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [lockedMessage, setLockedMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const navigate = useNavigate();
  const { login } = useAuth();
  const config = roleConfig[role];
  const isStaff = role === "staff";

  // Validates that DOB is strictly DD-MM-YYYY or DD/MM/YYYY
  // Returns { valid: true, formatted: "YYYY-MM-DD" } or { valid: false, error: "..." }
  function parseDob(raw) {
    const trimmed = raw.trim();
    const sep = trimmed.includes("/") ? "/" : trimmed.includes("-") ? "-" : null;

    if (!sep) {
      return { valid: false, error: "Date must be in DD-MM-YYYY format (e.g. 15-08-2005)." };
    }

    const parts = trimmed.split(sep);
    if (parts.length !== 3) {
      return { valid: false, error: "Date must be in DD-MM-YYYY format (e.g. 15-08-2005)." };
    }

    const [day, month, year] = parts;

    // Reject YYYY-MM-DD: year part should be 4 digits only in the THIRD position
    // and the FIRST part (day) must be ≤ 2 digits
    if (day.length === 4) {
      return { valid: false, error: "Invalid format. Please enter date as DD-MM-YYYY (e.g. 15-08-2005)." };
    }

    if (year.length !== 4) {
      return { valid: false, error: "Date must be in DD-MM-YYYY format (e.g. 15-08-2005)." };
    }

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      return { valid: false, error: "Date must be in DD-MM-YYYY format (e.g. 15-08-2005)." };
    }

    if (m < 1 || m > 12) {
      return { valid: false, error: "Month must be between 01 and 12." };
    }

    if (d < 1 || d > 31) {
      return { valid: false, error: "Day must be between 01 and 31." };
    }

    const formatted = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    return { valid: true, formatted };
  }

  async function handleResendOtp() {
    if (resendTimer > 0) return;
    setOtp("");
    setOtpError("");
    setResendTimer(30);
    await handleLogin(null);
  }

  async function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      if (isStaff) {
        response = await api.post("/auth/login", { email: username, password });

        if (response.data.mfaRequired) {
          setMfaToken(response.data.mfaToken);
          setShowOtp(true);
          return;
        }

        const rawRole = (response.data.role || "").toUpperCase();
        const assignedRole = rawRole === "ADMIN" ? "admin" : "nurse";
        console.log("Login Success. Raw Role:", rawRole, "Assigned Role:", assignedRole);

        const userData = {
          ...response.data,
          role: assignedRole,
          name: response.data.name,
          nurseId: response.data.nurse_id,
          assignments: response.data.assignSchoolIds
        };

        login(userData);
        const nextPath = assignedRole === "admin" ? "/admin/dashboard" : "/nurse/dashboard";
        console.log("Navigating to:", nextPath);
        navigate(nextPath);
      } else {
        // Strictly validate DOB format
        const dobResult = parseDob(password);
        if (!dobResult.valid) {
          setError(dobResult.error);
          setLoading(false);
          return;
        }

        response = await api.post("/auth/student/login", {
          studentSchoolId: username,
          dob: dobResult.formatted,
        });

        if (response.data.mfaRequired) {
          setMfaToken(response.data.mfaToken);
          setShowOtp(true);
          return;
        }

        const userData = { ...response.data, role: "student" };
        console.log("Student Login Success. Requesting Consent.");
        setPendingUser(userData);
        setShowConsent(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Login failed. Please check your credentials.";
      if (msg.toLowerCase().includes("locked") || msg.toLowerCase().includes("too many authentication attempts")) {
        setLockedMessage(msg);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setOtpError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login/verify-mfa", { mfaToken, code: otp });
      setOtpVerified(true);
      setTimeout(() => {
        const rawRole = (response.data.role || "").toUpperCase();
        let assignedRole = "student";
        let nextPath = "/student/dashboard";

        if (rawRole === "ADMIN") {
          assignedRole = "admin";
          nextPath = "/admin/dashboard";
        } else if (rawRole === "NURSE") {
          assignedRole = "nurse";
          nextPath = "/nurse/dashboard";
        }

        const userData = {
          ...response.data,
          role: assignedRole,
          name: response.data.name,
          nurseId: response.data.nurse_id,
          assignments: response.data.assignSchoolIds
        };

        if (assignedRole === "student") {
          setShowOtp(false);
          setPendingUser(userData);
          setShowConsent(true);
        } else {
          login(userData);
          navigate(nextPath);
        }
      }, 800);
    } catch (err) {
      setOtpError(err.response?.data?.message || "MFA Verification failed");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpKeyDown(e) {
    if (e.key === "Enter") handleVerifyOtp();
  }

  function handleConsent() {
    login(pendingUser);
    navigate(config.homePath);
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-center overflow-x-hidden bg-gradient-to-br from-[#e9f0ff] via-[#eef4ff] to-[#fff4e5] p-4 sm:p-6 md:p-8">
      <style>{`
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
        .animate-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
          animation-delay: 0.15s;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute right-[-8rem] top-24 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute left-1/3 bottom-[-6rem] h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto py-6 sm:py-8 lg:py-12">
        <div className="w-full grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
          <section className="rounded-[30px] border border-white/80 bg-white/65 backdrop-blur-md p-3 md:p-4 shadow-[0_34px_80px_rgba(30,64,175,0.2)]">
            <div className="rounded-3xl bg-[linear-gradient(160deg,#f6f8fd_0%,#f7f9ff_58%,#fff2db_100%)] border border-white/80 p-5 md:p-7 flex flex-col">
              <div className="inline-flex items-center gap-2 text-slate-900 font-semibold">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  C
                </span>
                Chathracare
              </div>

              <div className="mt-5">
                <span className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-blue-700">
                  {config.chip}
                </span>
                <h1 className="mt-2 text-3xl md:text-4xl leading-tight font-semibold text-slate-900">{config.title}</h1>
                <p className="mt-3 text-slate-600 max-w-md">{config.subtitle}</p>
              </div>

              <form onSubmit={handleLogin} className="mt-5 space-y-3.5">
                <InputField
                  value={username}
                  onChange={setUsername}
                  placeholder={config.inputOne}
                  icon={<MailIcon />}
                />
                {/* Password field with eye toggle */}
                <PasswordField
                  value={password}
                  onChange={setPassword}
                  placeholder={config.inputTwo}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword((v) => !v)}
                />

                {error && (
                  <div className="text-red-500 text-xs font-semibold bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-2xl py-3.5 text-white font-semibold bg-gradient-to-r ${config.accent} shadow-[0_12px_30px_rgba(30,64,175,0.22)] hover:brightness-105 transition disabled:opacity-50`}
                >
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </form>

              <p className="mt-3 text-xs text-blue-700 bg-blue-50/70 border border-blue-100 rounded-xl px-3 py-2">{config.helper}</p>

              <div className="mt-4 flex items-center justify-center text-sm text-slate-600">
                <span className="font-semibold text-blue-700">Official Student Access Only</span>
              </div>
            </div>
          </section>

          <section className="hidden md:flex rounded-[30px] border border-white/70 bg-white/30 backdrop-blur-sm p-4">
            <div className="w-full rounded-3xl overflow-hidden border border-white/70 bg-white/50">
              <img
                src={role === "student" ? "/students_login_page.png" : "/staff_login_page.png"}
                alt={role === "student" ? "Student login visual" : "Staff login visual"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector("[data-fallback='true']")) {
                    const fallback = document.createElement("div");
                    fallback.setAttribute("data-fallback", "true");
                    fallback.className = "w-full h-full border border-dashed border-blue-200 bg-gradient-to-br from-white/70 to-blue-50/40 flex items-center justify-center text-center px-8";
                    fallback.innerHTML = "<div><p class='text-sm font-semibold tracking-[0.16em] uppercase text-blue-600'>Right Half Image Area</p><p class='mt-3 text-slate-600'>Add your image here</p></div>";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </section>
        </div>
      </div>

      {/* ── Admin OTP Modal ── */}
      {showOtp && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Identity Verification</h2>
                  <p className="text-blue-200 text-sm mt-0.5">Two-factor authentication</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!otpVerified ? (
                <>
                  {otpSending ? (
                    <div className="flex flex-col items-center py-4 text-center">
                      <svg className="w-8 h-8 text-blue-500 animate-spin mb-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <p className="text-gray-600 text-sm font-medium">Sending OTP to registered phone…</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5 text-sm text-blue-700">
                        <strong>OTP sent</strong> to the registered contact.
                        <br />
                        <span className="text-xs text-blue-500">Please enter the 6-digit code to continue.</span>
                      </div>

                      <label className="block text-sm font-bold text-gray-700 mb-2">Enter 6-digit OTP</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setOtpError(""); }}
                        onKeyDown={handleOtpKeyDown}
                        placeholder="_ _ _ _ _ _"
                        className="w-full text-center text-2xl font-bold tracking-[0.4em] border-2 border-blue-200 rounded-2xl py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        autoFocus
                      />

                      <div className="flex justify-between items-center mt-3 px-1">
                        <span className="text-xs text-gray-500 font-medium">{resendTimer > 0 ? `Resend OTP in 00:${resendTimer.toString().padStart(2, '0')}` : "Didn't receive the OTP?"}</span>
                        <button
                          type="button"
                          disabled={resendTimer > 0}
                          onClick={handleResendOtp}
                          className="text-xs font-bold text-blue-600 disabled:text-gray-400 hover:text-blue-800 transition"
                        >
                          Resend OTP
                        </button>
                      </div>

                      {otpError && (
                        <p className="text-red-500 text-sm font-semibold mt-2 text-center">{otpError}</p>
                      )}

                      <div className="flex gap-3 mt-5">
                        <button
                          type="button"
                          onClick={() => { setShowOtp(false); setOtp(""); setOtpError(""); }}
                          className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={otp.length < 6 || loading}
                          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:brightness-110 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Verifying..." : "Verify & Login"}
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center py-8 text-center animate-fade-in relative">
                  <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-2 bg-emerald-400 rounded-full animate-pulse opacity-40" />
                    <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                      <svg className="w-10 h-10 text-white animate-check" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Verified Successfully</h3>
                  <p className="text-slate-500 font-medium">Securing connection and redirecting...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Student Consent Modal ── */}
      {showConsent && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-6 text-white relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Parental Consent</h2>
                  <p className="text-blue-200 text-sm mt-0.5">Authorization Required</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-4 mb-5 text-sm text-blue-800 leading-relaxed">
                By acknowledging this consent, you agree that your child is participating in the health and screening activities conducted by the Chathracare Network. You hereby provide your informed consent for the secure collection and processing of their medical vitals and clinical observations.
              </div>

              <label className="flex items-start gap-3 mt-4 mb-6 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="peer w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-blue-600 transition"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition">
                  I agree for all the terms and conditions.
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowConsent(false); setPendingUser(null); setConsentChecked(false); }}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition text-sm"
                >
                  Decline & Cancel
                </button>
                <button
                  type="button"
                  disabled={!consentChecked}
                  onClick={handleConsent}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-semibold hover:brightness-110 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  I Agree & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Account Locked Modal ── */}
      {lockedMessage && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(225,29,72,0.3)] border border-rose-50 overflow-hidden relative">
            <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-red-700 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-black/10 rounded-full blur-xl" />

              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-pulse">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-wider relative z-10 uppercase drop-shadow-md">Account Locked</h2>
              <p className="text-rose-100 text-xs mt-1.5 font-bold relative z-10 uppercase tracking-[0.2em] opacity-90">Security Protocol Activated</p>
            </div>

            <div className="p-8 text-center bg-slate-50">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
                <p className="text-slate-700 font-semibold text-sm leading-relaxed">
                  {lockedMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLockedMessage("")}
                className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
              >
                Confirm & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Password field with eye toggle ──
function PasswordField({ value, onChange, placeholder, showPassword, onToggleShow }) {
  return (
    <label className="auth-input-shell flex items-center rounded-2xl border border-slate-200 bg-white/95 overflow-hidden shadow-[0_6px_14px_rgba(15,23,42,0.05)] transition">
      <span className="w-12 h-12 flex items-center justify-center text-slate-500 border-r border-slate-200 bg-slate-50 shrink-0">
        <LockIcon />
      </span>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="auth-input-field w-full px-4 py-3.5 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={onToggleShow}
        className="w-11 h-12 flex items-center justify-center text-slate-400 hover:text-blue-600 transition shrink-0 border-l border-slate-100"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </label>
  );
}

function InputField({ value, onChange, placeholder, icon, type = "text" }) {
  return (
    <label className="auth-input-shell flex items-center rounded-2xl border border-slate-200 bg-white/95 overflow-hidden shadow-[0_6px_14px_rgba(15,23,42,0.05)] transition">
      <span className="w-12 h-12 flex items-center justify-center text-slate-500 border-r border-slate-200 bg-slate-50">
        {icon}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="auth-input-field w-full px-4 py-3.5 bg-transparent text-slate-900 placeholder:text-slate-400"
      />
    </label>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m5.5 7.5 6.5 5 6.5-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4.5" y="10.5" width="15" height="9" rx="2" />
      <path d="M8 10V8a4 4 0 1 1 8 0v2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.324-3.894M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.1 6.1A9.97 9.97 0 002.458 12C3.732 16.057 7.523 19 12 19c1.657 0 3.22-.4 4.6-1.1" />
    </svg>
  );
}
