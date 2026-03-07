import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Trash2, CalendarHeart, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await api.delete(`/appointments/${id}`);
        toast.success("Appointment removed");
        fetchAppointments();
      } catch (err) {
        toast.error("Deletion failed");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500" style={{ fontFamily: "Times New Roman" }}>
      <div className="flex justify-between items-center border-b-2 border-sju-navy pb-3">
        <div>
          <h1 className="text-[28px] text-sju-navy font-bold tracking-tight" style={{ fontFamily: "Georgia" }}>Appointments</h1>
          <p className="text-sju-gray mt-1 text-[15px]">Review student and public bookings.</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow-elegant border border-sju-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sju-light border-b border-sju-border text-sju-gray text-[14px]">
                <th className="p-5 font-bold">Booking Date</th>
                <th className="p-5 font-bold">Student</th>
                <th className="p-5 font-bold">Issue / Purpose</th>
                <th className="p-5 font-bold">Additional Notes</th>
                <th className="p-5 font-bold text-center">Status</th>
                <th className="p-5 font-bold text-right">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-sju-gray">
                    <div className="inline-block animate-spin w-8 h-8 border-4 border-sju-navy/20 border-t-sju-navy rounded-full mb-4"></div>
                    <p className="font-bold">Loading appointments...</p>
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-16 text-center text-sju-gray">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-sju-light rounded-xl flex items-center justify-center mb-4 transform rotate-3 border border-sju-border">
                        <CalendarHeart className="w-8 h-8 text-sju-gray/60 -rotate-3" />
                      </div>
                      <p className="font-bold text-sju-navy text-lg mb-1" style={{ fontFamily: "Georgia" }}>No Appointments</p>
                      <p className="text-[15px]">There are currently no scheduled appointments.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => {
                  const isPast = new Date(appt.date) < new Date();
                  return (
                    <tr key={appt._id} className={`border-b border-sju-border/50 hover:bg-[#FAF8F3] transition-colors group ${isPast ? 'opacity-75' : ''}`}>
                      <td className="p-5 font-bold text-sju-navy text-[15px]">
                         {new Date(appt.date).toLocaleString(undefined, {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                         })}
                      </td>
                      <td className="p-5 text-[14px]">
                        <div className="font-bold text-sju-navy">{appt.studentName || "Anonymous"}</div>
                        {appt.studentRegNo && <div className="text-sju-gray text-[12px]">{appt.studentRegNo}</div>}
                      </td>
                      <td className="p-5 text-sju-gray text-[15px] font-bold">
                        {appt.issue}
                      </td>
                      <td className="p-5 text-sju-gray text-[14px] leading-relaxed max-w-[300px] truncate">
                        {appt.notes || "—"}
                      </td>
                      <td className="p-5 text-center">
                         <span className={`px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-[4px] ${isPast ? 'bg-sju-gray/10 text-sju-gray' : 'bg-[#e5f0ea] text-[#1e6141]'}`}>
                           {isPast ? "Archived" : "Upcoming"}
                         </span>
                      </td>
                      <td className="p-5 text-right">
                         <button onClick={() => handleDelete(appt._id)} className="p-2 text-sju-gray hover:text-red-700 hover:bg-red-50 rounded-[6px] transition-all duration-200" title="Delete Booking">
                           <Trash2 size={16} />
                         </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
