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

let role = 'NORMAL';

export default function App() {
  return (
    <>
      {role === 'NORMAL' ? (
        <Routes>
          <Route path="/" element={<LoginForms />} />
          <Route path="/api/Signup" element={<SignupForms />} />
          <Route path="/api/Company" element={<Company />} />
          <Route path="/api/organiser" element={<Organiser />} />
          <Route path="/api/Products" element={<Products />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/api/Admin/organiser" element={<AdminOrganiser />} />
          <Route path="/api/Admin/Company" element={<AdminCompany />} />
          <Route path="/api/Admin/Products" element={<AdminProducts />} />
        </Routes>
      )}
      <Toaster position="top-center" richColors />
    </>
  );
}
