import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Testimonials from "./pages/Testimonials";
import QuickGuide from "./pages/QuickGuide";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Scholarships from "./pages/Scholarships";

// Administrator Redirect
const AdminRedirect = () => {
  useEffect(() => {
    window.location.href = "http://localhost:5174/login";
  }, []);
  return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Redirecting to Admin Portal...</div>;
};

export default function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/quick-guide" element={<QuickGuide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scholarships" element={<Scholarships />} />

        {/* ADMIN ROUTES (Redirect to separated admin-frontend project) */}
        <Route path="/admin-login" element={<AdminRedirect />} />
        <Route path="/admin" element={<AdminRedirect />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}
