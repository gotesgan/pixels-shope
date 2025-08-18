"use client"

import { useState } from "react"

export default function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 5000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md space-y-6">
        {notification.show && (
          <div
            className={`p-4 rounded-lg shadow-sm ${notification.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
          >
            {notification.message}
          </div>
        )}

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {currentPage === "login" ? "Welcome back" : "Join us today"}
          </h2>
          <p className="text-gray-500">{currentPage === "login" ? "Sign in to your account" : "Create your account"}</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          {currentPage === "login" ? (
            <LoginForm setCurrentPage={setCurrentPage} showNotification={showNotification} />
          ) : (
            <SignupForm setCurrentPage={setCurrentPage} showNotification={showNotification} />
          )}
        </div>
      </div>
    </div>
  )
}

// Login Form Component
function LoginForm({ setCurrentPage, showNotification }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Replace with your login API endpoint
      const host = window.location.hostname
      const response = await fetch(`http://${host}:3000/api/v1/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store token in localStorage
      localStorage.setItem("authToken", data.token)

      // You might want to store customer info as well
      localStorage.setItem("customerInfo", JSON.stringify(data.customer))

      showNotification("Login successful!")

      // Check if there's a redirect path stored (from cart)
      const redirectPath = localStorage.getItem("redirectAfterLogin")

      if (redirectPath) {
        // Clear the stored path
        localStorage.removeItem("redirectAfterLogin")
        // Redirect to the stored path
        window.location.href = redirectPath
      } else {
        // Default redirect to home
        window.location.href = "/"
      }
    } catch (error) {
      showNotification(error.message || "Login failed. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-700">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="ml-2">Remember me</span>
        </label>

        <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          Forgot your password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 ${isLoading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <div className="mt-4">
        <div className="relative flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-sm text-gray-500 px-2">New to here?</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className="w-full py-3 px-4 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Create a new account
          </button>
        </div>
      </div>
    </form>
  )
}

// Signup Form Component
function SignupForm({ setCurrentPage, showNotification }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Make the API call with dynamic host
      // Replace {host} with the actual host or use a variable
      const host = window.location.hostname // or use your API host
      const response = await fetch(`http://${host}:3000/api/v1/customer/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Store token in localStorage
      localStorage.setItem("authToken", data.token)

      // Store customer info in localStorage
      localStorage.setItem("customerInfo", JSON.stringify(data.customer))

      showNotification("Account created successfully!")

      // Switch to login page or redirect to dashboard
      setCurrentPage("login")
    } catch (error) {
      showNotification(error.message || "Registration failed. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600 font-medium">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600 font-medium">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword}</p>}
      </div>

      <div className={errors.agreeTerms ? "text-red-600" : ""}>
        <label className="flex items-center text-sm text-gray-700">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="ml-2">
            I agree to the{" "}
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.agreeTerms && <p className="mt-1 text-sm text-red-600 font-medium">{errors.agreeTerms}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 ${isLoading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} text-white font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>

      <div className="mt-2">
        <div className="relative flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-sm text-gray-500 px-2">Already have an account?</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="w-full py-3 px-4 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </div>
    </form>
  )
}
