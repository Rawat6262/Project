import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import PopupForm from '../Component/PopupForm';
import AdminMenu from './Menu.admin';
const AdminOrganiser = () => {
  const [bigdata, setBigdata] = useState([]);
  const [company, setcompany] = useState(987);
  const [exhibition, setexhibition] = useState(989);
  const [showModal, setShowModal] = useState(false);
  const [showexhibitionForm, setShowForm] = useState(false);

  const org = useCallback(async () => {
    try {
      const result = await axios.get('/api/Exhibition');
      console.log(result.data)
      setBigdata(result.data);
    } catch (e) {
      console.error("Error fetching organisers:", e);
    }
  }, []);

  useEffect(() => {
    org();
  }, [org]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminMenu />

      <div className="flex-1 w-full mt-8 flex flex-col border-2 md:ml-10 overflow-y-auto">
        {/* Header */}
        <div className="h-16 w-full flex flex-col sm:flex-row gap-2 sm:gap-0 bg-gray-100 border-2 justify-between items-center px-4">
          <div className='flex-1 font-bold text-2xl'>SEM GROUP</div>
          <button className='h-10 w-full sm:w-60 border-2 text-blue-300 border-blue-400 rounded'>
            View Organiser Details
          </button>
        </div>

        {/* Stats */}
        <div className="w-[95%] mx-auto mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
          <div className="h-24 w-full sm:w-48 rounded-2xl flex flex-col justify-center items-center bg-sky-50 font-medium">
            <div className="h-6 w-36 text-center">Exhibition</div>
            <div className="h-8 w-36">{exhibition}</div>
          </div>
          <div className="h-24 w-full sm:w-48 rounded-2xl flex flex-col justify-center items-center bg-blue-100 font-medium">
            <div className="h-6 w-36 text-center">Company</div>
            <div className="h-8 w-36">{company}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 w-[95%] mx-auto mt-5 border-2">
          {/* Header Row */}
          <div className="h-auto py-2 w-full flex flex-col lg:flex-row justify-between gap-2 px-2 border-2 text-center">
            <h1 className='font-bold text-xl sm:text-2xl'>Exhibition List</h1>
            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <input
                type="text"
                placeholder="Search"
                className="h-10 w-full sm:w-60 border-2 text-center antialiased border-gray-600 rounded"
              />
              <button className="h-11 w-full sm:w-60 border-2 rounded text-blue-400 px-4 py-2  " 
               onClick={() => setShowModal(true)}>
                Add Exhibition →
              </button>
               {showModal && <PopupForm onClose={() => setShowModal(false)} />}
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 w-full overflow-x-auto text-center mt-4">
            <table className="w-full min-w-[600px] border-collapse text-center">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-3 py-2 text-left border border-gray-300">#</th>
                  <th className="px-3 py-2 text-left border border-gray-300">Exhibition_Name</th>
                  <th className="px-3 py-2 text-left border border-gray-300">Exhibition_address</th>
                  <th className="px-3 py-2 text-left border border-gray-300">Category</th>
                </tr>
              </thead>
              <tbody>
                {bigdata.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-3 py-2 text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  bigdata.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-3 py-2 text-left border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 text-left border border-gray-300">
                        {item.exhibition_name}
                      </td>
                      <td className="px-3 py-2 text-left border border-gray-300">
                        {item.exhibition_address}
                      </td>
                      <td className="px-3 py-2 text-left border border-gray-300 flex justify-between">
                        {item.category}
                      <button className='border-2 p-0.5 border-gray-300' onClick={()=> setShowForm(true)}>{"<-"}</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-0.5 h-9 border-2 w-full flex text-center font-bold justify-center m-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrganiser;
