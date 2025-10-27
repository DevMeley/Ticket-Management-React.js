// FILE: src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  login as loginService,
  signup as signupService,
  getSession,
  logout as logoutService,
} from "../../src/services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    // keep session fresh
    setSession(getSession());
  }, []);

  const login = async (email, password) => {
    const s = await loginService(email, password);
    setSession(s);
    return s;
  };
  const signup = async (payload) => {
    const s = await signupService(payload);
    setSession(s);
    return s;
  };
  const logout = () => {
    logoutService();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
