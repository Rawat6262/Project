import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerticalMenu from './Menu';
import PopupForm from './PopupForm';
import PopupForms from './ExhibitionDetail';

const Organiser = () => {
  const [bigdata, setBigdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [search, setSearch] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchExhibitions = async () => {
    try {
      const result = await axios.get('/api/Exhibition');
      setBigdata(result.data);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const filteredData = bigdata.filter((item) =>
    item.exhibition_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase()) ||
    item.addedBy?.toLowerCase().includes(search.toLowerCase()) ||
    item.exhibition_address?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-900 font-serif">
      <VerticalMenu />

      <div className="flex-1 w-full mt-8 flex flex-col border border-gray-300 md:ml-10 bg-white rounded-lg shadow-md overflow-y-auto">

        <div className="h-20 w-full flex flex-col sm:flex-row justify-between items-center px-8 border-b border-gray-300 bg-gray-100 rounded-t-lg">
          <div className="flex-1 font-bold text-3xl tracking-wide">SEM GROUP</div>
          <button className="h-10 w-full sm:w-64 border border-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-semibold transition-colors">
            View Organiser Details
          </button>
        </div>

        <div className="w-[95%] mx-auto mt-6 flex flex-wrap gap-6 justify-start">
          <div className="h-24 w-48 rounded-xl flex flex-col justify-center items-center bg-white border border-gray-300 shadow-sm">
            <div className="text-center text-lg font-medium text-gray-700">Exhibitions</div>
            <div className="text-4xl font-bold text-gray-900">{bigdata.length}</div>
          </div>
          <div className="h-24 w-48 rounded-xl flex flex-col justify-center items-center bg-white border border-gray-300 shadow-sm">
            <div className="text-center text-lg font-medium text-gray-700">Companies</div>
            <div className="text-4xl font-bold text-gray-900">1</div>
          </div>
        </div>

        <div className="flex-1 w-[95%] mx-auto mt-8 rounded-b-lg border border-t-0 border-gray-300 bg-white shadow-sm pb-8 mb-8">

          <div className="py-4 w-full flex flex-col lg:flex-row justify-between gap-4 px-4 text-center">
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Exhibition List</h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset page on search
                }}
                placeholder="Search Exhibitions"
                className="h-10 w-full sm:w-64 border border-gray-400 rounded-md text-gray-700 placeholder-gray-500 px-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button
                className="h-10 w-full sm:w-48 bg-gray-200 hover:bg-gray-300 rounded-md border border-gray-500 text-gray-700 font-semibold transition-colors"
                onClick={() => setShowModal(true)}
              >
                + Add Exhibition
              </button>
            </div>
          </div>

          {showModal && (
            <PopupForm
              onClose={() => {
                setShowModal(false);
                fetchExhibitions();
              }}
            />
          )}

          {/* Table */}
          <div className="flex-1 w-full overflow-x-auto text-left mt-6">
            <table className="w-full min-w-[700px] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-800 border-b border-gray-300">
                  <th className="px-4 py-3 border-r border-gray-300">#</th>
                  <th className="px-4 py-3 border-r border-gray-300">Exhibition BY</th>
                  <th className="px-4 py-3 border-r border-gray-300">Exhibition Name</th>
                  <th className="px-4 py-3 border-r border-gray-300">Address</th>
                  <th className="px-4 py-3 border-r border-gray-300">Category</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600 italic">
                      No data found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr key={item._id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 border border-gray-300">{startIndex + index + 1}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.addedBy}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.exhibition_name}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.exhibition_address}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.category}</td>
                      <td className="px-4 py-3 border border-gray-300">
                        <button
                          className="text-gray-700 border border-gray-500 rounded-md px-3 py-1 hover:bg-gray-200 transition-colors"
                          onClick={() => setShowPopup(item._id)}
                        >
                          Add Company
                        </button>
                        {showPopup === item._id && (
                          <PopupForms Close={() => setShowPopup(null)} />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center gap-4 items-center">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organiser;
