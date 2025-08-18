"use client"

import { useState } from "react"
import { Upload, X, Save } from "lucide-react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function HeroPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: null,
  })
  const [previewImage, setPreviewImage] = useState(null)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formDataToSend = new FormData()
    formDataToSend.append("title", formData.title)
    formDataToSend.append("subtitle", formData.subtitle)
    formDataToSend.append("buttonText", formData.buttonText)
    formDataToSend.append("buttonLink", formData.buttonLink)

    if (formData.image) {
      formDataToSend.append("file", formData.image)
    }

    try {
      const response = await fetch("http://localhost:4000/api/ui/create-hero-section", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        alert("Hero section updated successfully!")
        // Reset form
        setFormData({
          title: "",
          subtitle: "",
          buttonText: "",
          buttonLink: "",
          image: null,
        })
        setPreviewImage(null)
      } else {
        throw new Error("Failed to update hero section")
      }
    } catch (error) {
      console.error("Error updating hero section:", error)
      alert("Error updating hero section. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setPreviewImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Section</h1>
                  <p className="text-gray-600">Manage your website's hero section content</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Hero Content Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter hero title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                      <textarea
                        rows={4}
                        value={formData.subtitle}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Enter hero subtitle or description"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action Button Text</label>
                      <input
                        type="text"
                        value={formData.buttonText}
                        onChange={(e) => setFormData((prev) => ({ ...prev, buttonText: e.target.value }))}
                        placeholder="e.g., Shop Now, Get Started"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                      <input
                        type="url"
                        value={formData.buttonLink}
                        onChange={(e) => setFormData((prev) => ({ ...prev, buttonLink: e.target.value }))}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          <span>Update Hero Section</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hero Image Upload */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        {previewImage ? (
                          <div className="relative">
                            <img
                              src={previewImage || "/placeholder.svg"}
                              alt="Hero preview"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="hero-image-upload"
                            />
                            <label htmlFor="hero-image-upload" className="cursor-pointer">
                              <div className="space-y-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                  <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                  <p className="text-gray-600">
                                    Drop your image here, or <span className="text-blue-600 font-medium">browse</span>
                                  </p>
                                  <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                              </div>
                            </label>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                      <div className="bg-white rounded-lg p-6 border">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || "Your Hero Title"}</h2>
                        <p className="text-gray-600 mb-4">
                          {formData.subtitle || "Your hero subtitle will appear here"}
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                          {formData.buttonText || "Your CTA Button"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
