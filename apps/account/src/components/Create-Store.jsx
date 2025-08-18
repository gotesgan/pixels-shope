"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [storeCreated, setStoreCreated] = useState(false);
  const [storeData, setStoreData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    businessType: "",
    color: "#3b82f6",
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
    setError("");

    try {
      const token = localStorage.getItem("authToken");

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("businessTypes", formData.businessType); // ✅ plural
      formDataToSend.append("colour", formData.color); // ✅ British spelling
      if (formData.logo) {
        formDataToSend.append("file", formData.logo);
      }

      const response = await fetch("http://localhost:3000/api/v1/user/create-store", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create store");
      }

      const data = await response.json();
      setStoreData(data);
      setStoreCreated(true);
    } catch (err) {
      setError(err.message || "Failed to create store. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleNext = () => {
    localStorage.setItem("createdStore", JSON.stringify(storeData));
    navigate("/domain-question");
  };

  if (storeCreated) {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-600 mb-4">{storeData?.message}</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold mb-2">Store Details:</h3>
              <p><strong>Store ID:</strong> {storeData?.store?.id}</p>
              <p><strong>Domain:</strong> {storeData?.store?.domain}</p>
              <p><strong>Name:</strong> {storeData?.store?.storeInfo?.name}</p>
              <p><strong>Business Type:</strong> {storeData?.store?.storeInfo?.businessTypes}</p>
            </div>

            <button
                onClick={handleNext}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Your Store</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Store Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Store Name *
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your store name"
                required
            />
          </div>

          {/* Business Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="businessType">
              Business Type *
            </label>
            <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="color">
              Shop Name Color *
            </label>
            <div className="flex items-center space-x-3">
              <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleColorChange}
                  className="w-12 h-10 border rounded cursor-pointer"
              />
              <input
                  type="text"
                  value={formData.color}
                  onChange={handleColorChange}
                  className="flex-1 p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
                  placeholder="#3b82f6"
              />
            </div>
            <div
                className="mt-2 p-2 rounded text-center text-white font-medium"
                style={{ backgroundColor: formData.color }}
            >
              {formData.name || "Your Store Name"}
            </div>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="logo">
              Store Logo
            </label>
            <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
            {formData.logo && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected: {formData.logo.name}</p>
                </div>
            )}
          </div>

          {/* Submit */}
          <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 focus:ring focus:ring-green-300 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Creating Store..." : "Create Store"}
          </button>
        </form>
      </div>
  );
}
