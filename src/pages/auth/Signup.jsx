import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-white/70 bg-white/85 backdrop-blur shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 text-center">
          Sign Up
        </h1>
        <p className="text-sm text-blue-700 text-center mt-2">
          Create your account
        </p>

        <div className="space-y-4 mt-6">
          <input
            placeholder="Full Name"
            className="w-full border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            placeholder="Email"
            className="w-full border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            placeholder="Phone"
            className="w-full border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select className="w-full border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Select Role</option>
            <option>Admin</option>
            <option>Nurse</option>
            <option>Student</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition">
          Create Account
        </button>

        <p className="text-sm text-blue-700 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-bold hover:text-blue-900 underline underline-offset-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
