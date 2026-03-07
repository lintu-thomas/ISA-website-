import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import EventsPage from "./pages/EventsPage";
import WebsiteEventsPage from "./pages/WebsiteEventsPage";
import GalleryPage from "./pages/GalleryPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import TestimonialsPage from "./pages/TestimonialsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#F9F9FF', /* sju-light */
              color: '#1A2A6C', /* sju-navy */
              border: '1px solid #E0E0FF', /* sju-border */
              fontFamily: 'Times New Roman',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#1A2A6C',
                secondary: '#F9F9FF',
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          
          {/* Protected Routes Wrapper */}
          <Route path="/" element={<AdminDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="calendar" element={<EventsPage />} />
            <Route path="events" element={<WebsiteEventsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;