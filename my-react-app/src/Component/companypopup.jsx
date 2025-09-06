import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const PopupForms = ({ Close, data, onCompanyAdded }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyNature, setCompanyNature] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [brochureFile, setBrochureFile] = useState(null);
  const [createdBy, setBy] = useState(null);

  useEffect(() => {
    if (data) {
      setBy(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("company_name", companyName);
      formData.append("company_address", companyAddress);
      formData.append("company_nature", companyNature);
      formData.append("company_email", companyEmail);
      formData.append("pincode", pincode);
      formData.append("company_phone_number", companyPhoneNumber);
      formData.append("about_company", aboutCompany);
      formData.append("createdBy", createdBy);
      if (brochureFile) {
        formData.append("brochure", brochureFile);
      }
      await axios.post("/api/company", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(formData)

      toast.success("Company added successfully!");
      if (onCompanyAdded) onCompanyAdded();
      Close();
    } catch (e) {
      console.error(e);
      toast.error("Error adding company");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-blue-800">➕ Add Company</h2>
          <button
            onClick={Close}
            className="text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Address
              </label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Enter company address"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Nature
              </label>
              <input
                type="text"
                value={companyNature}
                onChange={(e) => setCompanyNature(e.target.value)}
                placeholder="E.g. IT, Manufacturing"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Email
              </label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="Enter company email"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 6) setPincode(val);
                }}
                placeholder="Enter 6-digit pincode"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Phone Number
              </label>
              <input
                type="text"
                value={companyPhoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 10) setCompanyPhoneNumber(val);
                }}
                placeholder="Enter 10-digit phone number"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Row 4 - About & Brochure side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                About Company
              </label>
              <textarea
                value={aboutCompany}
                onChange={(e) => setAboutCompany(e.target.value)}
                placeholder="Write a short description about the company..."
                rows="5"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 resize-none focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Brochure
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => setBrochureFile(e.target.files[0])}
                className="w-full text-gray-700 border border-gray-300 rounded-lg bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={Close}
              className="px-5 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForms;
