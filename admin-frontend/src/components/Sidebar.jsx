import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, Image as ImageIcon, LogOut, ChevronLeft, ChevronRight, CalendarHeart, MessageSquareQuote } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import sjuLogo from "../assets/logosju1.png"; // Import logo

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Calendar Management", path: "/calendar", icon: <Calendar size={20} /> },
    { name: "Events Management", path: "/events", icon: <ImageIcon size={20} /> },
    { name: "Appointments", path: "/appointments", icon: <CalendarHeart size={20} /> },
    { name: "Testimonials", path: "/testimonials", icon: <MessageSquareQuote size={20} /> },
  ];

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "88px" },
  };

  return (
    <>
      <motion.aside
        className="bg-sju-light text-sju-gray flex flex-col h-screen sticky top-0 relative z-20 border-r border-sju-border shadow-sm"
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ fontFamily: "Times New Roman" }}
      >
        <div className="p-6 flex flex-col items-center justify-center border-b border-sju-border min-h-[140px]">
          {/* Logo and branding */}
          <motion.div 
            className="flex flex-col items-center justify-center w-full"
            animate={{ scale: isCollapsed ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={sjuLogo} 
              alt="St Joseph's University Logo" 
              className={`transition-all duration-300 ${isCollapsed ? 'w-12 h-12 object-contain' : 'w-20 h-20 object-contain mb-3'}`}
            />
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center font-bold text-sju-navy flex flex-col leading-tight mt-1"
              >
                <span className="text-[13px] tracking-wide uppercase px-1" style={{ fontFamily: "Georgia", lineHeight: "1.2" }}>St. Joseph's University, Bengaluru</span>
                <span className="text-[11px] text-sju-gray/80 uppercase tracking-widest mt-1">Admin Portal</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-[14px] rounded-[6px] transition-all duration-300 group ${
                  isActive
                    ? "bg-sju-navy text-white shadow-elegant-sm"
                    : "text-sju-gray hover:bg-sju-navy/5 hover:text-sju-navy"
                } ${isCollapsed ? "justify-center" : ""}`
              }
            >
              <div className={`flex items-center ${isCollapsed ? "" : "mr-4"} transition-transform group-hover:scale-110`}>
                {item.icon}
              </div>
              {!isCollapsed && <span style={{ fontSize: "16px" }}>{item.name}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-6 px-3 py-1.5 bg-sju-light text-sju-navy text-sm rounded-[4px] border border-sju-border shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-sju-border space-y-3">
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`flex items-center p-[14px] text-sju-gray hover:bg-red-50 hover:text-red-700 rounded-[6px] transition-all duration-300 w-full group ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} className={`${isCollapsed ? "" : "mr-4"} transition-transform group-hover:-translate-x-1`} />
            {!isCollapsed && <span style={{ fontSize: "16px" }}>Logout</span>}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center p-[14px] w-full text-sju-gray hover:bg-sju-navy/5 hover:text-sju-navy rounded-[6px] transition-colors bg-transparent border border-transparent"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Modern Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sju-navy/40 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-sm bg-white rounded-[10px] shadow-2xl border border-sju-border overflow-hidden text-center"
              style={{ fontFamily: "Times New Roman" }}
            >
              <div className="p-6 pb-2 pt-8">
                <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
                  <LogOut className="text-red-500" size={24} />
                </div>
                <h2 className="text-[20px] font-bold text-sju-navy mb-2" style={{ fontFamily: "Georgia" }}>Confirm Logout</h2>
                <p className="text-[15px] text-sju-gray px-4">
                  Are you sure you want to log out of the Admin Dashboard?
                </p>
              </div>

              <div className="p-6 flex items-center justify-center gap-3">
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className="flex-1 px-4 py-2.5 font-bold text-sju-gray hover:bg-sju-light border border-sju-border rounded-[6px] transition-colors"
                >
                  No, Cancel
                </button>
                <button 
                  onClick={logout} 
                  className="flex-1 px-4 py-2.5 font-bold bg-[#E0E0FF] text-sju-navy hover:bg-sju-navy hover:text-white rounded-[6px] transition-all shadow-sm"
                >
                  Yes, Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
