import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import sjuLogo from "../assets/logosju1.png"; // Import logo

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = await login(email, password);
    
    if (result.success) {
      toast.success("Welcome back, Admin!");
      navigate("/");
    } else {
      toast.error(result.message || "Invalid credentials");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sju-beige flex items-center justify-center p-4 relative overflow-hidden text-sju-gray" style={{ fontFamily: "Times New Roman" }}>
      
      <div className="w-full max-w-md relative z-10 bg-white p-10 py-12 rounded-[10px] shadow-elegant border border-sju-border">
        <div className="text-center mb-10 flex flex-col items-center">
          <img 
            src={sjuLogo} 
            alt="St Joseph's University" 
            className="w-24 h-24 object-contain mb-5"
          />
          <h1 className="text-[28px] font-bold text-sju-navy mb-1" style={{ fontFamily: "Georgia", lineHeight: "1.2" }}>
            St Joseph's University
          </h1>
          <p className="text-sju-navy/70 text-[14px] uppercase tracking-widest font-bold mb-4">ISA Admin Portal</p>
          <div className="w-12 h-1 bg-sju-navy/20 rounded-full mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-sju-gray ml-1">Email address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-sju-navy text-sju-gray/60">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy outline-none transition-all text-sju-navy placeholder-sju-gray/40"
                placeholder="admin@sju.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="off"
                style={{ fontSize: "16px" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-sju-gray ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-sju-navy text-sju-gray/60">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy outline-none transition-all text-sju-navy placeholder-sju-gray/40"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="new-password"
                style={{ fontSize: "16px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sju-gray/60 hover:text-sju-navy transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-4 px-4 bg-sju-navy hover:bg-[#132056] text-white text-[16px] font-bold tracking-wide rounded-[6px] shadow-elegant-sm hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
