import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");
    
    if (token && expiry && new Date().getTime() < parseInt(expiry, 10)) {
      setIsAuthenticated(true);
    } else {
      // Clear expired token automatically
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiry");
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/admin/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        
        // Let's set expiration to 30 minutes (1800000 ms) from now
        const expiryTime = new Date().getTime() + 1800000;
        localStorage.setItem("token_expiry", expiryTime.toString());
        
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || "Login failed" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
