"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Star, StarHalf, Check, Truck, Shield, RotateCcw, ShoppingCart } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { fetchGraphQL } from "../lib/fetchGrap"
import { useCart } from "../context/CartContext"

// Base URL for images
const IMAGE_BASE_URL = "https://media.pixelperfects.in/"

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
      <span className="ml-2 text-sm text-gray-500">({rating})</span>
    </div>
  )
}

// Helper function to calculate discount percentage
const getDiscountPercentage = (originalPrice, currentPrice) => {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100
  return Math.round(discount)
}

// FIXED: Format specifications function to handle your data structure
const formatSpecifications = (specs) => {
  console.log('Raw specifications:', specs); // Debug log
  
  if (!specs) return {}
  
  // Handle case where specs is an array containing objects
  if (Array.isArray(specs)) {
    if (specs.length === 0) return {}
    
    // Check if it's an array of Key/Value objects
    if (specs[0] && specs[0].Key && specs[0].Value) {
      return specs.reduce((acc, spec) => {
        acc[spec.Key] = spec.Value
        return acc
      }, {})
    }
    
    // Handle case where it's an array containing a single object with direct key-value pairs
    if (specs[0] && typeof specs[0] === 'object') {
      return specs[0] // Return the first object directly
    }
  }
  
  // Handle case where specs is already an object
  if (typeof specs === 'object' && !Array.isArray(specs)) {
    return specs
  }
  
  return {}
}

// Helper function to properly format image URLs
const formatImageUrl = (imagePath) => {
  // If the image path is already a full URL or starts with a slash, use it as is
  if (imagePath && (imagePath.startsWith('http') || imagePath.startsWith('/'))) {
    return imagePath
  }
  
  // Otherwise, append it to the base URL
  return `${IMAGE_BASE_URL}${imagePath}`
}

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("features")
  const [relatedProducts, setRelatedProducts] = useState([])

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // Get hostname from window location
        const host = window.location.hostname
        const response = await fetch(`http://${host}:3001/api/v1/products/${slug}`)
        
        if (!response.ok) {
          throw new Error('Product not found')
        }
        
        const result = await response.json()
        
        if (result.success && result.data) {
          // Format the product data
          const productData = {
            ...result.data,
            // Convert image paths to full URLs using the base URL
            images: result.data.images.map(img => formatImageUrl(img)),
            // Format specifications properly - FIXED
            specifications: formatSpecifications(result.data.specifications)
          }
          
          console.log('Processed product data:', productData); // Debug log
          console.log('Processed specifications:', productData.specifications); // Debug log
          
          setProduct(productData)
          // Also fetch related products
          fetchRelatedProducts()
        } else {
          throw new Error('Failed to load product data')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchRelatedProducts = async () => {
      try {
        // Get hostname from window location
        const host = window.location.hostname
        const response = await fetch(`http://${host}:3001/api/v1/products?limit=5&category=${slug.split('-')[0]}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch related products')
        }
        
        const result = await response.json()
        
        if (result.success && result.data) {
          // Filter out the current product and format the data
          const related = result.data
            .filter(p => p.slug !== slug)
            .slice(0, 5)
            .map(p => ({
              ...p,
              // Convert image paths to full URLs using the base URL
              images: p.images ? p.images.map(img => formatImageUrl(img)) : []
            }))
            
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error('Error fetching related products:', err)
        // Don't set error state here as this is not critical
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  if (loading) {
    return <LoadingState />
  }

  if (error || !product) {
    return <ProductNotFound onBackToProducts={() => navigate("/")} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          {/* <Breadcrumb product={product} onNavigateHome={() => navigate("/")} onNavigateProducts={() => navigate("/")} /> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <ProductImages product={product} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

            {/* Product Details */}
            <ProductInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          {/* Product Details Tabs */}
          <ProductTabs product={product} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Related Products */}
          <RelatedProducts
            relatedProducts={relatedProducts}
            onViewDetails={(productSlug) => {
              navigate(`/product/${productSlug}`)
              setQuantity(1)
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
          />
        </div>
      </main>
    </div>
  )
}

// Loading State Component
function LoadingState() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
    </div>
  )
}

// Product Not Found Component
function ProductNotFound({ onBackToProducts }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-4">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={onBackToProducts}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Back to Products
        </button>
      </div>
    </div>
  )
}

// Breadcrumb Component
function Breadcrumb({ product, onNavigateHome, onNavigateProducts }) {
  return (
    <div className="text-sm text-gray-500 mb-6">
      <button onClick={onNavigateHome} className="hover:text-green-500">
        Home
      </button>
      <span className="mx-2">/</span>
      <button onClick={onNavigateProducts} className="hover:text-green-500">
        Products
      </button>
      <span className="mx-2">/</span>
      <span className="font-medium text-gray-700">{product.name}</span>
    </div>
  )
}

// Product Images Component
function ProductImages({ product, selectedImage, onSelectImage }) {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-80 md:h-96 rounded-lg bg-white border border-gray-200">
        <img
          src={product.images && product.images.length > 0 
            ? product.images[selectedImage] 
            : "/api/placeholder/400/400"}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] lg:text-sm font-bold px-2 py-1 rounded shadow-sm">
            {getDiscountPercentage(product.originalPrice, product.price)}% OFF
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {product.images && product.images.length > 0 && (
        <div className="flex justify-center space-x-3 overflow-x-auto py-2 px-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0
              ${
                selectedImage === index
                  ? "ring-2 ring-green-500 ring-offset-2"
                  : "border border-gray-200 hover:ring-1 hover:ring-gray-300"
              }`}
              style={{ padding: "1px" }}
              onClick={() => onSelectImage(index)}
              aria-label={`View ${product.name} image ${index + 1}`}
            >
              <div className="relative w-full h-full">
                <img
                  src={image || "/api/placeholder/80/80"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Product Information Component
function ProductInfo({ product, quantity, setQuantity}) {
  // Add state to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   const navigate = useNavigate()
  const { addToCart, setItemInCart } = useCart() // Use the cart context
  
  // Check for authentication token on component mount
  useEffect(() => {
    const phonepe = async () => {
      const query = `query StoreData {
            phonepeStatus {
              isActive
    }}
`
    const hostname = window.location.hostname
    const response = await fetchGraphQL( hostname, query)
    console.log(response)
    if (response.phonepeStatus.isActive === true) {
      setIsAuthenticated(true)
    }
    else {
      setIsAuthenticated(false)
    }
  }
    phonepe()
  }, []);

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart(product, quantity)
  };

  // Buy now handler - FIXED VERSION
  const handleBuyNow = () => {
    // Use setItemInCart to set exact quantity instead of adding
    setItemInCart(product, quantity);
    // Navigate to cart page
    navigate("/cart"); 
  }

  // Login redirect handler
  const handleLoginRedirect = () => {
    // Save current product to local storage for redirect back after login
    localStorage.setItem('redirectAfterLogin', `/product/${product.slug}`);
    // Navigate to login page - assuming you have useNavigate from react-router
    // Use window.location if you don't have access to useNavigate
    window.location.href = '/login';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <div className="flex items-center mt-2">
          <StarRating rating={product.rating || 0} />
          <span className="ml-4 text-sm text-gray-500">SKU: {product.sku}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center">
        <span className="text-3xl font-bold text-green-600">₹{product.price.toFixed(2)}</span>
        {product.originalPrice > product.price && (
          <>
            <span className="ml-3 text-lg text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
            <span className="ml-3 bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2 py-1 rounded-md">
              {getDiscountPercentage(product.originalPrice, product.price)}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center">
        {product.stock > 0 ? (
          <>
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">In Stock</span>
            <span className="text-sm text-gray-500 ml-2">({product.stock} available)</span>
          </>
        ) : (
          <span className="text-red-500 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Product Description */}
      <p className="text-gray-500">{product.description}</p>

      {/* Quantity Selection */}
      {isAuthenticated && (
        <div className="flex items-center space-x-2">
          <label htmlFor="quantity" className="text-base font-medium">
            Quantity:
          </label>
          <div className="flex items-center border rounded-md">
            <button
              className="px-3 py-1 border-r hover:bg-gray-100"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={product.stock <= 0}
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              className="px-3 py-1 border-l hover:bg-gray-100"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={product.stock <= 0 || quantity >= product.stock}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Add to Cart Button - Only shown when authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-xl transition-colors"
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        )}

        {/* Buy Now Button - Only shown when authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleBuyNow}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
            disabled={product.stock <= 0}
          >
            Buy Now
          </button>
        )}

        {/* WhatsApp Enquiry Button - Always shown */}
        <a
          href={`https://wa.me/918551932837?text=Hello! I'm interested in "${product.name}" (Price: ₹${product.price}). Please provide more details.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          <FaWhatsapp className="h-5 w-5" />
          WhatsApp Enquiry
        </a>
      </div>

      {/* Extra Information */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div className="flex items-center">
          <Truck className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm">Free shipping over ₹999</span>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm">2-Year Warranty</span>
        </div>
        <div className="flex items-center">
          <RotateCcw className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm">30-Day Returns</span>
        </div>
      </div>
    </div>
  )
}

// Product Tabs Component - FIXED Specifications rendering
function ProductTabs({ product, activeTab, setActiveTab }) {
  return (
    <div className="mt-12">
      {/* Custom Tabs */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-2 w-full">
          <button
            onClick={() => setActiveTab("features")}
            className={`py-2 text-center font-medium transition-colors
              ${
                activeTab === "features"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`py-2 text-center font-medium transition-colors
              ${
                activeTab === "specifications"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Specifications
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 border border-t-0 rounded-b-md mt-0">
        {/* Features Tab */}
        {activeTab === "features" && (
          <div>
            <h3 className="text-lg font-medium mb-4">Key Features</h3>
            {product.features && product.features.length > 0 ? (
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No features listed for this product.</p>
            )}
          </div>
        )}

        {/* Specifications Tab - FIXED */}
        {activeTab === "specifications" && (
          <div>
            <h3 className="text-lg font-medium mb-2">Technical Specifications</h3>
            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index}>
                    <div className="grid grid-cols-3 py-2">
                      <div className="font-medium text-gray-700">{key}</div>
                      <div className="col-span-2 text-gray-600">{value}</div>
                    </div>
                    {index < Object.entries(product.specifications).length - 1 && (
                      <div className="h-px bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available for this product.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Related Products Component
function RelatedProducts({ relatedProducts, onViewDetails }) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null
  }

  return (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
    
    {/* Responsive grid with equal height cards */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-fr">
      {relatedProducts.map((relatedProduct) => (
        <div
          key={relatedProduct.id}
          onClick={() => onViewDetails(relatedProduct.slug)}
          className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
        >
          {/* Image container with fixed aspect ratio */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <img
              src={
                relatedProduct.images && relatedProduct.images.length > 0
                  ? relatedProduct.images[0]
                  : "/api/placeholder/400/400"
              }
              alt={relatedProduct.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {relatedProduct.originalPrice > relatedProduct.price && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                {getDiscountPercentage(relatedProduct.originalPrice, relatedProduct.price)}% OFF
              </div>
            )}
          </div>

          {/* Content container that fills remaining space */}
          <div className="p-3 flex flex-col flex-grow">
            {/* Product name with consistent height */}
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 flex-grow">
              {relatedProduct.name}
            </h4>

            {/* Rating section */}
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(relatedProduct.rating || 0)
                        ? 'fill-current'
                        : i < (relatedProduct.rating || 0)
                        ? 'fill-current opacity-50'
                        : 'text-gray-300 fill-current'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({relatedProduct.rating?.toFixed(1) || '0.0'})
              </span>
            </div>
            
            {/* Price section at bottom */}
            <div className="mt-auto">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-lg font-bold text-gray-900">
                  ₹{relatedProduct.price.toFixed(2)}
                </span>
                {relatedProduct.originalPrice > relatedProduct.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{relatedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}