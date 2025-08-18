"use client"

import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("HOME")
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const hostname = window.location.hostname
        const res = await fetch(`http://${hostname}:3000/api/v1/products/category`)
        const data = await res.json()

        const categoriesArray = Array.isArray(data.data) ? data.data : []

        // Filter only top-level categories (those without a parent)
        const topLevel = categoriesArray.filter(cat => !cat.parent)
        setCategories(topLevel)
      } catch (err) {
        console.error("Failed to fetch categories", err)
      }
    }

    fetchCategories()
  }, [])

  // Update selected category based on URL path when component mounts or location changes
  useEffect(() => {
    const path = location.pathname
    if (path === "/") {
      setSelectedCategory("HOME")
    } else if (path.startsWith("/category/")) {
      const categorySlug = path.split("/category/")[1]
      const matchedCategory = categories.find(cat => cat.slug === categorySlug)
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.name)
      }
    }
  }, [location, categories])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name)
    setIsMenuOpen(false)
    setIsSidebarOpen(false)

    if (category.name === "HOME") {
      navigate("/")
    } else {
      navigate(`/category/${category.slug}`)
    }
  }

  // Add HOME as the first item
  const navItems = [
    { name: "HOME", slug: "" },
    ...categories
  ]

  return (
    <nav className="bg-white border-b border-gray-200 w-full relative">
      <div className="max-w-screen-xl mx-auto px-2">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center py-3">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none flex items-center">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            <span className="ml-2">Categories</span>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center py-2">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.name === "HOME" ? "/" : `/category/${item.slug}`}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === item.name
                    ? "text-green-500 font-semibold"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleCategorySelect(item); // Use the handler instead
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1 border-t border-gray-200">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.name === "HOME" ? "/" : `/category/${item.slug}`}
                className={`block px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                  selectedCategory === item.name
                    ? "text-green-500 font-semibold"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleCategorySelect(item); // Use the handler instead
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Categories</h3>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {navItems.map((category, index) => (
            <Link
              key={category._id || `category-${index}`}
              to={category.name === "HOME" ? "/" : `/category/${category.slug}`}
              className={`block px-3 py-2 rounded-md transition-all duration-200 cursor-pointer transform
                ${
                  selectedCategory === category.name
                    ? "bg-green-100 text-green-700 font-medium"
                    : "hover:bg-gray-100 hover:text-green-500 hover:scale-[1.02]"
                }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleCategorySelect(category); // Use the handler instead
              }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>}
    </nav>
  )
}

export default Navbar