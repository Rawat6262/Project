import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from './Menu.admin';

const AdminCompany = () => {
  const [bigdata, setBigdata] = useState([]);
  const [company, setcompany] = useState(987);
  const [exhibition, setexhibition] = useState(989);
  const [product, setproduct] = useState(78787);
  let navigator = useNavigate();
let handleneworg = ()=>{
  navigator('/api/Organiser')
}
  const org = useCallback(async () => {
    try {
      const result = await axios.get('/api/Dashboard');
      console.log(result);
      // console.log(resu);
      setBigdata(result.data);
    } catch (e) {
      console.error("Error fetching organisers:", e);
    }
  }, []);

  useEffect(() => {
    org();
  }, [org]);
  console.log(bigdata)
  return (
    <div className="flex flex-row">
        {/* Main content */}
        {<AdminMenu/>}
      <div className=" h-screen w-full mt-8 flex flex-col border-2 ml-10">
        <div className=" h-10 w-full  flex bg-gray-100 border-2 justify-between">
          <div className='h-9 w-40 border-2 '><h1 className='font-bold text-2xl'>SEM  GROUP</h1></div>
        <button className='h-9 w-45 border-2 text-blue-300 border-blue-400 rounded'>View Organiser Details</button>
        </div> 

        <div className=" h-25 w-[95%] ml-5 mt-4 flex justify-baseline">
    
          <div className="h-25 w-48 rounded-2xl flex flex-col mr-8 justify-center items-center bg-sky-50 font-medium">
            <div className=" h-6 w-36 text-center flex justify-center items-center">exhibition</div>
            <div className=" h-8 w-36 mt-0.5 text-center">{exhibition}</div>
          </div>
          <div className="font-medium h-25 w-48 rounded-2xl flex flex-col justify-center items-center bg-blue-100">
            <div className=" h-6 w-36 text-center flex justify-center items-center">Company</div>
            <div className=" h-8 w-36 mt-0.5 text-center">{company}</div>
          </div>
     </div>

        <div className=" flex-1 w-[95%] mt-5 ml-5 border-2" >
          <div className=" h-10 w-full flex justify-between px-2 border-2 text-center">
            <h1 className='font-bold text-2xl'>Exhibition List</h1>
            <div>
            <input type="text" placeholder="Search" className="h-10 w-60 border-2 mr-7 text-center antialiased border-gray-600 rounded" />
            <button className="h-11 w-60 border-2 rounded text-blue-400 " onClick={handleneworg} >New Organiser →</button>
          </div>
          </div>

          <div className=" flex-1 w-full overflow-x-auto text-center">
            <table className="w-full min-w-[600px] border-collapse text-center ">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th classNonClickame="px-3 py-2 text-left border border-gray-300">#</th>
                  <th className="px-3 py-2 text-left border border-gray-300">Full Name</th>
                  <th className="px-3 py-2 text-left border border-gray-300">E-mail</th>
                  <th className="px-3 py-2 text-left border border-gray-300">Phone-number</th>
                </tr>
              </thead>
              <tbody>
                {bigdata.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-3 py-2 text-center">No data available</td>
                  </tr>
                ) : (
                  bigdata.map((item, index) => (
                    <tr key={item._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 text-left border border-gray-300">{index + 1}</td>
                      <td className="px-3 py-2 text-left border border-gray-300">{item.fullname}</td>
                      <td className="px-3 py-2 text-left border border-gray-300">{item.email}</td>
                      <td className="px-3 py-2 text-left border border-gray-300">{item.phonenumber}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-0.5 h-9 border-2 w-full flex text-center font-bold justify-center m-2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompany;
