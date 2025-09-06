import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

// --- Reusable Input Components ---
const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
    />
  </div>
);

const DateField = ({ label, value, onChange }) => (
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="date"
      value={value}
      onChange={onChange}
      required
      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
    />
  </div>
);

const FileField = ({ label, onChange, accept = "image/*" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      onChange={onChange}
      accept={accept}
      className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:text-sm file:font-semibold 
                file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      required
      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 resize-none"
    />
  </div>
);

// --- Main Popup Form ---
const PopupForm = ({ onClose }) => {
  // State variables
  const [exhibition_name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [venue, setVenue] = useState("");
  const [exhibition_address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [exhibition_image, setImage] = useState(null);
  const [layout, setLayout] = useState(null);
  const [about_exhibition, setAbout] = useState("");

  // Submit handler
  const handleExhibition = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("exhibition_name", exhibition_name);
      formData.append("category", category);
      formData.append("venue", venue);
      formData.append("exhibition_address", exhibition_address);
      formData.append("starting_date", startDate);
      formData.append("ending_date", endDate);
      formData.append("about_exhibition", about_exhibition);

      if (exhibition_image) formData.append("exhibition_image", exhibition_image);
      if (layout) formData.append("layout", layout);

      await axios.post("/api/exhibition", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Exhibition added successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the exhibition.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl border border-gray-100 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">Add Exhibition</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-red-500 text-2xl font-bold px-2 rounded transition"
          >
            &times;
          </button>
        </div>

        {/* Ordered Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleExhibition}
          encType="multipart/form-data"
        >
          {/* Left Side: Event & Venue */}
          <div className="space-y-4">
            <InputField
              label="Exhibition Name"
              value={exhibition_name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter exhibition name"
            />
            <InputField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
            <InputField
              label="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Enter venue"
            />
            <InputField
              label="Address"
              value={exhibition_address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          {/* Right Side: Schedule, Uploads & Description */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <DateField
                label="Starting Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <DateField
                label="Ending Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <FileField
              label="Exhibition Image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <FileField
              label="Layout"
              onChange={(e) => setLayout(e.target.files[0])}
            />
            <TextAreaField
              label="About Exhibition"
              value={about_exhibition}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write details about the exhibition..."
            />
          </div>

          {/* Footer */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
