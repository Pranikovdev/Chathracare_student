import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] font-sans">
      {/* Dynamic Neon Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 text-center px-6">
        {/* Animated Neon 404 */}
        <div className="relative inline-block">
          <h1 className="text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            404
          </h1>
          <div className="absolute -inset-2 blur-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 opacity-20 -z-10 animate-pulse" />
        </div>

        <div className="mt-8">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            LOST IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CYBERSPACE?</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
            The coordinates you provided lead to a void. Let's get you back to the medical grid.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="group relative px-8 py-4 bg-white rounded-2xl font-black text-slate-900 overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative group-hover:text-white transition-colors">Return to Safety</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-2xl border-2 border-slate-800 text-white font-black hover:bg-slate-800/50 transition-all hover:border-blue-500/50"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Grid */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}
