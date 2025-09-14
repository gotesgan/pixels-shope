'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

useEffect(() => {
  const updateToken = () => {
    const urlToken = searchParams.get('token'); // get token from URL

    if (urlToken) {
      // ✅ Always update localStorage with URL token
      localStorage.setItem('token', urlToken);
      console.log('Token updated:', urlToken);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'http://localhost:5173'; // redirect if no token
    }
  };

  updateToken();
}, [searchParams]); // runs whenever search params change

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
