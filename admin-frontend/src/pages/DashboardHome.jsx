import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Calendar, Image as ImageIcon, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    events: 0,
    gallery: 0,
    testimonials: 0,
    appointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, galleryRes, testimonialsRes, appointmentsRes] = await Promise.all([
          api.get("/events").catch(() => ({ data: [] })),
          api.get("/gallery").catch(() => ({ data: [] })),
          api.get("/testimonials").catch(() => ({ data: [] })),
          api.get("/appointments").catch(() => ({ data: [] }))
        ]);

        setStats({
          events: eventsRes.data.length || 0,
          gallery: galleryRes.data.length || 0,
          testimonials: testimonialsRes.data.length || 0,
          appointments: appointmentsRes.data.length || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Events",
      count: stats.events,
      icon: <Calendar className="w-8 h-8 text-sju-navy mb-4" />,
      link: "/events",
      color: "bg-[#F9F9FF]",
      borderColor: "border-[#E0E0FF]"
    },
    {
      title: "Gallery Items",
      count: stats.gallery,
      icon: <ImageIcon className="w-8 h-8 text-[#A82B33] mb-4" />,
      link: "/gallery",
      color: "bg-[#FFF9F9]",
      borderColor: "border-[#FFE0E0]"
    },
    {
      title: "Testimonials",
      count: stats.testimonials,
      icon: <MessageSquare className="w-8 h-8 text-[#2B7A78] mb-4" />,
      link: "/testimonials",
      color: "bg-[#F4FAFA]",
      borderColor: "border-[#DDF0F0]"
    },
    {
      title: "Appointments",
      count: stats.appointments,
      icon: <Clock className="w-8 h-8 text-[#D4AF37] mb-4" />,
      link: "/appointments",
      color: "bg-[#FFFCF4]",
      borderColor: "border-[#F9F0D0]"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in" style={{ fontFamily: "Times New Roman" }}>
      {/* Top Row: Welcome & Student Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-sju-light p-8 rounded-[10px] shadow-elegant-sm transform transition-all hover:-translate-y-1 hover:shadow-elegant border border-sju-border relative overflow-hidden flex flex-col justify-center min-h-[220px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sju-navy opacity-[0.03] rounded-bl-full pointer-events-none"></div>
          <h3 className="text-sju-gray font-bold text-sm tracking-widest uppercase mb-2" style={{ fontFamily: "Georgia" }}>International Students Association</h3>
          <h2 className="text-3xl font-bold text-sju-navy mb-4" style={{ fontFamily: "Georgia" }}>Admin Portal</h2>
          <div className="w-12 h-[3px] bg-sju-navy rounded-full mb-5"></div>
          <p className="text-sju-gray text-[15px] leading-[1.9] max-w-xl">
            Welcome to the command center for the International Students Association. Here, you have full control over the ISA platform—schedule upcoming events, showcase vibrant memories in the gallery, manage student appointments, and highlight inspiring testimonials from the global community at St. Joseph's University.
          </p>
        </div>

        {/* International Students Card */}
        <div className="bg-gradient-to-br from-sju-navy to-[#132056] p-8 rounded-[10px] shadow-elegant transform transition-all hover:-translate-y-1 hover:shadow-xl text-white flex flex-col justify-center relative overflow-hidden min-h-[220px]">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-[#F0E9D2] font-bold text-[13px] tracking-widest uppercase mb-3" style={{ fontFamily: "Georgia" }}>Community</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-5xl font-bold" style={{ fontFamily: "Georgia" }}>348</h2>
            </div>
            <p className="text-white/90 text-[16px] font-medium mb-4">International Students</p>
            
            <div className="mt-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#A82B33] animate-pulse"></div>
                <p className="text-[14px] text-white/70 italic">Out of ~11,000+ total students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Dynamic Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link 
            key={index} 
            to={stat.link}
            className={`block ${stat.color} p-6 rounded-[10px] shadow-sm hover:shadow-md transform transition-all hover:-translate-y-1 border ${stat.borderColor} group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[220px]`}
          >
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
               <ArrowRight className="w-5 h-5 text-sju-gray/50" />
            </div>
            <div>{stat.icon}</div>
            <div className="mt-auto">
              <h3 className="text-sju-gray font-semibold text-[13px] mb-1 uppercase tracking-widest">{stat.title}</h3>
              {loading ? (
                <div className="h-10 w-16 bg-sju-border animate-pulse rounded"></div>
              ) : (
                <p className="text-[34px] font-bold text-sju-navy leading-none" style={{ fontFamily: "Georgia" }}>
                  {stat.count}
                </p>
              )}
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 ${stat.color === 'bg-[#FFF9F9]' ? 'bg-[#A82B33]' : stat.color === 'bg-[#F4FAFA]' ? 'bg-[#2B7A78]' : stat.color === 'bg-[#FFFCF4]' ? 'bg-[#D4AF37]' : 'bg-sju-navy'}`}></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
