/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  function login(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  async function logout() {
    // Notify backend to deactivate the session
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout API call failed (session may already be expired):", err.message);
    }
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

