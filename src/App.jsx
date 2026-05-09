import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layout/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { ManagementProvider } from "./context/ManagementContext";

export default function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideFooter =
    ["/login", "/login/staff", "/login/student", "/signup"].includes(location.pathname) ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/nurse") ||
    location.pathname.startsWith("/student");

  return (
    <ManagementProvider>
      <AppRoutes />
      {!hideFooter && <Footer />}
    </ManagementProvider>
  );
}
