import React, { useState, useMemo, useEffect } from "react";
import VerticalMenu from "./Menu";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductPopupForm from "./Product_popup";

export default function CompanyDetail() {
  const [showform, setshowform] = useState(false);
  const { id } = useParams();

  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]); // ✅ must be array
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/product/${id}`);
      setProducts(Array.isArray(data) ? data : []); // ✅ ensure array
    } catch (error) {
      console.error(
        "❌ Error fetching products:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Fetch company
  const fetchCompany = async () => {
    try {
      const { data } = await axios.get(`/api/company/addproduct/${id}`);
      setCompany(data);
    } catch (error) {
      console.error(
        "❌ Error fetching company:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Debug company once loaded
  useEffect(() => {
    if (company?._id) {
      console.log("✅ Company loaded:", company._id);
    }
  }, [company]);

  // Download brochure
  const fetchBrochure = () => {
    if (!company?._id) {
      console.error("❌ Company ID not available yet");
      return;
    }
    window.open(`/api/brochure/${company._id}`, "_blank");
  };

  // Run on mount / id change
  useEffect(() => {
    Promise.all([fetchCompany(), fetchProducts()]);
  }, [id]);

  // Filtering (fixed field name: product_name)
  const filteredData = useMemo(() => {
    return products.filter((item) =>
      [item.product_name, item.category, item.price].some((field) =>
        field?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [products, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFFFF] text-gray-900 font-serif">
      <VerticalMenu />

      <div className="flex-1 w-full mt-8 flex flex-col border border-gray-300 md:ml-10 bg-white rounded-lg shadow-md overflow-y-auto">
        {/* Header */}
        <div className="h-20 w-full flex flex-col sm:flex-row justify-between items-center px-8 border-b border-gray-300 bg-gray-100 rounded-t-lg">
          <h1 className="flex-1 font-bold text-3xl tracking-wide">
            {company.company_name || "Loading..."}
          </h1>
          <button
            onClick={fetchBrochure}
            className="h-10 w-full sm:w-64 border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white rounded-md font-semibold transition-colors"
          >
            Download Brochure
          </button>
        </div>

        {/* Summary Cards */}
        <div className="w-[95%] mx-auto mt-6 flex flex-wrap gap-6 justify-start">
          {[{ title: "Products", value: products.length }].map((card) => (
            <div
              key={card.title}
              className="h-24 w-48 rounded-xl flex flex-col justify-center items-center bg-white border border-gray-300 shadow-sm"
            >
              <p className="text-lg font-medium text-gray-700">{card.title}</p>
              <p className="text-4xl font-bold text-gray-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div className="w-[95%] mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 border rounded-xl shadow-sm bg-gray-50">
            <p>
              <b>Phone:</b> {company.company_phone_number}
            </p>
            <p>
              <b>E-Mail:</b> {company.company_email}
            </p>
            <p>
              <b>Address:</b> {company.company_address}
            </p>
          </div>
          <div className="p-5 border rounded-xl shadow-sm bg-gray-50">
            <p className="font-bold text-gray-800">About</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {company.company_about || "This is a demo about section."}
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 w-[95%] mx-auto mt-8 rounded-b-lg border border-t-0 border-gray-300 bg-white shadow-sm pb-8 mb-8">
          {/* Controls */}
          <div className="py-4 w-full flex flex-col lg:flex-row justify-between gap-4 px-4 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-gray-800">
              Product List
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Products"
                className="h-10 w-full sm:w-64 border border-gray-400 rounded-md text-gray-700 placeholder-gray-500 px-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button
                className="h-10 w-full sm:w-48 border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white rounded-md font-semibold transition-colors"
                onClick={() => setshowform(true)}
              >
                + Add Product
              </button>
              {showform && (
                <ProductPopupForm
                  Close={() => setshowform(false)}
                  data={id}
                  refreshProducts={fetchProducts} // ✅ pass refresh function
                  exid={company.createdBy}
                />
              )}
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 w-full overflow-x-auto text-left mt-6">
            <table className="w-full min-w-[700px] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-800 border-b border-gray-300">
                  {["#", "Product Name", "Category", "Price", "Action"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3 border-r border-gray-300 last:border-r-0"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-6 text-center text-gray-600 italic"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr
                      key={item._id || index} // ✅ backend usually sends _id
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 border border-gray-300">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {item.product_name}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {item.price}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
                          View
                        </button>
                        <button className="ml-2 px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-4 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
