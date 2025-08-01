import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VerticalMenu from "./Menu";

const Company = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const companyId = 987;
  const exhibitionId = 989;
  const productId = 78787;

  const navigate = useNavigate();

  const handleNewOrg = () => {
    navigate("/api/Organiser");
  };

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/company");
      setData(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <div className="flex flex-row">
      <VerticalMenu />

      <div className="h-screen w-full mt-8 flex flex-col border-2 ml-10">
        {/* Header */}
        <div className="h-10 w-full flex bg-gray-100 border-2 justify-between px-4">
          <h1 className="font-bold text-2xl">SEM GROUP</h1>
          <button className="h-9 px-4 text-blue-500 border border-blue-400 rounded">
            View Organiser Details
          </button>
        </div>

        {/* Stats */}
        <div className="h-25 w-[95%] ml-5 mt-4 flex">
          <div className="h-25 w-48 rounded-2xl flex flex-col mr-8 justify-center items-center bg-sky-50 font-medium">
            <div className="h-6 w-36 text-center">Exhibition</div>
            <div className="h-8 w-36">{exhibitionId}</div>
          </div>
          <div className="font-medium h-25 w-48 rounded-2xl flex flex-col justify-center items-center bg-blue-100">
            <div className="h-6 w-36 text-center">Company</div>
            <div className="h-8 w-36">{companyId}</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 w-[95%] mt-5 ml-5 border-2">
          <div className="h-10 w-full flex justify-between px-2 border-b text-center">
            <h2 className="font-bold text-2xl">Exhibition List</h2>
            <div>
              <input
                type="text"
                placeholder="Search"
                className="h-10 w-60 border mr-7 text-center rounded border-gray-400"
              />
              <button
                className="h-11 w-60 border rounded text-blue-500 border-blue-400"
                onClick={handleNewOrg}
              >
                New Organiser →
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 w-full overflow-x-auto text-center">
            {loading ? (
              <p className="p-4 text-gray-500">Loading...</p>
            ) : (
              <table className="w-full min-w-[600px] border-collapse text-center">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-3 py-2 border">#</th>
                    <th className="px-3 py-2 border">Exhibition</th>
                    <th className="px-3 py-2 border">E-mail</th>
                    <th className="px-3 py-2 border">Phone Number</th>
                    <th className="px-3 py-2 border">Address</th>
                    <th className="px-3 py-2 border">Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-3 py-2 text-center text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr
                        key={item._id || index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-3 py-2 border">{index + 1}</td>
                        <td className="px-3 py-2 border">{item.exhibition}</td>
                        <td className="px-3 py-2 border">
                          {item.company_email}
                        </td>
                        <td className="px-3 py-2 border">
                          {item.company_phone_number}
                        </td>
                        <td className="px-3 py-2 border">
                          {item.company_address}
                        </td>
                        <td className="px-3 py-2 border">{item.pincode}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
