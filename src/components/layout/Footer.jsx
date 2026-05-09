import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-xl font-bold text-white">
            Chathracare
          </h3>
          <p className="text-sm text-blue-200 mt-3 max-w-xs">
            A modern student health management platform for schools.
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-sm font-semibold text-white uppercase">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-blue-200">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-sm font-semibold text-white uppercase">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-blue-200 text-center sm:text-left">
            <li>Basic Health Metrics</li>
            <li>Dental Examination</li>
            <li>Trauma and Injuries</li>
            <li>Provisional Diagnosis</li>
            <li>Medical History</li>
            <li>Digital Health Card</li>
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-sm font-semibold text-white uppercase">
            Contact
          </h4>
          <div className="mt-4 space-y-2 text-sm text-blue-200">
            <div>Phone: +91 81235 68751</div>
            <div>Email: support@tarqen.com</div>
            <div>Hours: Mon - Fri, 8AM - 6PM</div>
          </div>
          <Link
            to="/contact"
            className="inline-flex justify-center mt-5 bg-orange-500 hover:bg-orange-400 transition text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-orange-500/20 w-fit"
          >
            Contact Team
          </Link>
        </div>
      </div>

      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-3 text-[0.8rem] text-blue-300">
          <span className="text-center md:text-left">© 2026 Chathracare. All rights reserved.</span>
          <span className="text-center md:text-right">Developed and Managed by TARQEN Solutions</span>
        </div>
      </div>
    </footer>
  );
}

