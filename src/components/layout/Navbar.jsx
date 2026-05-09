import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function Navbar({ matchHero = false }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === "/";

  const navItems = useMemo(
    () => [
      { key: "home", label: "Home", to: "/" },
      { key: "about", label: "About", to: "/about" },
      { key: "services", label: "Services", to: "/services" },
      { key: "contact", label: "Contact", to: "/contact" },
      { key: "login", label: "Login", to: "/login" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeNav = (() => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/about")) return "about";
    if (location.pathname.startsWith("/services")) return "services";
    if (location.pathname.startsWith("/contact")) return "contact";
    if (location.pathname.startsWith("/login")) return "login";
    return "";
  })();

  const navTextClass = !isHomePage
    ? "text-white hover:text-orange-500"
    : isScrolled
      ? "text-black hover:text-orange-500"
      : "text-white hover:text-orange-400";

  const navClass = (key) =>
    activeNav === key
      ? `border rounded-full px-4 py-2 backdrop-blur-sm ${!isHomePage ? "border-white/70 bg-white/10" : "border-white bg-white/10"
      } ${navTextClass}`
      : `px-4 py-2 rounded-full ${navTextClass}`;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="px-4 md:px-6 py-3">
          <div
            className={`max-w-7xl mx-auto rounded-2xl backdrop-blur-2xl shadow-[0_10px_30px_rgba(8,23,58,0.35)] ring-1 ${!isHomePage
                ? "border border-white/45 bg-[#153f8f]/90 ring-white/20"
                : "border border-white/25 bg-[#7da0df]/28 ring-white/10"
              }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-3 gap-4 md:gap-3">
              <h1
                className={`text-xl font-bold tracking-wide text-center md:text-left ${!isHomePage ? "text-white" : isScrolled ? "text-black" : "text-white"
                  }`}
              >
                Chathracare
              </h1>

              <nav className="flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2 gap-y-2 text-[13px] sm:text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.to}
                    className={navClass(item.key)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {matchHero ? (
        <div className="h-24 md:h-28 bg-[#153f8f]" aria-hidden />
      ) : (
        <div
          className={`h-24 md:h-28 ${!isHomePage
              ? "bg-[#153f8f]"
              : "bg-gradient-to-r from-[#dbe7f3] via-[#d8e9f4] to-[#c7edf1]"
            }`}
          aria-hidden
        />
      )}
    </>
  );
}
