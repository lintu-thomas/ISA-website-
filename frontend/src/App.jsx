import React from "react";
import { Routes, Route } from "react-router-dom";

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

export default function App() {
  return (
    <>
      <Header />
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
      </Routes>
      <Footer />
    </>
  );
}
