import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
// import { Toaster } from "sonner"; // Thies is correct, not @/components

const LoginForms = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  let navigate = useNavigate();

  const handleSignup = () => {
    navigate('/api/Signup');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/login', { email, password });
    console.log(data);
    if (data === 'login failed') {
      // toast.error('Please connect to backend.');
      toast.error("Login failed!");
      navigate('/api/Signup');
    } else {
      toast.success("Login successful!");
      navigate('/api/organiser');
    }
  } catch (error) {
    const message = error.message;
    console.error('Login error:', message);
    toast.error(`Login failed! ${message}`);
    navigate('/api/Signup');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl border border-gray-200 space-y-8"
        style={{ boxShadow: '0 4px 48px 0 rgba(60,60,120,0.10)' }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8 tracking-tight">
          Login
        </h2>
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg transition duration-200"
        >
          Login
        </button>
        <button
          type="button"
          className="w-full py-3 mt-3 text-lg rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-blue-600 hover:text-white shadow-md transition duration-200"
          onClick={handleSignup}
        >
          Signup
        </button>
          <Toaster />
      </form>
    </div>
  );
};

export default LoginForms;
