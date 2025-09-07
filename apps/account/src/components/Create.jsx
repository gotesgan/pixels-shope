'use client';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'IN',
    zipCode: '400001',
    password: 'password123',
    confirmPassword: 'password123',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/user/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zipCode: formData.zipCode,
            password: formData.password,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }

      const data = await response.json();
      if (data.token) localStorage.setItem('authToken', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/Create-Store');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Soft spotlight effect */}
      <div className="absolute w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[120px] -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] bottom-0 right-0 animate-pulse" />

      <div className="absolute top-6 left-6 z-20">
        <img
          src="https://media.pixelperfects.in/pixelperfect03.png"
          alt="Logo"
          className="w-24 h-auto drop-shadow-lg"
        />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {' '}
        {/* Increased max width */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/40">
          {' '}
          {/* More padding */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
              Create Account
            </h1>
            <p className="text-gray-600 text-lg">
              Join us and start building your online store{' '}
            </p>
          </div>
          {error && (
            <div className="mb-8 p-4 bg-red-50/80 border border-red-200 text-red-700 rounded-xl text-sm shadow-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Full Name *"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Phone Number *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="Street Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-4 border border-slate-300 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <Input
                label="ZIP/Postal Code"
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirm Password *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-8 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] text-lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-slate-600 text-base">
              Already have an account?{' '}
              <Link
                to="/Login"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Small reusable Input component to keep things clean */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-4 border border-slate-300 rounded-xl bg-white/80 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>
  );
}
