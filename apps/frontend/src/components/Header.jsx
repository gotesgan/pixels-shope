"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiUser } from "react-icons/fi"
import { fetchGraphQL } from "../lib/fetchGrap"
import CartIcon from "./CartIcon" // Import the CartIcon component
import { Link } from "react-router-dom"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [storeInfo, setStoreInfo] = useState(null)
  const [isPhonepeActive, setIsPhonepeActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken")
    setAuthToken(authToken)
    const storedCustomerInfo = localStorage.getItem("customerInfo")

    if (authToken && storedCustomerInfo) {
      setIsLoggedIn(true)
      setCustomerInfo(JSON.parse(storedCustomerInfo))
    }

    const loadStoreInfo = async () => {
      try {
        const host = window.location.hostname
        const query = `
          query StoreData {
            phonepeStatus {
              isActive
            }
            storeInfo {
              id
              storeId
              name
              displayMode
              colour
              businessTypes
              createdAt
              updatedAt
              media {
                id
                image
              }
            }
          }
        `

        const data = await fetchGraphQL(host, query)

        if (data?.storeInfo) {
          setStoreInfo(data.storeInfo)
        }

        if (data?.phonepeStatus?.isActive) {
          setIsPhonepeActive(true)
        }
      } catch (error) {
        console.error("Failed to load store info:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStoreInfo()
  }, [isLoggedIn, authToken])

  const storeName = storeInfo?.name || "pixel"
  const storeColor = storeInfo?.colour || "#F4E7E1"
  const displayMode = storeInfo?.displayMode || "both"
  // const logoImage = storeInfo?.media?.image || null

  const [logoImage, setLogoImage] = useState(null)
  useEffect(() => {
    if (storeInfo?.media?.image) {
      setLogoImage(buildImageUrl(storeInfo.media.image))
    } else {
      setLogoImage(null)
    }
  }, [storeInfo])

  const buildImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg"
  return `https://media.pixelperfects.in/${imagePath}`
}

  const renderStoreBranding = () => {
    switch (displayMode) {
      case "name":
        return (
          <span className="text-2xl font-bold" style={{ color: storeColor }}>
            {storeName}
          </span>
        )
      case "logo":
        return logoImage ? (
          <img src={logoImage || "/placeholder.svg"} alt={storeName} className="h-10 w-auto" />
        ) : (
          <span className="text-2xl font-bold" style={{ color: storeColor }}>
            {storeName}
          </span>
        )
      case "both":
      default:
        return (
          <div className="flex items-center gap-2">
            {logoImage && <img src={logoImage || "/placeholder.svg"} alt={storeName} className="h-10 w-auto" />}
            <span className="text-2xl font-bold" style={{ color: storeColor }}>
              {storeName}
            </span>
          </div>
        )
    }
  }

  return (
    <header className="bg-white shadow-sm py-4 w-full">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex-shrink-0">
            <a href="/" className="flex ">
              {loading ? ( <div className=" flex ">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div> ) : renderStoreBranding()}
            </a>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-row items-center justify-between w-full md:ml-10 gap-4">
            {/* Search Bar */}
            <div className="flex-grow items-center md:w-full md:max-w-xl">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for Face Wash"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Conditional Login + Cart */}
            {isPhonepeActive && (
              <div className="flex items-center gap-4 md:gap-6">
                <CartIcon /> {/* Replace the cart link with CartIcon component */}
                {isLoggedIn ? (
                  <Link to="/account" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    <FiUser className="text-xl" />
                    <span className="hidden md:inline">{customerInfo.name}</span>
                  </Link>
                ) : (
                  <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    <FiUser className="text-xl" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header