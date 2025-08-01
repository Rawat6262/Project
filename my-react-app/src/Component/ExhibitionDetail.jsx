import axios from 'axios';
import React, { useState } from 'react';

const PopupForms = ({ Close }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyNature, setCompanyNature] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/company', {
        company_name: companyName,
        company_address: companyAddress,
        company_nature: companyNature,
        company_email: companyEmail,
        pincode,
        company_phone_number: companyPhoneNumber,
      });
      if (response) {
        alert(response.data);
        Close();
      } else {
        alert('Failed to add');
      }
    } catch (e) {
      console.error(e);
      alert('Error adding company');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[3px]">
      <div className="bg-white/90 backdrop-blur-md border-2 border-blue-400 rounded-3xl shadow-2xl shadow-blue-200 max-w-lg w-full p-10 transition-all duration-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight drop-shadow">
            Add Company
          </h2>
          <button
            className="text-gray-500 hover:text-red-500 text-4xl font-bold px-2 py-1 rounded-xl transition-colors"
            onClick={Close}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-lg font-medium text-blue-800 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
                className="block w-full rounded-xl border-2 border-blue-300 bg-white/80 py-2 px-4 text-gray-900 text-base font-semibold shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>
            <div className="w-full">
              <label className="block text-lg font-medium text-blue-800 mb-1">Company Address</label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Enter company address"
                required
                className="block w-full rounded-xl border-2 border-blue-300 bg-white/80 py-2 px-4 text-gray-900 text-base font-semibold shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>
          </div>
          {/* Second Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-lg font-medium text-blue-800 mb-1">Company Nature</label>
              <input
                type="text"
                value={companyNature}
                onChange={(e) => setCompanyNature(e.target.value)}
                placeholder="Enter company nature"
                required
                className="block w-full rounded-xl border-2 border-blue-300 bg-white/80 py-2 px-4 text-gray-900 text-base font-semibold shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>
            <div className="w-full">
              <label className="block text-lg font-medium text-blue-800 mb-1">Company Email</label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="Enter company email"
                required
                className="block w-full rounded-xl border-2 border-blue-300 bg-white/80 py-2 px-4 text-gray-900 text-base font-semibold shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>
          </div>
          {/* Third Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-lg font-medium text-blue-800 mb-1">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                required
                className="block w-full rounded-xl border-2 border-blue-300 bg-white/80 py-2 px-4 text-gray-900 text-base font-semibold shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>
            <div className="w-full">
              <label className="block text-lg font-medium text-blue-800 mb-1">Company Phone Number</label>
              <input
                type="text"
                value={companyPhoneNumber}
                onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                required
                className="block w-full rounded-xl border-2 border-blue-300 bg-white/80 py-2 px-4 text-gray-900 text-base font-semibold shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={Close}
              className="px-6 py-2 text-base font-bold rounded-full bg-gray-300 text-gray-800 shadow hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 text-base font-bold rounded-full bg-gradient-to-r from-blue-800 to-blue-500 shadow hover:from-blue-900 hover:to-blue-700 text-white transition-all border-2 border-blue-700"
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
