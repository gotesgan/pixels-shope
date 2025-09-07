import React, { useState, useEffect } from 'react';
import { fetchGraphQL } from '../lib/fetchGrap';

// GraphQL query for FAQs
const FAQ_QUERY = `
  query Faq {
    faq {
      id
      question
      answer
      storeId
      category
      createdAt
      updatedAt
    }
  }
`;

// Direct GraphQL fetch function specifically for the pixel endpoint
const fetchFaqs = async () => {
  try {

    const hostname = window.location.hostname
    const response = await fetchGraphQL(hostname, FAQ_QUERY)

    if (response.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL query failed');
    }

    const data = response.faq || [];
    console.log('Fetched FAQs:', data);

    return data;

  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

const FAQ = ({ 
  initialFaqs = null,
  customCategories = null,
  storeId = null 
}) => {
  const [faqs, setFaqs] = useState(initialFaqs || []);
  const [loading, setLoading] = useState(!initialFaqs);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});
  const [categories, setCategories] = useState([]);

  // Fetch FAQs data if not provided as props
  useEffect(() => {
    if (!initialFaqs) {
      fetchFaqData();
    }
  }, [initialFaqs, storeId]);

  // Parse timestamp to date format
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    // Check if timestamp is in milliseconds (13 digits as string)
    const date = /^\d{13}$/.test(timestamp)
      ? new Date(parseInt(timestamp))
      : new Date(timestamp);
    
    return isNaN(date.getTime()) 
      ? 'Unknown date' 
      : date.toLocaleDateString('en-IN');
  };

  // Extract categories from FAQ data
  useEffect(() => {
    if (customCategories) {
      setCategories(customCategories);
    } else if (faqs.length > 0) {
      const uniqueCategories = [...new Set(faqs.map(faq => faq.category))].filter(Boolean);
      setCategories(uniqueCategories);
    }
  }, [faqs, customCategories]);

  const fetchFaqData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchFaqs();
      
      if (Array.isArray(data)) {
        let faqData = data;
        
        // Filter by storeId if provided
        if (storeId) {
          faqData = faqData.filter(faq => faq.storeId === storeId);
        }
        
        setFaqs(faqData);
      } else {
        throw new Error('Invalid FAQ data structure');
      }
    } catch (err) {
      console.error('Error in FAQ component:', err);
      setError(err.message || 'Failed to fetch FAQ data');
    } finally {
      setLoading(false);
    }
  };

  // Toggle FAQ item open/closed state
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'all' || 
      faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-600 bg-red-100 rounded-lg">
        Error loading FAQ data: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <svg 
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Items */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => toggleItem(faq.id)}
                aria-expanded={openItems[faq.id]}
              >
                <h3 className="font-medium text-gray-900">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openItems[faq.id] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {openItems[faq.id] && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                  
                  {/* Additional metadata */}
                  {faq.updatedAt && (
                    <p className="mt-2 text-sm text-gray-500">
                      Last updated: {formatDate(faq.updatedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No FAQs found matching your search criteria.</p>
          {searchQuery && (
            <button 
              className="mt-2 text-blue-600 hover:text-blue-800"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQ;

// Example usage:
/*
// Basic usage with fixed endpoint
<FAQ />

// Use with initial data (SSR)
<FAQ initialFaqs={prefetchedFaqs} />

// Filter by store ID
<FAQ storeId="cmaqsrcav0002ueakwz2twxjj" />

// Use with custom categories
<FAQ customCategories={["shipping", "payment", "products"]} />
*/