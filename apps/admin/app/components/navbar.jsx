'use client';

import { useEffect, useState } from "react";
import { Menu, LogOut, Bell, Search, User, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar({ toggleSidebar, sidebarOpen }) {
  const router = useRouter();
  const [storeData, setStoreData] = useState(null);

  // Fetch store info with auth token
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No auth token found, redirecting to login...");
          router.push("/login");
          return;
        }

        const res = await fetch("http://localhost:3001/api/v1/store/store-info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStoreData(data.store);
        } else {
          console.error("Failed to fetch store info");
          if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
          }
        }
      } catch (err) {
        console.error("Error fetching store info:", err);
      }
    };

    fetchStoreInfo();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!storeData) return null;

  const { storeInfo, owner, domain } = storeData;

  return (
    <nav
      className={`bg-white shadow-lg border-b border-gray-200 fixed top-0 z-50 transition-all duration-300 ${
        sidebarOpen ? "left-64" : "left-16"
      } right-0`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Toggle and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-3">
              <img
                src="https://media.pixelperfects.in/pixelperfect03.png"
                alt="Pixel Logo"
                className="w-10 h-10 rounded-xl drop-shadow-md object-cover"
              />

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  {storeInfo?.name}
                </h1>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile with Owner */}
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${storeInfo?.colour || "#6366f1"}, #9333ea)`,
                }}
              >
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {owner?.name}
                </p>
                <p className="text-xs text-gray-500">{owner?.email}</p>
              </div>
            </div>

            {/* View Store Button */}
            <a
              href={`http://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">
                View Store
              </span>
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
