"use client"

import { useState, useEffect } from "react"
import { Star, StarHalf } from "lucide-react"

// Star Rating Component
const StarRating = ({ rating }) => {
  const rating_value = parseFloat(rating) || 0
  const fullStars = Math.floor(rating_value)
  const hasHalfStar = rating_value % 1 !== 0

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm text-gray-500">({rating_value.toFixed(1)})</span>
    </div>
  )
}

// Helper function to calculate discount percentage
const getDiscountPercentage = (originalPrice, currentPrice) => {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100
  return Math.round(discount)
}

// Group products by category
const groupProductsByCategory = (products) => {
  return products.reduce((acc, product) => {
    const categoryName = product.category?.name || "Uncategorized"
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(product)
    return acc
  }, {})
}

export default function DynamicProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Extract category from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [])

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const host = window.location.hostname
        const response = await fetch(`http://${host}:3000/api/v1/products/`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data)
        } else {
          throw new Error("Invalid data format")
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    // Update URL without page reload
    const url = new URL(window.location)
    if (category === "All") {
      url.searchParams.delete("category")
    } else {
      url.searchParams.set("category", category)
    }
    window.history.pushState({}, "", url)
  }

  // Handle product click
  const handleProductClick = (slug) => {
    window.location.href = `/product/${slug}`
  }

  if (loading) {
    return (
      <div className="py-10 px-4 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10 px-4 text-center">
        <div className="max-w-6xl mx-auto bg-red-50 p-4 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-700">Error loading products</h2>
          <p className="text-red-600 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const groupedProducts = groupProductsByCategory(products)
  const categories = Object.keys(groupedProducts)

  if (products.length === 0) {
    return (
      <div className="py-10 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-gray-600 mt-2">Please check back later for new products.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Our Products</h2>

        {/* Category filters */}
        {/* <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "All"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Display products by category */}
        {selectedCategory === "All" ? (
          categories.map((category) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
              <h3 className="text-2xl font-semibold mb-4">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center sm:justify-items-stretch">
                {groupedProducts[category].map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onViewDetails={() => handleProductClick(product.slug)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{selectedCategory}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center sm:justify-items-stretch">
              {groupedProducts[selectedCategory]?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onViewDetails={() => handleProductClick(product.slug)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Product Card Component
function ProductCard({ product, onViewDetails }) {
  const imageUrl = product?.image
    ? `https://media.bizonance.in/api/v1/image/download/473d09b1-bd47-4297-9b0c-f79e6a7c9fc8/META/${product.image}`
    : "/placeholder.svg";

  return (
    <div onClick={onViewDetails} className="cursor-pointer w-full">
      <div
        className="w-full h-full flex flex-col justify-between 
          rounded-xl border border-gray-200 bg-white
          shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)]
          hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15),_0_10px_10px_-5px_rgba(0,0,0,0.1)]
          transition-all duration-300 transform hover:-translate-y-1
          overflow-hidden relative z-10 
          min-h-[320px]"
      >
        {/* Image Section */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {product.originalPrice > product.price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {getDiscountPercentage(product.originalPrice, product.price)}% OFF
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1">
          <div className="px-3 pt-3 pb-1">
            <h3 className="text-base font-semibold line-clamp-2">{product.name}</h3>
          </div>

          <div className="px-3 pt-0 pb-1">
            <StarRating rating={product.rating} />
          </div>

          <div className="px-3 pb-3 pt-1 mt-auto flex flex-col">
            <div className="flex items-center justify-start mb-2 w-full">
              <p className="font-medium text-green-600 text-base">₹{product.price?.toFixed(2)}</p>
              {product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice?.toFixed(2)}</p>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-xs text-orange-500">Only {product.stock} left in stock</p>
            )}
            {product.stock === 0 && (
              <p className="text-xs text-red-500">Out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}