import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import HealthScreening from "../pages/public/services/HealthScreening";
import HealthRecords from "../pages/public/services/HealthRecords";
import SchoolInfirmaryManagement from "../pages/public/services/SchoolInfirmaryManagement";
import HealthEducation from "../pages/public/services/HealthEducation";
import MentalWellBeing from "../pages/public/services/MentalWellBeing";
import Contact from "../pages/public/Contact";
import RoleLogin from "../pages/auth/RoleLogin";
import NotFound from "../pages/public/NotFound";
import StudentDashboard from "../pages/student/Dashboard";
import StudentProfile from "../pages/student/Profile";
import StudentHealthCard from "../pages/student/HealthCard";
import StudentTimeline from "../pages/student/Timeline";
import StudentPrescriptions from "../pages/student/Prescriptions";
import StudentCurrentReport from "../pages/student/CurrentReport";
import StudentVaccinations from "../pages/student/Vaccinations";
import VerifyHealthCard from "../pages/public/VerifyHealthCard";

import PrivateRoute from "../auth/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/health-screening" element={<HealthScreening />} />
      <Route path="/services/health-education" element={<HealthEducation />} />
      <Route path="/services/health-records" element={<HealthRecords />} />
      <Route path="/services/mental-well-being" element={<MentalWellBeing />} />
      <Route path="/services/infirmary-management" element={<SchoolInfirmaryManagement />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<RoleLogin role="student" />} />
      {/* 404 Handler */}
      <Route path="*" element={<NotFound />} />

      <Route
        path="/student/dashboard"
        element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <PrivateRoute role="student">
            <StudentProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/health-card"
        element={
          <PrivateRoute role="student">
            <StudentHealthCard />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/current-report"
        element={
          <PrivateRoute role="student">
            <StudentCurrentReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/timeline"
        element={
          <PrivateRoute role="student">
            <StudentTimeline />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/prescriptions"
        element={
          <PrivateRoute role="student">
            <StudentPrescriptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/vaccinations"
        element={
          <PrivateRoute role="student">
            <StudentVaccinations />
          </PrivateRoute>
        }
      />

      <Route path="/verify-health-card" element={<VerifyHealthCard />} />
      <Route path="/medical-history/:qrData" element={<VerifyHealthCard />} />

    </Routes>
  );
}
