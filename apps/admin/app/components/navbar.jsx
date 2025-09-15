'use client';

import { useEffect, useState, useCallback } from 'react';
import { Menu, LogOut, Bell, Search, User, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

export default function Navbar({ toggleSidebar, sidebarOpen }) {
  const router = useRouter();
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch store info with auth token
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
  if (err.message === 'Unauthorized') {
    localStorage.removeItem('token');
    // Redirect to external login
    window.location.href = "https://accounts.pixelperfects.in/";
  }


        const res = await fetch('https://api.pixelperfects.in/api/v1/store/store-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStoreData(data.store);
        } else {
          throw new Error(res.status === 401 ? 'Unauthorized' : 'Failed to fetch store info');
        }
      } catch (err) {
        console.error('Error fetching store info:', err);
        setError(err.message || 'An error occurred');
     if (err.message === 'Unauthorized') {
    localStorage.removeItem('token');
    // Redirect to external login
    window.location.href = "https://accounts.pixelperfects.in/";
  }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreInfo();
  }, [router]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value) => {
      console.log('Searching for:', value);
      // Implement search logic here
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

const handleLogout = () => {
  localStorage.removeItem('token');
  // Redirect to external login
  window.location.href = "https://accounts.pixelperfects.in/";
};

  if (isLoading) {
    return (
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 h-16 z-50">
        <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
        </div>
      </nav>
    );
  }

  if (error || !storeData) {
    return (
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 h-16 z-50">
        <div className="px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <p className="text-red-600">Error: {error || 'No store data available'}</p>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    );
  }

  const { storeInfo, owner, domain } = storeData;

  return (
    <nav
      className={`bg-white shadow-lg border-b border-gray-200 fixed top-0 h-16 z-50 transition-left duration-300 ease-in-out ${
        sidebarOpen ? 'left-64' : 'left-16'
      } right-0 md:left-62`} // Adjusted left values to match Sidebar widths
    >
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left side - Toggle and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-3">
              <img
                src="https://media.pixelperfects.in/pixelperfect03.png"
                alt="Pixel Logo"
                className="w-10 h-10 rounded-xl drop-shadow-md object-cover"
                loading="lazy"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">{storeInfo?.name}</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile with Owner */}
            <div className="flex items-center space-x-3" aria-label="User profile">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${storeInfo?.colour || '#6366f1'}, #9333ea)`,
                }}
              >
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{owner?.name}</p>
                <p className="text-xs text-gray-500">{owner?.email}</p>
              </div>
            </div>

            {/* View Store Button */}
            <a
              href={`http://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="View store"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">View Store</span>
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}