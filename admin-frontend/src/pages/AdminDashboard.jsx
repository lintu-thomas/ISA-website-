import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sju-beige">
        <div className="w-12 h-12 border-4 border-sju-navy/20 border-t-sju-navy rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-sju-beige min-h-screen text-sju-gray font-sans selection:bg-sju-navy/20" style={{ fontFamily: "Times New Roman" }}>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto p-10 max-w-7xl animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;