'use client';

import { useEffect, useState } from 'react';
import { Save, FileText, Shield, RotateCcw } from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function PoliciesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePolicy, setActivePolicy] = useState('PRIVACY');
  const [policies, setPolicies] = useState({
    PRIVACY: {
      type: 'PRIVACY',
      title: 'Privacy Policy',
      lastUpdated: '2024-01-15',
      sections: [
        {
          id: 1,
          heading: 'Information We Collect',
          content:
            'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.',
          isOrdered: false,
          listItems: [
            'Personal information (name, email, phone number)',
            'Payment information',
            'Shipping addresses',
            'Communication preferences',
          ],
        },
        {
          id: 2,
          heading: 'How We Use Your Information',
          content:
            'We use the information we collect to provide, maintain, and improve our services.',
          isOrdered: true,
          listItems: [
            'Process and fulfill your orders',
            'Send you confirmations and updates',
            'Provide customer support',
            'Improve our products and services',
          ],
        },
      ],
    },
    TERMS: {
      type: 'TERMS',
      title: 'Terms of Service',
      lastUpdated: '2024-01-15',
      sections: [
        {
          id: 1,
          heading: 'Acceptance of Terms',
          content:
            'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.',
          isOrdered: false,
          listItems: [],
        },
        {
          id: 2,
          heading: 'Use License',
          content:
            'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.',
          isOrdered: false,
          listItems: [
            'This is the grant of a license, not a transfer of title',
            'Under this license you may not modify or copy the materials',
            'Use the materials for any commercial purpose',
            'Attempt to decompile or reverse engineer any software',
          ],
        },
      ],
    },
    RETURN: {
      type: 'RETURN',
      title: 'Return & Refund Policy',
      lastUpdated: '2024-01-15',
      sections: [
        {
          id: 1,
          heading: 'Return Eligibility',
          content:
            'Items must be returned within 30 days of purchase in their original condition.',
          isOrdered: false,
          listItems: [
            'Items must be unused and in original packaging',
            'Include all accessories and documentation',
            'Items must not be damaged or altered',
            'Custom or personalized items cannot be returned',
          ],
        },
        {
          id: 2,
          heading: 'Refund Process',
          content:
            'Once we receive your returned item, we will inspect it and notify you of the approval or rejection of your refund.',
          isOrdered: true,
          listItems: [
            'Inspection of returned item (1-2 business days)',
            'Approval notification via email',
            'Refund processing (3-5 business days)',
            'Credit appears in original payment method',
          ],
        },
      ],
    },
  });
  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchPolicies() {
      try {
        const response = await fetch(
          'http://localhost:3001/api/v1/ui/legal-documents',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();
        console.log('API Response:', result);

        if (result.success && Array.isArray(result.data)) {
          const formatted = result.data.reduce((acc, doc) => {
            acc[doc.type] = {
              type: doc.type,
              title: doc.title,
              lastUpdated: new Date(doc.lastUpdated)
                .toISOString()
                .split('T')[0],
              sections: doc.sections.map((sec, index) => ({
                id: index + 1,
                heading: sec.heading,
                content: sec.content,
                isOrdered: sec.isOrdered,
                listItems: sec.listItems,
              })),
            };
            return acc;
          }, {});

          setPolicies(formatted);
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    }

    fetchPolicies();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage.');
      return;
    }
    for (const key of Object.keys(policies)) {
      try {
        await fetch('http://localhost:3001/api/v1/ui/legal-documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(policies[key]),
        });
      } catch (error) {
        console.error(`Error saving ${key} policy:`, error);
      }
    }
    console.log('All policies saved.');
  };

  const addSection = (policyType) => {
    const newSection = {
      id: Date.now(),
      heading: 'New Section',
      content: 'Section content goes here...',
      isOrdered: false,
      listItems: [],
    };

    setPolicies((prev) => ({
      ...prev,
      [policyType]: {
        ...prev[policyType],
        sections: [...prev[policyType].sections, newSection],
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    }));
  };

  const updateSection = (policyType, sectionId, field, value) => {
    setPolicies((prev) => ({
      ...prev,
      [policyType]: {
        ...prev[policyType],
        sections: prev[policyType].sections.map((section) =>
          section.id === sectionId ? { ...section, [field]: value } : section,
        ),
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    }));
  };

  const addListItem = (policyType, sectionId) => {
    setPolicies((prev) => ({
      ...prev,
      [policyType]: {
        ...prev[policyType],
        sections: prev[policyType].sections.map((section) =>
          section.id === sectionId
            ? { ...section, listItems: [...section.listItems, 'New list item'] }
            : section,
        ),
      },
    }));
  };

  const updateListItem = (policyType, sectionId, itemIndex, value) => {
    setPolicies((prev) => ({
      ...prev,
      [policyType]: {
        ...prev[policyType],
        sections: prev[policyType].sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                listItems: section.listItems.map((item, index) =>
                  index === itemIndex ? value : item,
                ),
              }
            : section,
        ),
      },
    }));
  };

  const removeListItem = (policyType, sectionId, itemIndex) => {
    setPolicies((prev) => ({
      ...prev,
      [policyType]: {
        ...prev[policyType],
        sections: prev[policyType].sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                listItems: section.listItems.filter(
                  (_, index) => index !== itemIndex,
                ),
              }
            : section,
        ),
      },
    }));
  };

  const getPolicyIcon = (type) => {
    switch (type) {
      case 'PRIVACY':
        return <Shield className="h-5 w-5" />;
      case 'TERMS':
        return <FileText className="h-5 w-5" />;
      case 'RETURN':
        return <RotateCcw className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const currentPolicy = policies[activePolicy];

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
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Policies
              </h1>
              <p className="text-gray-600">
                Manage your store policies and legal documents
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Legal Documents
                  </h1>
                  <p className="text-gray-600">
                    Manage your store's legal policies and terms
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Policy Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Legal Documents
                  </h3>
                  <nav className="space-y-2">
                    {Object.entries(policies).map(([key, policy]) => (
                      <button
                        key={key}
                        onClick={() => setActivePolicy(key)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activePolicy === key
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {getPolicyIcon(policy.type)}
                        <div className="flex-1">
                          <div className="font-medium">{policy.title}</div>
                          <div className="text-xs text-gray-500">
                            Updated: {policy.lastUpdated}
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Policy Editor */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Policy Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={currentPolicy.title}
                        onChange={(e) =>
                          setPolicies((prev) => ({
                            ...prev,
                            [activePolicy]: {
                              ...prev[activePolicy],
                              title: e.target.value,
                            },
                          }))
                        }
                        className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Last updated: {currentPolicy.lastUpdated}
                      </p>
                    </div>
                  </div>

                  {/* Policy Sections */}
                  <div className="p-6">
                    <div className="space-y-6">
                      {currentPolicy.sections.map((section, sectionIndex) => (
                        <div
                          key={section.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <input
                              type="text"
                              value={section.heading}
                              onChange={(e) =>
                                updateSection(
                                  activePolicy,
                                  section.id,
                                  'heading',
                                  e.target.value,
                                )
                              }
                              className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1"
                            />
                            <button
                              onClick={() => {
                                setPolicies((prev) => ({
                                  ...prev,
                                  [activePolicy]: {
                                    ...prev[activePolicy],
                                    sections: prev[
                                      activePolicy
                                    ].sections.filter(
                                      (s) => s.id !== section.id,
                                    ),
                                  },
                                }));
                              }}
                              className="text-red-600 hover:text-red-700 ml-4"
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                          </div>

                          <textarea
                            value={section.content}
                            onChange={(e) =>
                              updateSection(
                                activePolicy,
                                section.id,
                                'content',
                                e.target.value,
                              )
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                            placeholder="Section content..."
                          />

                          {/* List Items */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={section.isOrdered}
                                  onChange={(e) =>
                                    updateSection(
                                      activePolicy,
                                      section.id,
                                      'isOrdered',
                                      e.target.checked,
                                    )
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm text-gray-700">
                                  Ordered list
                                </span>
                              </label>
                              <button
                                onClick={() =>
                                  addListItem(activePolicy, section.id)
                                }
                                className="text-blue-600 hover:text-blue-700 text-sm"
                              >
                                + Add list item
                              </button>
                            </div>

                            {section.listItems.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-gray-500 text-sm w-6">
                                  {section.isOrdered
                                    ? `${itemIndex + 1}.`
                                    : '•'}
                                </span>
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    updateListItem(
                                      activePolicy,
                                      section.id,
                                      itemIndex,
                                      e.target.value,
                                    )
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                  onClick={() =>
                                    removeListItem(
                                      activePolicy,
                                      section.id,
                                      itemIndex,
                                    )
                                  }
                                  className="text-red-600 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Add Section Button */}
                      <button
                        onClick={() => addSection(activePolicy)}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                      >
                        + Add New Section
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
