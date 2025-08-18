"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Eye, Package, Grid, X } from "lucide-react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function CategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    image: null,
  })

  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWI2N2RoMW4wMDAwdWVsd25zcTRweXd3Iiwic3RvcmVJZCI6ImNtYjY3cW0yMTAwMDJ1ZWx3cWhiaDh5NG0iLCJpYXQiOjE3NDg2OTY0NTYsImV4cCI6MTc0OTMwMTI1Nn0.cBumhck2Nhusz-ZPeHC4mBPwyZqFFx7QsRx_9n1lL3M";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/products/category", {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const data = await response.json();
    
    // Ensure we're working with an array
    if (Array.isArray(data)) {
      setCategories(data);
    } else if (data && Array.isArray(data.categories)) {
      // Handle case where response is an object with categories array
      setCategories(data.categories);
    } else {
      // Handle unexpected response format
      console.error('Unexpected API response format:', data);
      setCategories([]);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    setCategories([]);
  } finally {
    setLoading(false);
  }
};

  // Create or update category
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    let requestBody;
    let headers = {
      "Authorization": `Bearer ${AUTH_TOKEN}`
    };

    if (formData.image) {
      // If there's an image, use FormData
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (formData.parentCategory) {
        formDataToSend.append("parentCategory", formData.parentCategory);
      }
      formDataToSend.append("image", formData.image);
      
      requestBody = formDataToSend;
      // Don't set Content-Type header when using FormData - browser will set it automatically
    } else {
      // No image - send as JSON
      requestBody = JSON.stringify({
        name: formData.name,
        description: formData.description,
        parentCategory: formData.parentCategory || null
      });
      headers["Content-Type"] = "application/json";
    }

    const url = editingCategory 
      ? `http://localhost:4000/api/v1/products/category/${editingCategory.id}` 
      : "http://localhost:4000/api/v1/products/category";

    const response = await fetch(url, {
      method: editingCategory ? "PUT" : "POST",
      headers: headers,
      body: requestBody
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      // Add user-friendly error handling here
      return;
    }

    // Success handling
    fetchCategories();
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      parentCategory: "",
      image: null,
    });

  } catch (error) {
    console.error("Network Error:", error);
    // Add user-friendly error handling here
  }
};

  // Delete category
  const handleDelete = async (categoryId) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/products/category/${categoryId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          },
        })
        if (response.ok) {
          fetchCategories()
        }
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const filteredCategories = Array.isArray(categories) 
  ? categories.filter((category) => {
      const matchesSearch =
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
  : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar isOpen={sidebarOpen} />
        <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
        <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
        <div className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Categories Management</h1>
                  <p className="text-gray-600">Organize your products with categories and subcategories</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{categories.length}</div>
                  <div className="text-sm text-blue-600">Total Categories</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {categories.filter((c) => c.status === "Active").length}
                  </div>
                  <div className="text-sm text-green-600">Active Categories</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">
                    {categories.reduce((sum, c) => sum + (c.productCount || 0), 0)}
                  </div>
                  <div className="text-sm text-purple-600">Total Products</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-700">
                    {categories.filter((c) => c.parentCategory).length}
                  </div>
                  <div className="text-sm text-orange-600">Subcategories</div>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Category Image */}
                  <div className="relative">
                    <img
                      src={category.image || "/placeholder.svg?height=150&width=150"}
                      alt={category.name}
                      className="w-full h-40 object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category.status || "Active"}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingCategory(category)
                          setFormData({
                            name: category.name || "",
                            description: category.description || "",
                            parentCategory: category.parentCategory || "",
                            image: null,
                          })
                          setShowAddModal(true)
                        }}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>{category.productCount || 0}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                    {/* Parent Category */}
                    {category.parentCategory && (
                      <div className="mb-4">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          Subcategory of {category.parentCategory}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingCategory(category)
                          setFormData({
                            name: category.name || "",
                            description: category.description || "",
                            parentCategory: category.parentCategory || "",
                            image: null,
                          })
                          setShowAddModal(true)
                        }}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Manage Category
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        View Products
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600 mb-4">Create your first category to organize your products</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Category
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Category Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingCategory(null)
                      setFormData({
                        name: "",
                        description: "",
                        parentCategory: "",
                        image: null,
                      })
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Category (Optional)</label>
                  <select
  value={formData.parentCategory}
  onChange={(e) => setFormData((prev) => ({ ...prev, parentCategory: e.target.value }))}
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
  <option value="">None (Main Category)</option>
  {Array.isArray(categories) && categories
    .filter((c) => !c.parentCategory && c.id !== editingCategory?.id)
    .map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
</select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingCategory(null)
                      setFormData({
                        name: "",
                        description: "",
                        parentCategory: "",
                        image: null,
                      })
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCategory ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
