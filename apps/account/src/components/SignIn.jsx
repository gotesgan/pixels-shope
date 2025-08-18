"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function SignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Login failed")
      }

      const data = await res.json()

      // Assuming API returns { token: "...", user: {...} }
      if (!data.token) {
        throw new Error("No token returned from server")
      }

      // Redirect without saving token locally
      window.location.href = `http://localhost:3001?token=${data.token}`
    } catch (err) {
      setError(err.message || "Failed to sign in.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
                required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
                required
            />
            <div className="mt-1 text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
  )
}
