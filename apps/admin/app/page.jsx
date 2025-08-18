"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "./components/navbar"
import Sidebar from "./components/sidebar"
import Dashboard from "./pages/dashboard"

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // ✅ Check if token comes from URL params
    const urlToken = searchParams.get("token")

    if (urlToken) {
      localStorage.setItem("token", urlToken) // save in localStorage
    }

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token")

    if (!token) {
      // If no token, redirect
      window.location.href = "https://account.bizonance.com"
    }
  }, [searchParams])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar isOpen={sidebarOpen} />
        <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
        <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
          <div className="p-6">
            <Dashboard />
          </div>
        </main>
      </div>
  )
}
