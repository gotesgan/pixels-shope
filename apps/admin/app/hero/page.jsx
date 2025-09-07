'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Save, Eye } from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function HeroPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // "form" | "uploaded"

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const [uploadedData, setUploadedData] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/v1/ui/create-hero-section',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const data = await response.json();
        console.log('Response:', data);

        if (activeTab === 'uploaded') {
          setLoading(true);
          setTimeout(() => {
            if (data?.data && data.data.length > 0) {
              const normalizedData = data.data.map((item) => ({
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                buttonText: item.ctaText,
                buttonLink: item.ctaLink,
                image: item.media?.image || '/placeholder.svg',
              }));
              console.log('Normalized Hero Section Data:', normalizedData);
              setUploadedData(normalizedData);
            } else {
              setUploadedData([]);
            }
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching hero section:', error);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }
    fetch(`http://localhost:3001/api/v1/ui/create-hero-section/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Delete Response:', data);
        if (data.success) {
          alert('Hero section deleted successfully!');
          setUploadedData((prevData) =>
            prevData.filter((item) => item.id !== id),
          );
        } else {
          alert('Failed to delete hero section. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error deleting hero section:', error);
        alert('Error deleting hero section. Please try again.');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.image) {
      alert('Hero image is required.');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title || '');
    formDataToSend.append('subtitle', formData.subtitle || '');
    formDataToSend.append('buttonText', formData.buttonText || '');
    formDataToSend.append('buttonLink', formData.buttonLink || '');
    formDataToSend.append('file', formData.image);

    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/ui/create-hero-section',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formDataToSend,
        },
      );
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        alert('Hero section updated successfully!');
        setFormData({
          title: '',
          subtitle: '',
          buttonText: '',
          buttonLink: '',
          image: null,
        });
        setPreviewImage(null);
      } else {
        throw new Error('Failed to update hero section');
      }
    } catch (error) {
      console.error('Error updating hero section:', error);
      alert('Error updating hero section. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar
        toggleSidebar={toggleSidebar}
        storeName="My Store"
        sidebarOpen={sidebarOpen}
      />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
      >
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Tabs */}
              <div className="flex space-x-6 border-b mb-8">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`pb-2 font-medium ${
                    activeTab === 'form'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  Edit Hero Section
                </button>
                <button
                  onClick={() => setActiveTab('uploaded')}
                  className={`pb-2 font-medium flex items-center space-x-2 ${
                    activeTab === 'uploaded'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Uploaded Data</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'form' ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left - Form */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Enter hero title"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero Subtitle
                        </label>
                        <textarea
                          rows={4}
                          value={formData.subtitle}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              subtitle: e.target.value,
                            }))
                          }
                          placeholder="Enter hero subtitle or description"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={formData.buttonText}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              buttonText: e.target.value,
                            }))
                          }
                          placeholder="e.g., Shop Now"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Link
                        </label>
                        <input
                          type="url"
                          value={formData.buttonLink}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              buttonLink: e.target.value,
                            }))
                          }
                          placeholder="https://example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5" />
                            <span>Update Hero Section</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right - Image Upload */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero Image *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          {previewImage ? (
                            <div className="relative">
                              <img
                                src={previewImage}
                                alt="Hero preview"
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="hero-image-upload"
                              />
                              <label
                                htmlFor="hero-image-upload"
                                className="cursor-pointer"
                              >
                                <div className="space-y-4">
                                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                  </div>
                                  <p className="text-gray-600">
                                    Drop your image here, or{' '}
                                    <span className="text-blue-600 font-medium">
                                      browse
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  {loading ? (
                    <p className="text-gray-600">Loading uploaded data...</p>
                  ) : uploadedData.length === 0 ? (
                    <p className="text-gray-600">
                      No uploaded hero sections found.
                    </p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {uploadedData.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg p-6 bg-gray-50 relative"
                        >
                          <img
                            src={`https://media.pixelperfects.in/${item.image}`}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-xl font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{item.subtitle}</p>
                          <a
                            href={item.buttonLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                          >
                            {item.buttonText}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
