import { Routes, Route } from "react-router-dom";
import SignupForms from "./Component/Signup2";
import Dashboard from "./Admin/Dashboard.admin";
import Organiser from "./Component/Organiser";
import Products from "./Component/Products";
import Company from "./Component/Company";
import LoginForms from "./Component/login";
import AdminOrganiser from "./Admin/Organiser.admin";
import AdminCompany from "./Admin/Company.admin";
import AdminProducts from "./Admin/Products.admin";
import { Toaster } from 'sonner';
import { useEffect } from "react";
import User from "./Component/User";
import CompanyDetail from "./Component/Products";
import AdminDashboard from "./Admin/Dashboard.admin";

let role = 'NORMAL';

export default function App() {
  // let fetchdata = ()=>{
    
  // }
  // useEffect(()=>{
    
  // },[])
  return (
    <>
    
      {role === 'NORMAL' ? (
        <Routes>
          <Route path="/" element={<LoginForms />} />
          <Route path="/api/Signup" element={<SignupForms />} />
          <Route path="/api/Company" element={<Company />} />
          <Route path="/api/organiser" element={<Organiser />} />
          <Route path="/organiser/:id" element={<User/>} />
          <Route path="/company/:id" element={<CompanyDetail />} />
        </Routes>
      ) : (
        <Routes> 
          <Route path="/" element={<AdminDashboard/>} />
          <Route path="/api/Admin/organiser" element={<AdminOrganiser />} />
          <Route path="/api/Admin/Company" element={<AdminCompany />} />
          <Route path="/api/Admin/Products" element={<AdminProducts />} />
        </Routes>
      )}
      <Toaster position="top-center" richColors />
    </>
  );
}
