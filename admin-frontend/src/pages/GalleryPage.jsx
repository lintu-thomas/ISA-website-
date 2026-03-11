import React, { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import { Upload, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const backendUrl = "https://isa-backend-production.up.railway.app";

  const fetchImages = async () => {
    try {
      const res = await api.get("/gallery");
      setImages(res.data);
    } catch (err) {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", file.name);

    try {
      await api.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Image uploaded successfully");
      fetchImages();
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;
    try {
      await api.delete(`/gallery/${imageToDelete}`);
      toast.success("Image removed");
      fetchImages();
    } catch (err) {
      toast.error("Failed to remove image");
    } finally {
      setImageToDelete(null);
    }
  };

  return (
    <div className="space-y-8" style={{ fontFamily: "Times New Roman" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-sju-navy pb-4">
        <div>
          <h1 className="text-[28px] text-sju-navy tracking-tight" style={{ fontFamily: "Georgia" }}>Gallery Preview</h1>
          <p className="text-sju-gray mt-1 text-[15px]">Curate images displayed on the main website.</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-3 bg-sju-navy hover:bg-[#132056] text-white px-6 py-2.5 rounded-[6px] font-bold transition-all shadow-elegant hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        >
          {uploading ? (
            <Loader2 size={18} className="animate-spin text-white/70" />
          ) : (
            <Upload size={18} className="text-white" />
          )}
          <span style={{ fontSize: "15px" }}>{uploading ? "Uploading..." : "Upload Image"}</span>
        </button>
      </div>

      <div className="bg-sju-light rounded-[10px] shadow-elegant border border-sju-border p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-sju-navy/20 border-t-sju-navy rounded-full animate-spin"></div>
            <p className="text-sju-gray mt-6 text-[16px]">Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-sju-gray/60 bg-white rounded-[10px] border border-dashed border-sju-border shadow-sm">
            <div className="w-16 h-16 bg-[#F9F9FF] shadow-sm border border-sju-border rounded-xl flex items-center justify-center mb-6 transform rotate-3">
              <ImageIcon size={32} className="text-sju-gray/40 -rotate-3" />
            </div>
            <h3 className="text-xl font-bold text-sju-navy mb-2" style={{ fontFamily: "Georgia" }}>Pristine Canvas</h3>
            <p className="text-sju-gray text-[15px]">Upload your first image to curate this space.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image._id}
                className="group relative aspect-square rounded-[8px] overflow-hidden bg-white border border-sju-border shadow-sm transition-all duration-300 hover:shadow-elegant"
              >
                <img
                  src={`${backendUrl}${image.imageUrl}`}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sju-navy/90 via-sju-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-[14px] font-bold truncate max-w-[80%] drop-shadow-md">
                      {image.title || "Untitled Image"}
                    </p>
                    <button
                      onClick={() => setImageToDelete(image._id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-[6px] transition-all shadow-lg transform hover:scale-110"
                      title="Delete Image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Delete Modal */}
      <AnimatePresence>
        {imageToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sju-navy/40 backdrop-blur-sm"
              onClick={() => setImageToDelete(null)}
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
                <h2 className="text-[20px] font-bold text-sju-navy mb-2" style={{ fontFamily: "Georgia" }}>Delete Image</h2>
                <p className="text-[15px] text-sju-gray px-4">
                  Are you sure you want to delete this image from the gallery?
                </p>
              </div>

              <div className="p-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setImageToDelete(null)}
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

export default GalleryPage;
