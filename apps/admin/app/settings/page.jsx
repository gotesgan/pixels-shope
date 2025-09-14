'use client';
import { useState, useEffect } from 'react';
import { Settings, Save, Upload, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [activeTab, setActiveTab] = useState('store');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    businessTypes: '',
    colour: '',
    displayMode: 'both',
    tagline: '',
  });
  const [customDomain, setCustomDomain] = useState('');
  const token = localStorage.getItem('token');

  // Fetch store info on mount
  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/api/v1/store/store-info', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          console.error('Failed to fetch store info, status:', res.status);
          return;
        }
        const data = await res.json();
        console.log('Fetched store info:', data);
        if (data?.store?.storeInfo) {
          const info = data.store.storeInfo;
          setFormData({
            name: info.name || '',
            description: info.description || '',
            phone: info.phone || '',
            address: info.address || '',
            city: info.city || '',
            state: info.state || '',
            country: info.country || 'India',
            postalCode: info.postalCode || '',
            businessTypes: info.businessTypes || '',
            colour: info.colour || '',
            displayMode: info.displayMode || 'both',
            tagline: info.tagline || '',
          });
        }
        if (data?.store?.media) {
          const storeInfoMedia = data.store.media.find(m => m.storeInfoId !== null);
          if (storeInfoMedia) {
            console.log('Current logo URL:', `https://media.pixelperfects.in/${storeInfoMedia.image}`);
            setCurrentLogo(`https://media.pixelperfects.in/${storeInfoMedia.image}`);
          }
        }
      } catch (err) {
        console.error('Error fetching store info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreInfo();
  }, [token]);

  // Handle input change for store settings
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Save / update store info
  const handleSaveStore = async () => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
      if (file) form.append('file', file);
      const res = await fetch('http://localhost:3001/api/v1/store/store-info', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });
      const result = await res.json();
      if (res.ok) {
        alert('Store updated successfully!');
        console.log('Updated store info:', result);
        if (!file && currentLogo) {
          window.location.reload();
        }
      } else {
        alert(result.error || 'Failed to update store');
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  // Handle custom domain input change
  const handleDomainChange = (e) => {
    setCustomDomain(e.target.value);
  };

  // Save custom domain (mock API call)
  const handleSaveDomain = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/v1/store/custom-domain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: customDomain }),
      });
      const result = await res.json();
      if (res.ok) {
        alert('Custom domain updated successfully!');
        console.log('Updated domain:', result);
      } else {
        alert(result.error || 'Failed to update custom domain');
      }
    } catch (err) {
      console.error('Domain update failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        storeName={formData.name || 'My Store'}
        sidebarOpen={sidebarOpen}
      />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
      >
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Settings
                  </h1>
                  <p className="text-gray-600">Manage your store details, branding, and domain</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Settings className="h-5 w-5" />
                </div>
              </div>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`px-4 py-2 font-semibold text-sm ${
                    activeTab === 'store'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('store')}
                >
                  Store Settings
                </button>
                <button
                  className={`px-4 py-2 font-semibold text-sm ${
                    activeTab === 'domain'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('domain')}
                >
                  Custom Domain
                </button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading information...</p>
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === 'store' && (
                    <form className="space-y-8">
                      {/* General Info */}
                      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                          <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                          <span>General Information</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Store Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <InputField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          <InputField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                          <InputField
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                          <InputField
                            label="Postal Code"
                            name="postalCode"
                            type="text"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                                                    <InputField
                            label="tagline"
                            name="tagline"
                            type="text"
                            value={formData.tagline}
                            onChange={handleInputChange}
                          />
                          <InputField
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                          <div className="md:col-span-2">
                            <TextareaField
                              label="Store Description"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              placeholder="Tell us about your store and what makes it unique..."
                            />
                          </div>
                          <div className="md:col-span-2">
                            <TextareaField
                              label="Full Address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Enter your complete business address..."
                            />
                          </div>
                          <InputField
                            label="Business Types (comma-separated)"
                            name="businessTypes"
                            value={formData.businessTypes}
                            onChange={handleInputChange}
                            placeholder="e.g., Retail, Wholesale, Online"
                          />
                          <div className="flex items-end space-x-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
                              <div className="relative">
                                <input
                                  type="color"
                                  name="colour"
                                  value={formData.colour}
                                  onChange={handleInputChange}
                                  className="w-full h-12 p-1 border border-gray-300 rounded-lg cursor-pointer"
                                />
                                <span className="absolute inset-0 rounded-lg border border-gray-300 pointer-events-none"></span>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">Choose your primary brand color</p>
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* Logo Upload */}
                      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                          <div className="w-2 h-6 bg-green-600 rounded-full"></div>
                          <span>Store Logo</span>
                        </h2>
                        {currentLogo && (
                          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                              <Eye className="h-4 w-4" />
                              <span>Current Logo</span>
                            </p>
                            <div className="flex items-center space-x-4">
                              <img
                                src={currentLogo}
                                alt="Current Store Logo"
                                className="w-24 h-24 object-contain bg-white rounded-lg shadow-md border border-gray-200 p-2"
                              />
                              <div>
                                <p className="text-sm text-gray-600">Your current logo is displayed above.</p>
                                <p className="text-xs text-gray-500 mt-1">Upload a new one to replace it.</p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                            <div className="flex items-center space-x-3">
                              <Upload className="h-5 w-5 text-blue-600" />
                              <div>
                                <label className="block text-sm font-medium text-blue-700 cursor-pointer hover:text-blue-900">
                                  Click to upload new logo
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                  />
                                </label>
                                <p className="text-xs text-blue-600 mt-1">PNG, JPG up to 2MB</p>
                              </div>
                            </div>
                            {file && (
                              <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  className="w-16 h-16 object-cover rounded-lg shadow-sm border border-green-200"
                                />
                                <div>
                                  <p className="text-sm font-medium text-green-700">{file.name}</p>
                                  <p className="text-xs text-green-600">Ready to upload</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                      {/* Save Button */}
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleSaveStore}
                          disabled={loading}
                          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <Save className="h-5 w-5" />
                          <span>Save Store Changes</span>
                        </button>
                      </div>
                    </form>
                  )}
                  {activeTab === 'domain' && (
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                        <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                        <span>Custom Domain</span>
                      </h2>
                      <div className="space-y-6">
                        <InputField
                          label="Custom Domain"
                          name="customDomain"
                          value={customDomain}
                          onChange={handleDomainChange}
                          placeholder="e.g., www.yourstore.com"
                          required
                        />
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-700 mb-3">CNAME Record Instructions</h3>
                          <p className="text-sm text-gray-600">
                            To use your custom domain, configure a CNAME record in your DNS settings pointing to:
                          </p>
                          <p className="text-sm font-mono bg-gray-200 p-2 rounded mt-2">
                            pixelperfects.in
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Contact your domain registrar or DNS provider to set up the CNAME record. It may take up to 48 hours for DNS changes to propagate.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleSaveDomain}
                          disabled={loading || !customDomain}
                          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <Save className="h-5 w-5" />
                          <span>Save Domain</span>
                        </button>
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable input field component
function InputField({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 hover:bg-white shadow-sm"
      />
    </div>
  );
}

// Reusable textarea component
function TextareaField({ label, name, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical bg-white/50 hover:bg-white shadow-sm"
      />
    </div>
  );
}