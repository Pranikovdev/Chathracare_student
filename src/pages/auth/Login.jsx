import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const roles = [
  {
    label: "Staff",
    path: "/login/staff",
    button: "bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400",
    ring: "ring-blue-200/70",
    border: "border-blue-200/80",
    badge: "bg-blue-100 text-blue-700",
    hint: "Nurse and Admin access",
    icon: "ST",
  },
  {
    label: "Student",
    path: "/login/student",
    button: "bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400",
    ring: "ring-blue-200/70",
    border: "border-blue-200/80",
    badge: "bg-blue-100 text-blue-700",
    hint: "Student health records",
    icon: "S",
  },
];

export default function Login() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#eef4ff";
      ctx.fillRect(0, 0, w, h);

      const blue = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 1.05);
      blue.addColorStop(0, "rgba(37,99,235,0.55)");
      blue.addColorStop(0.45, "rgba(59,130,246,0.18)");
      blue.addColorStop(1, "transparent");
      ctx.fillStyle = blue;
      ctx.fillRect(0, 0, w, h);

      const orange = ctx.createRadialGradient(w, 0, 0, w, 0, w * 1.05);
      orange.addColorStop(0, "rgba(249,115,22,0.46)");
      orange.addColorStop(0.45, "rgba(251,146,60,0.16)");
      orange.addColorStop(1, "transparent");
      ctx.fillStyle = orange;
      ctx.fillRect(0, 0, w, h);

      const white = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.75);
      white.addColorStop(0, "rgba(255,255,255,0.95)");
      white.addColorStop(0.35, "rgba(255,255,255,0.62)");
      white.addColorStop(0.7, "rgba(255,255,255,0.14)");
      white.addColorStop(1, "transparent");
      ctx.fillStyle = white;
      ctx.fillRect(0, 0, w, h);

      const glowBottom = ctx.createRadialGradient(w / 2, h * 1.05, 0, w / 2, h * 1.05, w * 0.8);
      glowBottom.addColorStop(0, "rgba(59,130,246,0.18)");
      glowBottom.addColorStop(1, "transparent");
      ctx.fillStyle = glowBottom;
      ctx.fillRect(0, 0, w, h);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-7rem)] overflow-x-hidden bg-[#eef4ff] px-4 py-10 md:py-16 flex flex-col justify-center items-center">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

        <div className="pointer-events-none absolute inset-0 z-10 flex overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="relative flex-1 backdrop-blur-[9px] saturate-[145%] bg-[linear-gradient(to_right,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.22))] before:content-[''] before:absolute before:top-0 before:right-0 before:w-[1px] before:h-[200vh] before:-translate-y-1/4 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.86),rgba(255,255,255,0.3),rgba(255,255,255,0.86))] before:opacity-45 after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-[200vh] after:-translate-y-1/4 after:bg-blue-900/20 after:opacity-20"
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-300/24 blur-3xl" />
          <div className="absolute right-[-6rem] top-16 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-white/35 blur-3xl" />
        </div>

        <div className="relative z-20 max-w-5xl w-full mx-auto">
          <div className="rounded-3xl border border-white/90 bg-white/78 backdrop-blur-xl shadow-[0_24px_55px_rgba(30,64,175,0.2)] p-7 md:p-9 mb-8 text-center ring-1 ring-white/40">
            <span className="inline-block text-xs tracking-[0.24em] uppercase text-blue-700 font-semibold">
              Chathracare Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mt-2">
              Choose your account
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Secure access for staff and students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {roles.map((role) => (
              <div
                key={role.label}
                className={`group relative overflow-hidden rounded-3xl border ${role.border} bg-white/80 p-6 md:p-7 ring-1 ${role.ring} shadow-[0_16px_34px_rgba(15,23,42,0.12)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(30,64,175,0.22)]`}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-100/60 to-transparent" />
                <div className="pointer-events-none absolute -left-12 bottom-[-3.5rem] h-28 w-28 rounded-full bg-gradient-to-br from-orange-100/45 to-transparent" />
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-blue-900 text-2xl font-bold">{role.label}</span>
                    <p className="text-sm text-slate-600 mt-1">{role.hint}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${role.badge} flex items-center justify-center font-bold`}>
                    {role.icon}
                  </div>
                </div>
                <Link
                  to={role.path}
                  className={`mt-8 inline-block w-full text-center text-white py-3 rounded-xl font-semibold tracking-wide transition ${role.button}`}
                >
                  Login
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
