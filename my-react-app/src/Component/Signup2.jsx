import React, { useState, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../assets/Dark.png';

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

  const navigate = useNavigate();

  // Country / State / City lists
  const countries = useMemo(() =>
    Country.getAllCountries().map(c => ({
      value: c.isoCode,
      label: c.name
    }))
  , []);

  const states = useMemo(() =>
    form.country
      ? State.getStatesOfCountry(form.country).map(s => ({
          value: s.isoCode,
          label: s.name
        }))
      : []
  , [form.country]);

  const cities = useMemo(() =>
    (form.country && form.state)
      ? City.getCitiesOfState(form.country, form.state).map(c => ({
          value: c.name,
          label: c.name
        }))
      : []
  , [form.country, form.state]);

  // Handle dropdowns
  const handleSelect = (option, field) => {
    setForm(prev => ({
      ...prev,
      [field]: option ? option.value : '',
      ...(field === 'country' ? { state: '', city: '' } : {}),
      ...(field === 'state' ? { city: '' } : {})
    }));
  };

  // Handle inputs
  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'mobile_number') {
      // Allow only 10 digits
      const digits = value.replace(/\D/g, '').slice(0, 10);

      setForm(prev => ({
        ...prev,
        [name]: digits
      }));

      // Auto move focus if 10 digits entered
      if (digits.length === 10) {
        const next = e.target.form.elements[
          Array.from(e.target.form.elements).indexOf(e.target) + 1
        ];
        if (next) next.focus();
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/signup', form);
      toast.success(typeof data === 'string' ? data : 'User created successfully!');
      navigate('https://be.onexhib.com/api/organiser');
    } catch (error) {
      toast.error(`Submission failed! ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-8 rounded-3xl bg-white shadow-2xl border border-gray-100 space-y-8 transition-all hover:shadow-[0_8px_48px_rgba(60,60,120,0.15)]"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-40" />
        </div>

        {/* Personal Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} required />
            <InputField label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} required />
            <InputField type="email" label="Email" name="email" value={form.email} onChange={handleChange} required />
            <InputField type="password" label="Password" name="password" value={form.password} onChange={handleChange} required />
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Company Name" name="company_name" value={form.company_name} onChange={handleChange} />
            <InputField label="Designation" name="designation" value={form.designation} onChange={handleChange} />
            <InputField type="url" label="Website" name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" />
            <InputField
              label="Mobile Number"
              name="mobile_number"
              value={form.mobile_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Location Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField label="Country" options={countries} value={form.country} onChange={val => handleSelect(val, 'country')} />
            <SelectField label="State" options={states} value={form.state} onChange={val => handleSelect(val, 'state')} isDisabled={!form.country} />
            <SelectField label="City" options={cities} value={form.city} onChange={val => handleSelect(val, 'city')} isDisabled={!form.state} />
          </div>
          <div className="mt-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={4}
              placeholder="Enter your address"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 text-lg rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// Reusable Input
const InputField = ({ label, name, value, onChange, type = 'text', required, placeholder }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      required={required}
      maxLength={name === 'mobile_number' ? 10 : undefined}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />
  </div>
);

// Reusable Select
const SelectField = ({ label, options, value, onChange, isDisabled }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
    <Select
      options={options}
      value={options.find(opt => opt.value === value) || null}
      onChange={onChange}
      placeholder={`Select ${label.toLowerCase()}`}
      isDisabled={isDisabled}
      isClearable
      classNamePrefix="react-select"
    />
  </div>
);

export default UserForm;
