import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VerticalMenu from "./Menu";

const Company = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Fetch Companies with credentials to send cookies
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/company", { withCredentials: true }); // <-- Added withCredentials
      console.log("Fetched companies:", data); // Debug log
      setData(data);
    } catch (error) {
      console.error("Error fetching companies:", error.response || error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Filtering
  const filteredData = data.filter(
    (item) =>
      item.exhibition?.toLowerCase().includes(search.toLowerCase()) ||
      item.company_email?.toLowerCase().includes(search.toLowerCase()) ||
      item.company_address?.toLowerCase().includes(search.toLowerCase()) ||
      item.pincode?.toString().includes(search)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handleNewOrg = () => {
    navigate("/api/Organiser");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFFFF] text-gray-900 font-serif">
      <VerticalMenu />

      <div className="flex-1 w-full mt-8 flex flex-col border border-gray-300 md:ml-10 bg-white rounded-lg shadow-md overflow-y-auto">
        {/* Header */}
        <div className="h-20 w-full flex flex-col sm:flex-row justify-between items-center px-8 border-b border-gray-300 bg-gray-100 rounded-t-lg">
          <div className="flex-1 font-bold text-3xl tracking-wide">SEM GROUP</div>
          <button className="h-10 w-full sm:w-64 border border-gray-700 bg-gray-400 hover:bg-gray-300 rounded-md text-gray-700 font-semibold transition-colors">
            View Organiser Details
          </button>
        </div>

        {/* Stat Cards */}
        <div className="w-[95%] mx-auto mt-6 flex flex-wrap gap-6 justify-start">
          <div className="h-24 w-48 rounded-xl flex flex-col justify-center items-center bg-white border border-gray-300 shadow-sm">
            <div className="text-center text-lg font-medium text-gray-700">Exhibitions</div>
            <div className="text-4xl font-bold text-gray-900">{[...new Set(data.map(i => i.exhibition))].length}</div>
          </div>
          <div className="h-24 w-48 rounded-xl flex flex-col justify-center items-center bg-white border border-gray-300 shadow-sm">
            <div className="text-center text-lg font-medium text-gray-700">Companies</div>
            <div className="text-4xl font-bold text-gray-900">{data.length}</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 w-[95%] mx-auto mt-8 rounded-b-lg border border-t-0 border-gray-300 bg-white shadow-sm pb-8 mb-8">
          {/* Toolbar */}
          <div className="py-4 w-full flex flex-col lg:flex-row justify-between gap-4 px-4 text-center">
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Company List</h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Companies"
                className="h-10 w-full sm:w-64 border border-gray-400 rounded-md text-gray-700 placeholder-gray-500 px-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button
                className="h-10 w-full sm:w-48 bg-gray-200 hover:bg-gray-300 rounded-md border border-gray-500 text-gray-700 font-semibold transition-colors"
                onClick={handleNewOrg}
              >
                + New Organiser
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 w-full overflow-x-auto text-left mt-6">
            <table className="w-full min-w-[700px] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-800 border-b border-gray-300">
                  <th className="px-4 py-3 border-r border-gray-300">#</th>
                  <th className="px-4 py-3 border-r border-gray-300">Exhibition</th>
                  <th className="px-4 py-3 border-r border-gray-300">Email</th>
                  <th className="px-4 py-3 border-r border-gray-300">Phone Number</th>
                  <th className="px-4 py-3 border-r border-gray-300">Address</th>
                  <th className="px-4 py-3">Pincode</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600 italic">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600 italic">
                      No data found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr key={item._id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 border border-gray-300">{startIndex + index + 1}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.exhibition}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.company_email}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.company_phone_number}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.company_address}</td>
                      <td className="px-4 py-3 border border-gray-300">{item.pincode}</td>
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
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
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

export default Company;
