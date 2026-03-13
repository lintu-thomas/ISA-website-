import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Plus, Edit2, Trash2, Calendar, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const WebsiteEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null
  });

  const fetchEvents = async () => {
    try {
      const res = await api.get("/website-events");
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to load generic events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event = null) => {
    if (event) {
      setCurrentEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        image: null
      });
    } else {
      setCurrentEvent(null);
      setFormData({ title: "", description: "", image: null });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }
    
    try {
      if (currentEvent) {
        // Update
        await api.put(`/website-events/${currentEvent._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Event updated successfully");
      } else {
        // Create
        await api.post("/website-events", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Event created successfully");
      }
      handleCloseModal();
      fetchEvents();
    } catch (err) {
      console.error("Submit Event Error:", err.response?.data || err);
      toast.error("Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      await api.delete(`/website-events/${eventToDelete}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setEventToDelete(null);
    }
  };

  return (
    <div className="space-y-6" style={{ fontFamily: "Times New Roman" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-sju-navy pb-4">
        <div>
          <h1 className="text-[28px] text-sju-navy tracking-tight" style={{ fontFamily: "Georgia" }}>Events</h1>
          <p className="text-sju-gray mt-1 text-[15px]">Manage visually rich flagship events for the main website.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-sju-navy hover:bg-[#132056] text-white px-5 py-2.5 rounded-[6px] font-bold transition-all shadow-elegant hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span style={{ fontSize: "15px" }}>Create Event</span>
        </button>
      </div>

      <div className="bg-white rounded-[10px] shadow-elegant border border-sju-border overflow-hidden">
        <div className="p-4 border-b border-sju-border flex items-center justify-end bg-sju-light leading-none">
          <div className="flex items-center gap-2 text-[14px] font-bold text-sju-navy px-4 py-2 bg-white border border-sju-border rounded-[6px] shadow-sm tracking-wide">
            <Calendar size={16} className="text-sju-gray opacity-80" />
            Total Events: {events.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sju-light border-b border-sju-border text-sju-gray text-[14px]">
                <th className="p-5 font-bold">Event Banner</th>
                <th className="p-5 font-bold min-w-[300px]">Description</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-sju-gray">
                    <div className="inline-block animate-spin w-8 h-8 border-4 border-sju-navy/20 border-t-sju-navy rounded-full mb-4"></div>
                    <p className="font-bold">Loading events...</p>
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-16 text-center text-sju-gray">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-sju-light rounded-xl flex items-center justify-center mb-4 transform rotate-3 border border-sju-border">
                        <Calendar className="w-8 h-8 text-sju-gray/60 -rotate-3" />
                      </div>
                      <p className="font-bold text-sju-navy text-lg mb-1" style={{ fontFamily: "Georgia" }}>No events found</p>
                      <p className="text-sju-gray mt-1 text-[15px]">Click "Create Event" to upload your first visual event.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id} className="border-b border-sju-border/50 hover:bg-[#FAF8F3] transition-colors group">
                    <td className="p-5 font-bold text-sju-navy text-[16px]">
                      <div className="flex items-center gap-3">
                         {event.imageUrl ? (
                            <img src={`http://localhost:5000${event.imageUrl}`} alt={event.title} className="w-10 h-10 rounded-[4px] object-cover border border-sju-border shadow-sm" onError={(e) => { e.target.src = 'https://via.placeholder.com/40x40?text=Event'; }} />
                         ) : (
                           <div className="w-10 h-10 rounded-[4px] bg-[#E0E0FF] flex items-center justify-center border border-sju-border shadow-sm text-sju-navy font-bold text-[12px]">No Img</div>
                        )}
                        <span>{event.title}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sju-gray text-[15px] leading-relaxed">
                      <div className="line-clamp-2 max-w-[300px]">{event.description}</div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(event)}
                          className="p-2 text-sju-gray hover:text-sju-navy hover:bg-sju-navy/10 rounded-[6px] transition-all duration-200"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setEventToDelete(event._id)}
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

      {/* SJU Modal */}
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
                  {currentEvent ? "Edit Event" : "Create New Event"}
                </h2>
              </div>
              
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <form id="event-form" onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-sju-gray">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none text-[15px] text-sju-navy"
                      placeholder="Enter event name"
                      style={{ fontFamily: "Times New Roman" }}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-sju-gray">Event Banner Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-[14px] text-sju-gray file:mr-4 file:py-2.5 file:px-4 file:rounded-[6px] file:border-0 file:text-[13px] file:font-semibold file:bg-sju-navy file:text-white hover:file:bg-[#132056] cursor-pointer"
                      style={{ fontFamily: "Times New Roman" }}
                    />
                    <p className="text-[12px] text-sju-gray/60 mt-1">Required for the main student website slider.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-sju-gray">Description</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9FF] border border-sju-border rounded-[6px] focus:ring-2 focus:ring-sju-navy/20 focus:border-sju-navy transition-all outline-none resize-none text-[15px] text-sju-navy leading-[1.6]"
                      placeholder="Detailed description about the event..."
                      style={{ fontFamily: "Times New Roman" }}
                    ></textarea>
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
                  form="event-form"
                  className="px-5 py-2.5 font-bold bg-sju-navy hover:bg-[#132056] text-white rounded-[6px] shadow-sm hover:shadow transition-all text-[15px]"
                >
                  {currentEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {eventToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sju-navy/40 backdrop-blur-sm"
              onClick={() => setEventToDelete(null)}
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
                <h2 className="text-[20px] font-bold text-sju-navy mb-2" style={{ fontFamily: "Georgia" }}>Delete Event</h2>
                <p className="text-[15px] text-sju-gray px-4">
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
              </div>

              <div className="p-6 flex items-center justify-center gap-3">
                <button 
                  onClick={() => setEventToDelete(null)} 
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

export default WebsiteEventsPage;
