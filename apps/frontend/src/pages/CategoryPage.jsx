"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Star, StarHalf } from "lucide-react"

// Base URL for images
const IMAGE_BASE_URL = "https://media.pixelperfects.in/"

// Helper function to properly format image URLs
const formatImageUrl = (imagePath) => {
  // If the image path is already a full URL or starts with a slash, use it as is
  if (imagePath && (imagePath.startsWith('http') || imagePath.startsWith('/'))) {
    return imagePath
  }
  
  // Otherwise, append it to the base URL
  return `${IMAGE_BASE_URL}${imagePath}`
}

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm text-gray-500">({rating})</span>
    </div>
  )
}

// Helper function to calculate discount percentage
const getDiscountPercentage = (originalPrice, currentPrice) => {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100
  return Math.round(discount)
}

// Product Card Component
function ProductCard({ product, onViewDetails }) {
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
            src={formatImageUrl(product.image) || "/placeholder.svg"}
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
            <StarRating rating={product.rating || 4.5} />
          </div>

          <div className="px-3 pb-3 pt-1 mt-auto flex flex-col">
            <div className="flex items-center justify-start mb-2 w-full">
              <p className="font-medium text-green-600 text-base">₹{product.price.toFixed(2)}</p>
              {product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CategoryPage() {

  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  console.log("Fetching products for category:")

const slug = window.location.pathname.split("/").pop()


  useEffect(() => {
console.log("hit")
    const fetchProductsByCategory = async () => {
     console.log("hit")
      

      try {
        const hostname = window.location.hostname
        console.log("Hostname:", hostname)
        const url = `http://${hostname}:3001/api/v1/products/category/${slug}`

        const res = await fetch(url)
        const data = await res.json()
        console.log("Fetched products:", data)

        if (data.success) {
          setFilteredProducts(data.data)
        } else {
          setFilteredProducts([])
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProductsByCategory()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const displayCategory = slug ? slug.toUpperCase() : ""

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{displayCategory}</h1>
          <p className="text-gray-500 mt-2">
            Discover our range of {displayCategory.toLowerCase()} products designed for your needs
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onViewDetails={() => navigate(`/product/${product.slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">We couldn't find any products in this category.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
