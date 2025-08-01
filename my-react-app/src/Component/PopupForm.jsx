import axios from 'axios';
import React, { useState } from 'react';

const PopupForm = ({ onClose }) => {
  const [exhibition_name, setname] = useState('');
  const [Exhibition_address, setaddress] = useState('');
  const [category, setcategory] = useState('');

  const handleexhibition = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/Exhibition', {
        exhibition_name,
        Exhibition_address,
        category,
      });
      if (response) {
        alert(response.data);
        onClose();
      } else alert('Failed to add');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-gradient-to-br from-white via-slate-100 to-blue-100 rounded-2xl shadow-2xl p-8 w-full max-w-lg transition-all duration-200 border border-white/60">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Add Exhibition
          </h2>
          <button
            className="text-gray-400 hover:text-red-500 text-3xl leading-none font-bold px-2 py-1 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleexhibition}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
              Exhibition Name
            </label>
            <input
              type="text"
              name="exhibition_name"
              value={exhibition_name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter exhibition name"
              required
              className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-all duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
              Address
            </label>
            <input
              name="Exhibition_address"
              type="text"
              value={Exhibition_address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Enter address"
              required
              className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-all duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
              Category
            </label>
            <input
              name="category"
              type="text"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              placeholder="Enter category"
              required
              className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-all duration-150"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 hover:shadow-md transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-600 hover:shadow-lg transition-all"
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
