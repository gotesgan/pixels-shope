"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, Package, TrendingUp, Upload, X } from "lucide-react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(() => {
    // Initialize formData from localStorage if available
    const savedData = localStorage.getItem("productFormData")
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          description: "",
          price: "",
          originalPrice: "",
          stock: "",
          category: "",
          sku: "",
          rating: "",
          features: [],
          specifications: {},
          images: [],
          badges: [],
        }
  })

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3001/api/v1/products/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw new Error("Failed to fetch products")

      const data = await response.json()
      console.log("Fetched products:", data.data)

      let productsArray = []
      if (Array.isArray(data.data)) {
        productsArray = data.data
      } else if (Array.isArray(data.products)) {
        productsArray = data.products
      }

      setProducts(productsArray)
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/products/categorys", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw new Error("Failed to fetch categories")

      const result = await response.json()
      console.log("Fetched categories:", result)

      if (result && Array.isArray(result.data)) {
        setCategories(result.data)
      } else {
        console.error("Unexpected API response format:", result)
        setCategories([])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
    }
  }

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("productFormData", JSON.stringify(formData))
  }, [formData])

  // Fetch products and categories on mount
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()

    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "images" && key !== "features" && key !== "specifications" && key !== "badges") {
        formDataToSend.append(key, formData[key])
      }
    })

    // Append features as JSON array
    formDataToSend.append("features", JSON.stringify(formData.features))

    // Append specifications as JSON object
    formDataToSend.append("specifications", JSON.stringify(formData.specifications))

    // Append badges as JSON array
    formDataToSend.append("badges", JSON.stringify(formData.badges))

    // Append images
    formData.images.forEach((image) => {
      formDataToSend.append("image", image)
    })

    try {
      const url = editingProduct
        ? `http://localhost:3001/api/v1/products/${editingProduct._id}`
        : "http://localhost:3001/api/v1/products/"
      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        fetchProducts()
        setShowAddModal(false)
        setEditingProduct(null)
        // Reset formData and clear localStorage
        const defaultFormData = {
          name: "",
          description: "",
          price: "",
          originalPrice: "",
          stock: "",
          category: "",
          sku: "",
          rating: "",
          features: [],
          specifications: {},
          images: [],
          badges: [],
        }
        setFormData(defaultFormData)
        localStorage.setItem("productFormData", JSON.stringify(defaultFormData))
      } else {
        const result = await response.json()
        console.error("Error saving product:", result.error || "Unknown error")
      }
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  // Delete product
  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/products/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (response.ok) {
          fetchProducts()
        }
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
  }

  // Remove image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const updateFeature = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const addSpecification = () => {
    const key = prompt("Enter specification key:")
    if (key) {
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [key]: "" },
      }))
    }
  }

  const updateSpecification = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }))
  }

  const removeSpecification = (key) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  // Handle badge toggle
  const toggleBadge = (badge) => {
    setFormData((prev) => {
      const badges = prev.badges.includes(badge) ? prev.badges.filter((b) => b !== badge) : [...prev.badges, badge]
      return { ...prev, badges }
    })
  }

  // Handle editing product
  const handleEditProduct = (product) => {
    const savedData = localStorage.getItem("productFormData")
    const localFormData = savedData ? JSON.parse(savedData) : {}
    setEditingProduct(product)
    setFormData({
      name: product.name || localFormData.name || "",
      description: product.description || localFormData.description || "",
      price: product.price || localFormData.price || "",
      originalPrice: product.originalPrice || localFormData.originalPrice || "",
      stock: product.stock || localFormData.stock || "",
      category: product.category?.name || product.category || localFormData.category || "",
      sku: product.sku || localFormData.sku || "",
      rating: product.rating || localFormData.rating || "",
      features: product.features || localFormData.features || [],
      specifications: product.specifications || localFormData.specifications || {},
      images: localFormData.images || [], // Preserve unsaved images
      badges: product.badges || localFormData.badges || [],
    })
    setShowAddModal(true)
  }

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const categoryName = product.category?.name || product.category || ""
        const matchesSearch =
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
          selectedCategory === "all" || categoryName.toLowerCase() === selectedCategory.toLowerCase()
        return matchesSearch && matchesCategory
      })
    : []

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  // ProductBadgeStrip component
  const ProductBadgeStrip = () => {
    const availableBadges = [
      "1 Year Warranty",
      "7 Day Return",
      "Free Installation",
      "Certified Refurbished",
      "Eco-Friendly",
    ]

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Product Badges</label>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableBadges.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => toggleBadge(badge)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                formData.badges.includes(badge)
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {badge}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // The rest of your component (JSX) remains unchanged
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
        <div className="p-6">
          <div className="space-y-8">
            {/* ... rest of your JSX ... */}
            {/* Update the Edit buttons to use handleEditProduct */}
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.images?.[0]
                        ? `https://media.pixelperfects.in/${product.images[0]}`
                        : "/placeholder.svg?height=200&width=200"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status || "Active"}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-600">({product.reviews || 0})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>

                  {/* SKU and Category */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span className="font-medium">SKU: {product.sku || "N/A"}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg text-xs">{product.category.name}</span>
                  </div>

                  {/* Stock */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600 font-medium">Stock:</span>
                    <span
                      className={`text-sm font-bold ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock < 20
                            ? "text-orange-600"
                            : "text-green-600"
                      }`}
                    >
                      {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Edit Product
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* ... rest of your JSX ... */}
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProduct(null)
                    const defaultFormData = {
                      name: "",
                      description: "",
                      price: "",
                      originalPrice: "",
                      stock: "",
                      category: "",
                      sku: "",
                      rating: "",
                      features: [],
                      specifications: {},
                      images: [],
                      badges: [],
                    }
                    setFormData(defaultFormData)
                    localStorage.setItem("productFormData", JSON.stringify(defaultFormData))
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            {/* ... rest of your modal JSX ... */}
          </div>
        </div>
      )}
    </div>
  )
}