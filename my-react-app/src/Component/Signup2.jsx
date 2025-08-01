import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'sonner';
function UserForm() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    company_name: '',
    designation: '',
    website: '',
    mobile_number: '',
    country: '',
    state: '',
    city: '',
    address: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
let navigate = useNavigate();
  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((c) => ({
        value: c.isoCode,
        label: c.name,
      }))
    );
  }, []);

  useEffect(() => {
    if (form.country) {
      setStates(
        State.getStatesOfCountry(form.country).map((s) => ({
          value: s.isoCode,
          label: s.name,
        }))
      );
      setForm((f) => ({ ...f, state: '', city: '' }));
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
      setForm((f) => ({ ...f, state: '', city: '' }));
    }
  }, [form.country]);

  useEffect(() => {
    if (form.country && form.state) {
      setCities(
        City.getCitiesOfState(form.country, form.state).map((c) => ({
          value: c.name,
          label: c.name,
        }))
      );
      setForm((f) => ({ ...f, city: '' }));
    } else {
      setCities([]);
      setForm((f) => ({ ...f, city: '' }));
    }
  }, [form.state, form.country]);

  // Handle selecting country/state/city from dropdown
  const handleSelect = (selectedOption, field) => {
    if (field === 'country') {
      setForm({
        ...form,
        country: selectedOption ? selectedOption.value : '',
        state: '',
        city: '',
      });
    } else if (field === 'state') {
      setForm({
        ...form,
        state: selectedOption ? selectedOption.value : '',
        city: '',
      });
    } else if (field === 'city') {
      setForm({
        ...form,
        city: selectedOption ? selectedOption.value : '',
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post('/api/signup', form);
      if (data) {
        toast.success(data);
        console.log('Form Data:', form);
      } else {
        alert('not done');
      }
      navigate('/api/organiser')
    } catch (error) {
      
    const message = error.message;
      toast.error(`Login failed! ${message}`);
      // toast('An error occurred: ' + (error?.message || 'Unknown error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-8 rounded-2xl bg-white shadow-2xl border border-gray-200 space-y-8"
        style={{ boxShadow: '0 4px 48px 0 rgba(60,60,120,0.10)' }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8 tracking-tight">
          User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="company_name"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Company Name
            </label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              value={form.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Designation */}
          <div>
            <label
              htmlFor="designation"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Designation
            </label>
            <input
              id="designation"
              name="designation"
              type="text"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              placeholder="Website (e.g. https://example.com)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobile_number"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Mobile Number
            </label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.mobile_number}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                setForm(prev => ({ ...prev, mobile_number: digitsOnly }));
              }}
              placeholder="Mobile Number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Country
            </label>
            <Select
              options={countries}
              value={countries.find((c) => c.value === form.country) || null}
              onChange={(val) => handleSelect(val, 'country')}
              placeholder="Select country"
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              State
            </label>
            <Select
              options={states}
              value={states.find((s) => s.value === form.state) || null}
              onChange={(val) => handleSelect(val, 'state')}
              placeholder="Select state"
              isDisabled={!form.country}
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              City
            </label>
            <Select
              options={cities}
              value={cities.find((c) => c.value === form.city) || null}
              onChange={(val) => handleSelect(val, 'city')}
              placeholder="Select city"
              isDisabled={!form.state}
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
              required
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block mb-2 text-sm font-semibold text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition shadow-xs resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg transition duration-200"
        >
          Submit
        </button>
    
      </form>
    </div>
  );
}

export default UserForm;
