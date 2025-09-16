'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Save,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function ContactPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [authToken, setAuthToken] = useState(null); // store token in state

  const [contactData, setContactData] = useState({
    information: [
      {
        type: 'PHONE',
        value: '+91 9876543210',
        label: 'Primary Phone',
        isPrimary: true,
      },
      {
        type: 'EMAIL',
        value: 'contact@mystore.com',
        label: 'Business Email',
        isPrimary: true,
      },
      {
        type: 'ADDRESS',
        value: '123 Business Street, City, State 12345',
        label: 'Main Office',
        isPrimary: true,
      },
      {
        type: 'WHATSAPP',
        value: '+91 9876543210',
        label: 'WhatsApp Support',
        isPrimary: false,
      },
    ],
    businessHours: [
      { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', isActive: true },
      { days: 'Saturday', hours: '10:00 AM - 4:00 PM', isActive: true },
      { days: 'Sunday', hours: 'Closed', isActive: false },
    ],
    socialLinks: [
      {
        platform: 'FACEBOOK',
        url: 'https://facebook.com/mystore',
        isActive: true,
      },
      {
        platform: 'INSTAGRAM',
        url: 'https://instagram.com/mystore',
        isActive: true,
      },
      {
        platform: 'TWITTER',
        url: 'https://twitter.com/mystore',
        isActive: true,
      },
    ],
    locations: [
      {
        name: 'Main Office',
        address: '123 Business Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        postalCode: '400001',
        isPrimary: true,
      },
    ],
    submissions: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: "I'm interested in your products. Please contact me.",
        status: 'PENDING',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 9876543211',
        message: 'I have a question about shipping policies.',
        status: 'REVIEWED',
        createdAt: '2024-01-14T15:45:00Z',
      },
    ],
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);

  const handleSave = async () => {
    try {
      console.log('Saving contact page data:', contactData);

      // Option 1: Send as JSON (recommended)
      const response = await fetch(
        'http://localhost:3001/api/v1/ui/contact-page',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json', // Important: Set content type for JSON
          },
          body: JSON.stringify(contactData), // Fixed: was missing JSON.stringify
        },
      );

      console.log('Raw response:', response);
      const result = await response.json();
      console.log('Server response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save contact page data');
      }

      alert('Contact page saved successfully!');
    } catch (error) {
      console.error('Error saving contact page:', error);
      alert('Error saving contact page');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800';
      case 'RESPONDED':
        return 'bg-green-100 text-green-800';
      case 'SPAM':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'PHONE':
        return <Phone className="h-4 w-4" />;
      case 'EMAIL':
        return <Mail className="h-4 w-4" />;
      case 'ADDRESS':
        return <MapPin className="h-4 w-4" />;
      case 'WHATSAPP':
        return <Phone className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'FACEBOOK':
        return <Facebook className="h-4 w-4" />;
      case 'INSTAGRAM':
        return <Instagram className="h-4 w-4" />;
      case 'TWITTER':
        return <Twitter className="h-4 w-4" />;
      default:
        return <Facebook className="h-4 w-4" />;
    }
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
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Contact Management
                  </h1>
                  <p className="text-gray-600">
                    Manage contact information and inquiries
                  </p>
                </div>

                <button
                  onClick={handleSave} // <-- Add your save function here
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="text-2xl font-bold text-blue-700">
                    {contactData.submissions.length}
                  </div>
                  <div className="text-sm text-blue-600">Total Inquiries</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="text-2xl font-bold text-yellow-700">
                    {
                      contactData.submissions.filter(
                        (s) => s.status === 'PENDING',
                      ).length
                    }
                  </div>
                  <div className="text-sm text-yellow-600">Pending</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="text-2xl font-bold text-green-700">
                    {
                      contactData.submissions.filter(
                        (s) => s.status === 'RESPONDED',
                      ).length
                    }
                  </div>
                  <div className="text-sm text-green-600">Responded</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="text-2xl font-bold text-purple-700">
                    {contactData.locations.length}
                  </div>
                  <div className="text-sm text-purple-600">Locations</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'info', label: 'Contact Info' },
                      { id: 'hours', label: 'Business Hours' },
                      { id: 'social', label: 'Social Links' },
                      { id: 'locations', label: 'Locations' },
                      { id: 'submissions', label: 'Inquiries' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Contact Info Tab */}
                  {activeTab === 'info' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          Contact Information
                        </h3>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                          <Plus className="h-4 w-4" />
                          <span>Add Contact</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contactData.information.map((info, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-2">
                                {getContactIcon(info.type)}
                                <span className="font-medium">
                                  {info.label}
                                </span>
                                {info.isPrimary && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <select
                                value={info.type}
                                onChange={(e) => {
                                  const newInfo = [...contactData.information];
                                  newInfo[index] = {
                                    ...newInfo[index],
                                    type: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    information: newInfo,
                                  }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              >
                                <option value="PHONE">Phone</option>
                                <option value="EMAIL">Email</option>
                                <option value="ADDRESS">Address</option>
                                <option value="WHATSAPP">WhatsApp</option>
                              </select>
                              <input
                                type="text"
                                value={info.value}
                                onChange={(e) => {
                                  const newInfo = [...contactData.information];
                                  newInfo[index] = {
                                    ...newInfo[index],
                                    value: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    information: newInfo,
                                  }));
                                }}
                                placeholder="Contact value"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={info.label}
                                onChange={(e) => {
                                  const newInfo = [...contactData.information];
                                  newInfo[index] = {
                                    ...newInfo[index],
                                    label: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    information: newInfo,
                                  }));
                                }}
                                placeholder="Label"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business Hours Tab */}
                  {activeTab === 'hours' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          Business Hours
                        </h3>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                          <Plus className="h-4 w-4" />
                          <span>Add Hours</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {contactData.businessHours.map((hours, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg"
                          >
                            <Clock className="h-5 w-5 text-gray-500" />
                            <input
                              type="text"
                              value={hours.days}
                              onChange={(e) => {
                                const newHours = [...contactData.businessHours];
                                newHours[index] = {
                                  ...newHours[index],
                                  days: e.target.value,
                                };
                                setContactData((prev) => ({
                                  ...prev,
                                  businessHours: newHours,
                                }));
                              }}
                              placeholder="Days"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={hours.hours}
                              onChange={(e) => {
                                const newHours = [...contactData.businessHours];
                                newHours[index] = {
                                  ...newHours[index],
                                  hours: e.target.value,
                                };
                                setContactData((prev) => ({
                                  ...prev,
                                  businessHours: newHours,
                                }));
                              }}
                              placeholder="Hours"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={hours.isActive}
                                onChange={(e) => {
                                  const newHours = [
                                    ...contactData.businessHours,
                                  ];
                                  newHours[index] = {
                                    ...newHours[index],
                                    isActive: e.target.checked,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    businessHours: newHours,
                                  }));
                                }}
                                className="rounded"
                              />
                              <span className="text-sm">Active</span>
                            </label>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links Tab */}
                  {activeTab === 'social' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          Social Media Links
                        </h3>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                          <Plus className="h-4 w-4" />
                          <span>Add Social Link</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contactData.socialLinks.map((social, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-2">
                                {getSocialIcon(social.platform)}
                                <span className="font-medium">
                                  {social.platform}
                                </span>
                                {social.isActive && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                    Active
                                  </span>
                                )}
                              </div>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <select
                                value={social.platform}
                                onChange={(e) => {
                                  const newSocial = [
                                    ...contactData.socialLinks,
                                  ];
                                  newSocial[index] = {
                                    ...newSocial[index],
                                    platform: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    socialLinks: newSocial,
                                  }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              >
                                <option value="FACEBOOK">Facebook</option>
                                <option value="INSTAGRAM">Instagram</option>
                                <option value="TWITTER">Twitter</option>
                                <option value="LINKEDIN">LinkedIn</option>
                                <option value="YOUTUBE">YouTube</option>
                              </select>
                              <input
                                type="url"
                                value={social.url}
                                onChange={(e) => {
                                  const newSocial = [
                                    ...contactData.socialLinks,
                                  ];
                                  newSocial[index] = {
                                    ...newSocial[index],
                                    url: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    socialLinks: newSocial,
                                  }));
                                }}
                                placeholder="Social media URL"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Locations Tab */}
                  {activeTab === 'locations' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          Store Locations
                        </h3>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                          <Plus className="h-4 w-4" />
                          <span>Add Location</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {contactData.locations.map((location, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <span className="font-medium">
                                  {location.name}
                                </span>
                                {location.isPrimary && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={location.name}
                                onChange={(e) => {
                                  const newLocations = [
                                    ...contactData.locations,
                                  ];
                                  newLocations[index] = {
                                    ...newLocations[index],
                                    name: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    locations: newLocations,
                                  }));
                                }}
                                placeholder="Location name"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={location.address}
                                onChange={(e) => {
                                  const newLocations = [
                                    ...contactData.locations,
                                  ];
                                  newLocations[index] = {
                                    ...newLocations[index],
                                    address: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    locations: newLocations,
                                  }));
                                }}
                                placeholder="Address"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={location.city}
                                onChange={(e) => {
                                  const newLocations = [
                                    ...contactData.locations,
                                  ];
                                  newLocations[index] = {
                                    ...newLocations[index],
                                    city: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    locations: newLocations,
                                  }));
                                }}
                                placeholder="City"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={location.state}
                                onChange={(e) => {
                                  const newLocations = [
                                    ...contactData.locations,
                                  ];
                                  newLocations[index] = {
                                    ...newLocations[index],
                                    state: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    locations: newLocations,
                                  }));
                                }}
                                placeholder="State"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={location.postalCode}
                                onChange={(e) => {
                                  const newLocations = [
                                    ...contactData.locations,
                                  ];
                                  newLocations[index] = {
                                    ...newLocations[index],
                                    postalCode: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    locations: newLocations,
                                  }));
                                }}
                                placeholder="Postal Code"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                value={location.country}
                                onChange={(e) => {
                                  const newLocations = [
                                    ...contactData.locations,
                                  ];
                                  newLocations[index] = {
                                    ...newLocations[index],
                                    country: e.target.value,
                                  };
                                  setContactData((prev) => ({
                                    ...prev,
                                    locations: newLocations,
                                  }));
                                }}
                                placeholder="Country"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submissions Tab */}
                  {activeTab === 'submissions' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Customer Inquiries
                      </h3>

                      <div className="space-y-4">
                        {contactData.submissions.map((submission) => (
                          <div
                            key={submission.id}
                            className="border border-gray-300 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {submission.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {submission.email} • {submission.phone}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}
                                >
                                  {submission.status}
                                </span>
                                <button className="text-blue-600 hover:text-blue-700">
                                  <Edit className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">
                              {submission.message}
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>
                                {new Date(
                                  submission.createdAt,
                                ).toLocaleDateString()}
                              </span>
                              <div className="flex space-x-2">
                                <button className="text-green-600 hover:text-green-700">
                                  Mark as Responded
                                </button>
                                <button className="text-red-600 hover:text-red-700">
                                  Mark as Spam
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
