import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Plus, Edit2, Trash2, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    linkText: "",
    buttonBgColor: "#413543"
  });

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        title: service.title,
        description: service.description,
        link: service.link,
        linkText: service.linkText,
        buttonBgColor: service.buttonBgColor || "#413543"
      });
    } else {
      setCurrentService(null);
      setFormData({ title: "", description: "", link: "", linkText: "", buttonBgColor: "#413543" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentService) {
        // Update
        await api.put(`/services/${currentService._id}`, formData);
        toast.success("Service updated successfully");
      } else {
        // Create
        await api.post("/services", formData);
        toast.success("Service created successfully");
      }
      handleCloseModal();
      fetchServices();
    } catch (err) {
      console.error("Submit Service Error:", err.response?.data || err);
      toast.error("Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await api.delete(`/services/${serviceToDelete}`);
      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete service");
    } finally {
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-6" style={{ fontFamily: "Times New Roman" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-sju-navy pb-4">
        <div>
          <h1 className="text-[28px] text-sju-navy tracking-tight" style={{ fontFamily: "Georgia" }}>Services</h1>
          <p className="text-sju-gray mt-1 text-[15px]">Manage official services for international students.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-sju-navy hover:bg-[#132056] text-white px-5 py-2.5 rounded-[6px] font-bold transition-all shadow-elegant hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span style={{ fontSize: "15px" }}>Add Service</span>
        </button>
      </div>

      <div className="bg-white rounded-[10px] shadow-elegant border border-sju-border overflow-hidden">
        <div className="p-4 border-b border-sju-border flex items-center justify-end bg-sju-light leading-none">
          <div className="flex items-center gap-2 text-[14px] font-bold text-sju-navy px-4 py-2 bg-white border border-sju-border rounded-[6px] shadow-sm tracking-wide">
            <Briefcase size={16} className="text-sju-gray opacity-80" />
            Total Services: {services.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sju-light border-b border-sju-border text-sju-gray text-[14px]">
                <th className="p-5 font-bold">Service Title</th>
                <th className="p-5 font-bold">Link Text</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-sju-gray">
                    <div className="inline-block animate-spin w-8 h-8 border-4 border-sju-navy/20 border-t-sju-navy rounded-full mb-4"></div>
                    <p className="font-bold">Loading services...</p>
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-16 text-center text-sju-gray">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-sju-light rounded-xl flex items-center justify-center mb-4 transform rotate-3 border border-sju-border">
                        <Briefcase className="w-8 h-8 text-sju-gray/60 -rotate-3" />
                      </div>
                      <p className="font-bold text-sju-navy text-lg mb-1" style={{ fontFamily: "Georgia" }}>No services found</p>
                      <p className="text-[15px]">Click "Add Service" to create your first offering.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="border-b border-sju-border/50 hover:bg-[#FAF8F3] transition-colors group">
                    <td className="p-5 text-[15px] font-bold text-sju-navy">
                      {service.title}
                    </td>
                    <td className="p-5 text-[14px] text-sju-gray font-medium">
                      {service.linkText}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(service)}
                          className="p-2 text-sju-gray hover:text-sju-navy hover:bg-sju-navy/10 rounded-[6px] transition-all duration-200"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setServiceToDelete(service._id)}
                          className="p-2 text-sju-gray hover:text-red-700 hover:bg-red-50 rounded-[6px] transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sju-navy/50 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-2xl mx-4 bg-white rounded-[10px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              style={{ fontFamily: "Times New Roman" }}
            >
              <div className="px-8 py-5 border-b border-sju-border bg-sju-light flex-shrink-0">
                <h2 className="text-[22px] font-bold text-sju-navy" style={{ fontFamily: "Georgia" }}>
                  {currentService ? "Edit Service" : "Add New Service"}
                </h2>
              </div>
              
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <form id="service-form" onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-sju-gray">Service Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none text-[15px] text-sju-navy"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-sju-gray">Description</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none resize-none text-[15px] text-sju-navy"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-sju-gray">Link Text</label>
                      <input
                        type="text"
                        name="linkText"
                        required
                        value={formData.linkText}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none text-[15px] text-sju-navy"
                        placeholder="e.g. Learn More"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-sju-gray">Link URL (Internal or External)</label>
                      <input
                        type="text"
                        name="link"
                        required
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none text-[15px] text-sju-navy"
                        placeholder="e.g. /scholarships or https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-sju-gray">Button Background Color (Hex)</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="buttonBgColor"
                        value={formData.buttonBgColor}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none text-[15px] text-sju-navy"
                      />
                      <div 
                        className="w-10 h-10 rounded-[6px] border border-sju-border shadow-sm"
                        style={{ backgroundColor: formData.buttonBgColor }}
                      ></div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-8 py-5 flex items-center justify-end gap-3 border-t border-sju-border bg-[#F9F9FF] flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 font-bold text-sju-gray hover:text-sju-navy hover:bg-white rounded-[6px] transition-all text-[15px] border border-transparent hover:border-sju-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="service-form"
                  className="px-5 py-2.5 font-bold bg-sju-navy hover:bg-[#132056] text-white rounded-[6px] shadow-sm hover:shadow transition-all text-[15px]"
                >
                  {currentService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {serviceToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sju-navy/40 backdrop-blur-sm"
              onClick={() => setServiceToDelete(null)}
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
                  <Trash2 className="text-red-500" size={24} />
                </div>
                <h2 className="text-[20px] font-bold text-sju-navy mb-2" style={{ fontFamily: "Georgia" }}>Delete Service?</h2>
                <p className="text-[15px] text-sju-gray px-4">
                  This service will be removed from the main website.
                </p>
              </div>

              <div className="p-6 flex items-center justify-center gap-3">
                <button 
                  onClick={() => setServiceToDelete(null)} 
                  className="flex-1 px-4 py-2.5 font-bold text-sju-gray hover:bg-sju-light border border-sju-border rounded-[6px] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 px-4 py-2.5 font-bold bg-[#ffe0e0] text-red-700 hover:bg-red-600 hover:text-white rounded-[6px] transition-all shadow-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminServicesPage;
