"use client"

import { useState } from "react"
import { Plus, Save, Trash2, Upload } from "lucide-react"
import {
  Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle,
  Anchor, Aperture, Archive, ArrowDown, ArrowUp,
  ArrowLeft, ArrowRight, AtSign, Award, Battery,
  Bell, Book, Bookmark, Box, Briefcase,
  Calendar, Camera, Check, CheckCircle, ChevronDown,
  ChevronUp, ChevronLeft, ChevronRight, ChevronsDown, ChevronsUp,
  ChevronsLeft, ChevronsRight, Chrome, Circle, Clipboard,
  Clock, Cloud, Code, Coffee, Columns,
  Command, Compass, Copy, CornerUpLeft, CornerUpRight,
  CreditCard, Crop, Crosshair, Database, Delete
} from "lucide-react"

import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("company")
  const [aboutData, setAboutData] = useState({
    company: {
      title: "About Our Company",
      description: "We are a leading e-commerce platform dedicated to providing quality products and exceptional customer service.",
      storyParagraphs: [
        "Founded in 2020, our company started with a simple mission: to make quality products accessible to everyone.",
        "Over the years, we have grown from a small startup to a trusted brand serving thousands of customers worldwide.",
        "Our commitment to excellence and customer satisfaction drives everything we do.",
      ],
      storyImageFile: null,
      storyImagePreview: null,
    },
    brand: {
      title: "Our Brand",
      description: "Building trust through quality and innovation",
      brandItems: [
        { name: "Quality First", logoFile: null, logoPreview: null, sortOrder: 0 },
        { name: "Customer Focus", logoFile: null, logoPreview: null, sortOrder: 1 },
        { name: "Innovation", logoFile: null, logoPreview: null, sortOrder: 2 },
      ],
    },
    facts: {
      title: "Company Facts",
      description: "Numbers that tell our story",
      factItems: [
        { value: "10,000+", label: "Happy Customers", iconName: "Users", sortOrder: 0 },
        { value: "5,000+", label: "Products Sold", iconName: "Package", sortOrder: 1 },
        { value: "50+", label: "Team Members", iconName: "Users", sortOrder: 2 },
        { value: "99%", label: "Customer Satisfaction", iconName: "Star", sortOrder: 3 },
      ],
    },
    sections: [
      {
        title: "Our Mission",
        description: "To provide exceptional products and services that enhance our customers' lives.",
        sectionType: "DEFAULT",
        bgColor: "#f8fafc",
        sortOrder: 0,
        sectionItems: [],
        imageFile: null,
        imagePreview: null,
      },
      {
        title: "Our Vision",
        description: "To be the most trusted e-commerce platform globally.",
        sectionType: "DEFAULT",
        bgColor: "#f1f5f9",
        sortOrder: 1,
        sectionItems: [],
        imageFile: null,
        imagePreview: null,
      },
    ],
  })

  const lucideIcons = [
    "Activity", "Airplay", "AlertCircle", "AlertOctagon", "AlertTriangle",
    "Anchor", "Aperture", "Archive", "ArrowDown", "ArrowUp",
    "ArrowLeft", "ArrowRight", "AtSign", "Award", "Battery",
    "Bell", "Book", "Bookmark", "Box", "Briefcase",
    "Calendar", "Camera", "Check", "CheckCircle", "ChevronDown",
    "ChevronUp", "ChevronLeft", "ChevronRight", "ChevronsDown", "ChevronsUp",
    "ChevronsLeft", "ChevronsRight", "Chrome", "Circle", "Clipboard",
    "Clock", "Cloud", "Code", "Coffee", "Columns",
    "Command", "Compass", "Copy", "CornerUpLeft", "CornerUpRight",
    "CreditCard", "Crop", "Crosshair", "Database", "Delete"
  ]

  const lucideIconComponents = {
    Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle,
    Anchor, Aperture, Archive, ArrowDown, ArrowUp,
    ArrowLeft, ArrowRight, AtSign, Award, Battery,
    Bell, Book, Bookmark, Box, Briefcase,
    Calendar, Camera, Check, CheckCircle, ChevronDown,
    ChevronUp, ChevronLeft, ChevronRight, ChevronsDown, ChevronsUp,
    ChevronsLeft, ChevronsRight, Chrome, Circle, Clipboard,
    Clock, Cloud, Code, Coffee, Columns,
    Command, Compass, Copy, CornerUpLeft, CornerUpRight,
    CreditCard, Crop, Crosshair, Database, Delete
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token")
    const formData = new FormData()

    // Prepare the data objects according to backend expectations
    const aboutCompany = {
      title: aboutData.company.title,
      description: aboutData.company.description,
      storyParagraphs: aboutData.company.storyParagraphs,
    }

    const ourBrand = {
      title: aboutData.brand.title,
      description: aboutData.brand.description,
      brandItems: aboutData.brand.brandItems.map(item => ({
        name: item.name,
        sortOrder: item.sortOrder
      })),
    }

    const companyFact = {
      title: aboutData.facts.title,
      description: aboutData.facts.description,
      factItems: aboutData.facts.factItems.map(item => ({
        value: item.value,
        label: item.label,
        iconName: item.iconName,
        sortOrder: item.sortOrder
      })),
    }

    const aboutSections = aboutData.sections.map(section => ({
      title: section.title,
      description: section.description,
      sectionType: section.sectionType,
      bgColor: section.bgColor,
      sortOrder: section.sortOrder,
      sectionItems: section.sectionItems.map(item => ({
        title: item.title,
        description: item.description,
        iconName: item.iconName,
        value: item.value,
        label: item.label,
        sortOrder: item.sortOrder
      })),
    }))

    // Append JSON data
    formData.append("aboutCompany", JSON.stringify(aboutCompany))
    formData.append("ourBrand", JSON.stringify(ourBrand))
    formData.append("companyFact", JSON.stringify(companyFact))
    formData.append("aboutSections", JSON.stringify(aboutSections))

    // Append files with correct field names
    if (aboutData.company.storyImageFile) {
      formData.append("aboutCompany.storyImageUrl", aboutData.company.storyImageFile)
    }

    aboutData.brand.brandItems.forEach((item, index) => {
      if (item.logoFile) {
        formData.append(`ourBrand.brandItems[${index}].logoUrl`, item.logoFile)
      }
    })

    aboutData.sections.forEach((section, sectionIndex) => {
      if (section.imageFile) {
        formData.append(`aboutSections[${sectionIndex}].image`, section.imageFile)
      }
    })

    try {
      const response = await fetch("http://localhost:3001/api/v1/ui/about-page", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to save: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Saved successfully:", result)
      // Optionally show success notification
    } catch (err) {
      console.error("Error saving about page:", err)
      // Optionally show error notification
    }
  }

  const addStoryParagraph = () => {
    setAboutData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        storyParagraphs: [...prev.company.storyParagraphs, ""],
      },
    }))
  }

  const updateStoryParagraph = (index, value) => {
    setAboutData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        storyParagraphs: prev.company.storyParagraphs.map((p, i) => (i === index ? value : p)),
      },
    }))
  }

  const removeStoryParagraph = (index) => {
    setAboutData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        storyParagraphs: prev.company.storyParagraphs.filter((_, i) => i !== index)
      }
    }))
  }

  const addBrandItem = () => {
    setAboutData(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        brandItems: [
          ...prev.brand.brandItems,
          { name: "", logoFile: null, logoPreview: null, sortOrder: prev.brand.brandItems.length }
        ]
      }
    }))
  }

  const removeBrandItem = (index) => {
    setAboutData(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        brandItems: prev.brand.brandItems.filter((_, i) => i !== index)
      }
    }))
  }

  const addFactItem = () => {
    setAboutData(prev => ({
      ...prev,
      facts: {
        ...prev.facts,
        factItems: [
          ...prev.facts.factItems,
          { value: "", label: "", iconName: "Activity", sortOrder: prev.facts.factItems.length }
        ]
      }
    }))
  }

  const removeFactItem = (index) => {
    setAboutData(prev => ({
      ...prev,
      facts: {
        ...prev.facts,
        factItems: prev.facts.factItems.filter((_, i) => i !== index)
      }
    }))
  }

  const addSection = () => {
    setAboutData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "New Section",
          description: "Section description",
          sectionType: "DEFAULT",
          bgColor: "#ffffff",
          sortOrder: prev.sections.length,
          sectionItems: [],
          imageFile: null,
          imagePreview: null,
        }
      ]
    }))
  }

  const removeSection = (index) => {
    setAboutData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }))
  }

  const handleCompanyImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setAboutData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        storyImageFile: file,
        storyImagePreview: URL.createObjectURL(file)
      }
    }))
  }

  const removeCompanyImage = () => {
    setAboutData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        storyImageFile: null,
        storyImagePreview: null
      }
    }))
  }

  const handleBrandLogoUpload = (e, index) => {
    const file = e.target.files[0]
    if (!file) return

    setAboutData(prev => {
      const newBrandItems = [...prev.brand.brandItems]
      newBrandItems[index] = {
        ...newBrandItems[index],
        logoFile: file,
        logoPreview: URL.createObjectURL(file)
      }
      return {
        ...prev,
        brand: {
          ...prev.brand,
          brandItems: newBrandItems
        }
      }
    })
  }

  const removeBrandLogo = (index) => {
    setAboutData(prev => {
      const newBrandItems = [...prev.brand.brandItems]
      newBrandItems[index] = {
        ...newBrandItems[index],
        logoFile: null,
        logoPreview: null
      }
      return {
        ...prev,
        brand: {
          ...prev.brand,
          brandItems: newBrandItems
        }
      }
    })
  }

  const handleSectionImageUpload = (e, sectionIndex) => {
    const file = e.target.files[0]
    if (!file) return

    setAboutData(prev => {
      const newSections = [...prev.sections]
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }
      return {
        ...prev,
        sections: newSections
      }
    })
  }

  const removeSectionImage = (sectionIndex) => {
    setAboutData(prev => {
      const newSections = [...prev.sections]
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        imageFile: null,
        imagePreview: null
      }
      return {
        ...prev,
        sections: newSections
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">About Page</h1>
                <p className="text-gray-600">Manage your about page content</p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Save All Changes</span>
              </button>
            </div>
            <div className="space-y-6 mt-8">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: "company", label: "Company Info" },
                      { id: "brand", label: "Our Brand" },
                      { id: "facts", label: "Company Facts" },
                      { id: "sections", label: "Custom Sections" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Company Info Tab */}
                  {activeTab === "company" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Title</label>
                        <input
                          type="text"
                          value={aboutData.company.title}
                          onChange={(e) =>
                            setAboutData((prev) => ({
                              ...prev,
                              company: { ...prev.company, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={aboutData.company.description}
                          onChange={(e) =>
                            setAboutData((prev) => ({
                              ...prev,
                              company: { ...prev.company, description: e.target.value },
                            }))
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="block text-sm font-medium text-gray-700">Story Paragraphs</label>
                          <button
                            onClick={addStoryParagraph}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Paragraph</span>
                          </button>
                        </div>
                        <div className="space-y-3">
                          {aboutData.company.storyParagraphs.map((paragraph, index) => (
                            <div key={index} className="flex space-x-2">
                              <textarea
                                value={paragraph}
                                onChange={(e) => updateStoryParagraph(index, e.target.value)}
                                placeholder={`Paragraph ${index + 1}`}
                                rows={2}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => removeStoryParagraph(index)}
                                className="p-2 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Image</label>
                        <div className="flex items-center space-x-4">
                          <label className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleCompanyImageUpload}
                              accept="image/*"
                            />
                            {aboutData.company.storyImagePreview ? (
                              <img
                                src={aboutData.company.storyImagePreview}
                                alt="Company story"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                <span className="text-sm text-gray-500">Upload Image</span>
                              </div>
                            )}
                          </label>
                          {aboutData.company.storyImagePreview && (
                            <button
                              onClick={removeCompanyImage}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brand Tab */}
                  {activeTab === "brand" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Title</label>
                        <input
                          type="text"
                          value={aboutData.brand.title}
                          onChange={(e) =>
                            setAboutData((prev) => ({
                              ...prev,
                              brand: { ...prev.brand, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Description</label>
                        <textarea
                          value={aboutData.brand.description}
                          onChange={(e) =>
                            setAboutData((prev) => ({
                              ...prev,
                              brand: { ...prev.brand, description: e.target.value },
                            }))
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="block text-sm font-medium text-gray-700">Brand Items</label>
                          <button
                            onClick={addBrandItem}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Brand Item</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {aboutData.brand.brandItems.map((item, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="relative w-16 h-16">
                                  {item.logoPreview ? (
                                    <img
                                      src={item.logoPreview}
                                      alt={item.name}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                                      <Upload className="h-5 w-5 text-gray-400" />
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => handleBrandLogoUpload(e, index)}
                                  />
                                </div>
                                <button
                                  onClick={() => removeBrandLogo(index)}
                                  className="text-red-600 hover:text-red-700"
                                  title="Clear Image"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const newBrandItems = [...aboutData.brand.brandItems]
                                  newBrandItems[index] = { ...newBrandItems[index], name: e.target.value }
                                  setAboutData((prev) => ({
                                    ...prev,
                                    brand: { ...prev.brand, brandItems: newBrandItems },
                                  }))
                                }}
                                placeholder="Brand item name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                              />

                              <div className="flex justify-between">
                                <button
                                  onClick={() => removeBrandItem(index)}
                                  className="text-sm text-red-600 hover:text-red-700"
                                >
                                  Remove Item
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Facts Tab */}
                  {activeTab === "facts" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Facts Title</label>
                        <input
                          type="text"
                          value={aboutData.facts.title}
                          onChange={(e) =>
                            setAboutData((prev) => ({
                              ...prev,
                              facts: { ...prev.facts, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Facts Description</label>
                        <textarea
                          value={aboutData.facts.description}
                          onChange={(e) =>
                            setAboutData((prev) => ({
                              ...prev,
                              facts: { ...prev.facts, description: e.target.value },
                            }))
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="block text-sm font-medium text-gray-700">Fact Items</label>
                          <button
                            onClick={addFactItem}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Fact</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {aboutData.facts.factItems.map((fact, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-medium">Fact {index + 1}</h4>
                                <button
                                  onClick={() => removeFactItem(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={fact.value}
                                  onChange={(e) => {
                                    const newFactItems = [...aboutData.facts.factItems]
                                    newFactItems[index] = { ...newFactItems[index], value: e.target.value }
                                    setAboutData((prev) => ({
                                      ...prev,
                                      facts: { ...prev.facts, factItems: newFactItems },
                                    }))
                                  }}
                                  placeholder="Value (e.g., 10,000+)"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                  type="text"
                                  value={fact.label}
                                  onChange={(e) => {
                                    const newFactItems = [...aboutData.facts.factItems]
                                    newFactItems[index] = { ...newFactItems[index], label: e.target.value }
                                    setAboutData((prev) => ({
                                      ...prev,
                                      facts: { ...prev.facts, factItems: newFactItems },
                                    }))
                                  }}
                                  placeholder="Label (e.g., Happy Customers)"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <select
                                  value={fact.iconName}
                                  onChange={(e) => {
                                    const newFactItems = [...aboutData.facts.factItems]
                                    newFactItems[index] = { ...newFactItems[index], iconName: e.target.value }
                                    setAboutData((prev) => ({
                                      ...prev,
                                      facts: { ...prev.facts, factItems: newFactItems },
                                    }))
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  {lucideIcons.map((iconName) => {
                                    const IconComponent = lucideIconComponents[iconName]
                                    return (
                                      <option key={iconName} value={iconName}>
                                        {iconName}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Sections Tab */}
                  {activeTab === "sections" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Custom Sections</h3>
                        <button
                          onClick={addSection}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Section</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {aboutData.sections.map((section, sectionIndex) => (
                          <div 
                            key={sectionIndex} 
                            className="border border-gray-300 rounded-lg p-4" 
                            style={{ backgroundColor: section.bgColor }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-medium">Section {sectionIndex + 1}</h4>
                              <button
                                onClick={() => removeSection(sectionIndex)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => {
                                  const newSections = [...aboutData.sections]
                                  newSections[sectionIndex] = { ...newSections[sectionIndex], title: e.target.value }
                                  setAboutData((prev) => ({ ...prev, sections: newSections }))
                                }}
                                placeholder="Section title"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="color"
                                value={section.bgColor}
                                onChange={(e) => {
                                  const newSections = [...aboutData.sections]
                                  newSections[sectionIndex] = { ...newSections[sectionIndex], bgColor: e.target.value }
                                  setAboutData((prev) => ({ ...prev, sections: newSections }))
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <textarea
                              value={section.description}
                              onChange={(e) => {
                                const newSections = [...aboutData.sections]
                                newSections[sectionIndex] = { ...newSections[sectionIndex], description: e.target.value }
                                setAboutData((prev) => ({ ...prev, sections: newSections }))
                              }}
                              placeholder="Section description"
                              rows={3}
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
                              <div className="flex items-center space-x-4">
                                <label className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer">
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleSectionImageUpload(e, sectionIndex)}
                                    accept="image/*"
                                  />
                                  {section.imagePreview ? (
                                    <img
                                      src={section.imagePreview}
                                      alt="Section image"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center">
                                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                      <span className="text-sm text-gray-500">Upload Image</span>
                                    </div>
                                  )}
                                </label>
                                {section.imagePreview && (
                                  <button
                                    onClick={() => removeSectionImage(sectionIndex)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}