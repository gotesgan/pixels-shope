'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import { useContext } from 'react';
export default function CreateStore() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [storeCreated, setStoreCreated] = useState(false);
  const [storeData, setStoreData] = useState(null);
const {setStoreDomain} =  useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    businessType: '',
    color: '#3b82f6',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleColorChange = (e) => {
    setFormData((prev) => ({ ...prev, color: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('businessTypes', formData.businessType);
      formDataToSend.append('colour', formData.color);
      if (formData.logo) {
        formDataToSend.append('file', formData.logo);
      }

      const response = await fetch(
        'http://localhost:3001/api/v1/user/create-store',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create store');
      }

      const data = await response.json();
      setStoreData(data);
      setStoreDomain(data.store?.domain)
      setStoreCreated(true);
    } catch (err) {
      setError(err.message || 'Failed to create store. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    localStorage.setItem('createdStore', JSON.stringify(storeData));
    navigate('/domain-question');
  };

  if (storeCreated) {
    return (
      <div className="min-h-screen bg-mordern flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">Success!</h2>
            <p className="text-gray-600 mb-6">{storeData?.message}</p>

            <div className="bg-gray-50 p-6 rounded-xl mb-6 text-left border border-gray-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Store Details</h3>
              <p className="text-gray-700"><strong>Store ID:</strong> {storeData?.store?.id}</p>
              <p className="text-gray-700"><strong>Domain:</strong> {storeData?.store?.domain}</p>
              <p className="text-gray-700"><strong>Name:</strong> {storeData?.store?.storeInfo?.name}</p>
              <p className="text-gray-700"><strong>Business Type:</strong> {storeData?.store?.storeInfo?.businessTypes}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-300 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mordern flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Your Store</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="name">
              Store Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="Enter your store name"
              required
            />
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="businessType">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 appearance-none bg-white"
              required
            >
              <option value="">Select Business Type</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing & Fashion</option>
              <option value="food">Food & Beverages</option>
              <option value="books">Books & Media</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="automotive">Automotive</option>
              <option value="toys">Toys & Games</option>
              <option value="jewelry">Jewelry & Accessories</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="color">
              Shop Name Color <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleColorChange}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <input
                type="text"
                value={formData.color}
                onChange={handleColorChange}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                placeholder="#3b82f6"
              />
            </div>
            <div
              className="mt-3 p-3 rounded-lg text-center text-white font-medium transition-all duration-200"
       style={{ color: formData.color }}

            >
              {formData.name || 'Your Store Name'}
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="logo">
              Store Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.logo && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">Selected: {formData.logo.name}</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-300 disabled:opacity-50 transition-all duration-300 font-medium"
          >
            {isLoading ? 'Creating Store...' : 'Create Store'}
          </button>
        </form>
      </div>
    </div>
  );
}