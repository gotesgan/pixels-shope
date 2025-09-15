'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function FAQPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.',
      category: 'Returns & Refunds',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: 2,
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days delivery.',
      category: 'Shipping',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
    },
    {
      id: 3,
      question: 'Do you offer international shipping?',
      answer:
        'Currently, we only ship within India. We are working on expanding our shipping to international locations.',
      category: 'Shipping',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
    },
    {
      id: 4,
      question: 'How can I track my order?',
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the courier's website.",
      category: 'Orders',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12',
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, PhonePe, and cash on delivery for eligible orders.',
      category: 'Payment',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-11',
    },
  ]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`https://api.pixelperfects.in/api/v1/ui/faqs`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch FAQs');
        const data = await response.json();
        console.log('Fetched FAQs:', data);

        // Set state with the array returned by the API
        setFaqs(data.data || []);
      } catch (error) {
        console.error(error);
        alert('Error fetching FAQs');
      }
    };

    fetchFaqs();
  }, []);

  //handle delete
  const handleDelete = async (id) => {
    try {
      // Example API call
      console.log('Deleting FAQ with id:', id);
      const response = await fetch(
        `https://api.pixelperfects.in/api/v1/ui/faqs/${id}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) throw new Error('Failed to delete FAQ');

      // Update state to remove deleted FAQ
      setFaqs(faqs.filter((faq) => faq.id !== id));

      alert('FAQ deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error deleting FAQ');
    }
  };

  const handleSave = async (faq) => {
    try {
      // Example API call
      console.log('Saving FAQ:', faq);
      const response = await fetch(`https://api.pixelperfects.in/api/v1/ui/faqs`, {
        method: 'post',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
      });

      if (!response.ok) throw new Error('Failed to save FAQ');

      // Optionally update state if API returns updated FAQ
      const updatedFaq = await response.json();
      setFaqs(faqs.map((f) => (f.id === updatedFaq.id ? updatedFaq : f)));

      alert('FAQ saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving FAQ');
    }
  };

  const categories = [
    'all',
    'Returns & Refunds',
    'Shipping',
    'Orders',
    'Payment',
    'Account',
    'Products',
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFaq = (id) => setExpandedFaq(expandedFaq === id ? null : id);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || faq?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addNewFaq = () => {
    const newFaq = {
      question: 'New FAQ Question',
      answer: 'New FAQ Answer',
      category: 'General',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setFaqs([...faqs, newFaq]);
  };

  const deleteFaq = (id) => setFaqs(faqs.filter((faq) => faq.id !== id));

  const updateFaq = (id, field, value) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id
          ? {
              ...faq,
              [field]: value,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : faq,
      ),
    );
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
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                FAQ Management
              </h1>
              <p className="text-gray-600">Manage frequently asked questions</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    FAQ Management
                  </h1>
                  <p className="text-gray-600">
                    Manage frequently asked questions and answers
                  </p>
                </div>
                <button
                  onClick={addNewFaq}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {faqs.length}
                  </div>
                  <div className="text-sm text-blue-600">Total FAQs</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {categories.length - 1}
                  </div>
                  <div className="text-sm text-green-600">Categories</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">
                    {faqs.filter((f) => f.category === 'Shipping').length}
                  </div>
                  <div className="text-sm text-purple-600">Shipping FAQs</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-700">
                    {
                      faqs.filter(
                        (f) =>
                          f.updatedAt ===
                          new Date().toISOString().split('T')[0],
                      ).length
                    }
                  </div>
                  <div className="text-sm text-orange-600">Updated Today</div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs?.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {faq.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            Updated: {faq.updatedAt}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            updateFaq(faq.id, 'question', e.target.value)
                          }
                          className="w-full text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                        />
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {expandedFaq === faq.id && (
                      <div className="p-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category
                            </label>
                            <select
                              value={faq.category}
                              onChange={(e) =>
                                updateFaq(faq.id, 'category', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {categories.slice(1).map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Answer
                            </label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) =>
                                updateFaq(faq.id, 'answer', e.target.value)
                              }
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter the answer to this FAQ..."
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleSave(faq)}
                              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Save className="h-4 w-4" />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedFaq !== faq.id && (
                      <div className="p-6 pt-0">
                        <p className="text-gray-600 line-clamp-2">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {filteredFaqs.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="h-12 w-12 text-gray-400 mx-auto mb-4">?</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No FAQs found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first FAQ to help customers find answers quickly
                  </p>
                  <button
                    onClick={addNewFaq}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create First FAQ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
