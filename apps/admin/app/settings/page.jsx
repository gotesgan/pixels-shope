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
  const [formData, setFormData] = useState(() => {
    // Initialize formData from localStorage if available
    const savedData = localStorage.getItem('storeFormData');
    return savedData
      ? JSON.parse(savedData)
      : {
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
        };
  });
  const [customDomain, setCustomDomain] = useState('');
  const token = localStorage.getItem('token');

  // Fetch store info on mount and merge with localStorage
  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (!token) {
        console.log('No token found, relying on localStorage data');
        return;
      }
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
          const updatedFormData = {
            name: info.name || formData.name,
            description: info.description || formData.description,
            phone: info.phone || formData.phone,
            address: info.address || formData.address,
            city: info.city || formData.city,
            state: info.state || formData.state,
            country: info.country || formData.country || 'India',
            postalCode: info.postalCode || formData.postalCode,
            businessTypes: info.businessTypes || formData.businessTypes,
            colour: info.colour || formData.colour,
            displayMode: info.displayMode || formData.displayMode || 'both',
            tagline: info.tagline || formData.tagline,
          };
          setFormData(updatedFormData);
          // Save fetched data to localStorage
          localStorage.setItem('storeFormData', JSON.stringify(updatedFormData));
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

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('storeFormData', JSON.stringify(formData));
  }, [formData]);

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
        // Update localStorage with the latest formData
        localStorage.setItem('storeFormData', JSON.stringify(formData));
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

  // The rest of your component (JSX) remains unchanged
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
              {/* ... rest of your JSX ... */}
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