import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Trash2, MessageSquareQuote, Plus, Loader2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    video: null
  });

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (testi = null) => {
    if (testi) {
      setFormData({
        name: testi.name || "",
        role: testi.role || "",
        message: testi.message || "",
        video: null
      });
      setEditingId(testi._id);
    } else {
      setFormData({ name: "", role: "", message: "", video: null });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("message", formData.message);
    if (formData.video) {
        data.append("video", formData.video);
    }
    
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, data, {
           headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Testimonial Updated!");
      } else {
        await api.post("/testimonials", data, {
           headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Testimonial Added!");
      }
      setIsModalOpen(false);
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      toast.error(editingId ? "Failed to update testimonial" : "Failed to add testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        await api.delete(`/testimonials/${id}`);
        toast.success("Testimonial deleted");
        fetchTestimonials();
      } catch (err) {
        toast.error("Deletion failed");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500" style={{ fontFamily: "Times New Roman" }}>
      <div className="flex justify-between items-center border-b-2 border-sju-navy pb-3">
        <div>
          <h1 className="text-[28px] text-sju-navy font-bold tracking-tight" style={{ fontFamily: "Georgia" }}>Testimonials</h1>
          <p className="text-sju-gray mt-1 text-[15px]">Manage student and alumni reviews.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-sju-navy hover:bg-[#132056] text-white px-5 py-2.5 rounded-[6px] font-bold transition-all shadow-elegant hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span style={{ fontSize: "15px" }}>Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center">
             <div className="w-12 h-12 border-4 border-sju-navy/20 border-t-sju-navy rounded-full animate-spin"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[10px] border border-dashed border-sju-border shadow-sm">
             <MessageSquareQuote size={40} className="text-sju-gray/40 mb-3" />
             <p className="text-lg font-bold text-sju-navy mb-1" style={{ fontFamily: "Georgia" }}>No Testimonials yet.</p>
             <p className="text-[15px] text-sju-gray">Click 'Add Review' to create one for the main website.</p>
          </div>
        ) : (
          testimonials.map((testi) => (
            <div key={testi._id} className="bg-white p-6 rounded-[10px] shadow-sm border border-sju-border hover:shadow-elegant transition-all duration-300 relative group flex flex-col">
               <MessageSquareQuote size={24} className="text-sju-navy/20 absolute top-6 right-6" />
               <div className="flex-1 break-words pb-6">
                 {testi.message ? (
                   <p className="text-sju-gray italic text-[15px] leading-relaxed">"{testi.message}"</p>
                 ) : (
                   <p className="text-sju-gray/60 italic text-[14px]">No text provided.</p>
                 )}
                 {testi.videoUrl && (
                   <div className="mt-4 flex items-center gap-2 text-[13px] font-bold text-sju-navy bg-[#F9F9FF] px-3 py-1.5 rounded-[6px] w-fit border border-sju-navy/10">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     Video Attached
                   </div>
                 )}
               </div>
               <div className="flex justify-between items-end border-t border-sju-border pt-4 mt-auto">
                  <div>
                    <h4 className="font-bold text-sju-navy text-[16px]">{testi.name}</h4>
                    <span className="text-sju-gray/80 text-[13px] uppercase tracking-wide">{testi.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(testi)} className="p-2 text-sju-gray hover:text-sju-navy hover:bg-sju-light rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(testi._id)} className="p-2 text-sju-gray hover:text-red-700 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>

       {/* SJU Modal */}
       <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sju-navy/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-lg bg-white rounded-[10px] shadow-2xl border border-sju-border overflow-hidden"
              style={{ fontFamily: "Times New Roman" }}
            >
               <div className="px-8 py-5 border-b border-sju-border bg-sju-light">
                <h2 className="text-[22px] font-bold text-sju-navy" style={{ fontFamily: "Georgia" }}>
                  {editingId ? "Edit Testimonial" : "Add Manual Testimonial"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-sju-gray">Student/Alumni Name</label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy outline-none text-[15px] text-sju-navy"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-sju-gray">Role / Batch (e.g. BBA 2024)</label>
                  <input
                    type="text" name="role" required value={formData.role} onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy outline-none text-[15px] text-sju-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-sju-gray">Video Upload (Optional)</label>
                  <input
                    type="file" name="video" accept="video/mp4,video/webm" onChange={handleChange}
                    className="w-full text-[14px] text-sju-gray file:mr-4 file:py-2 file:px-4 file:rounded-[6px] file:border-0 file:text-[13px] file:font-semibold file:bg-sju-navy file:text-white hover:file:bg-[#132056] cursor-pointer"
                  />
                  <p className="text-[12px] text-sju-gray/60 mt-1">Accepted formats: .mp4, .webm</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-sju-gray">Written Quote (Optional)</label>
                  <textarea
                    name="message" rows={4} value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy outline-none resize-none text-[15px] text-sju-navy leading-[1.6]"
                    placeholder="Provide a written quote if no video is available."
                  ></textarea>
                </div>

                <div className="pt-5 flex items-center justify-end gap-3 border-t border-sju-border">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 font-bold text-sju-gray hover:bg-sju-light rounded-[6px]">Cancel</button>
                  <button type="submit" className="px-5 py-2 font-bold bg-sju-navy text-white rounded-[6px] shadow-sm">Save Testimonial</button>
                </div>
              </form>
            </motion.div>
          </div>
         )}
        </AnimatePresence>
    </div>
  );
};

export default TestimonialsPage;
