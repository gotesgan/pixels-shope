"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
//for git
  const salesData = [
    { month: "Jan", sales: 12000, orders: 45 },
    { month: "Feb", sales: 15000, orders: 52 },
    { month: "Mar", sales: 18000, orders: 61 },
    { month: "Apr", sales: 22000, orders: 73 },
    { month: "May", sales: 25000, orders: 84 },
    { month: "Jun", sales: 28000, orders: 92 },
  ]

  const topProducts = [
    { name: "Wireless Headphones", sales: 156, revenue: 46800 },
    { name: "Cotton T-Shirt", sales: 234, revenue: 14040 },
    { name: "Running Shoes", sales: 89, revenue: 35611 },
    { name: "Smartphone Case", sales: 167, revenue: 4993 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} storeName="My Store" sidebarOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} pt-16`}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
              <p className="text-gray-600">View detailed analytics and insights</p>
            </div>
            <div className="space-y-6 mt-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₹1,25,000</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 ml-1">+12.5%</span>
                      </div>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">407</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 ml-1">+8.2%</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Customers</p>
                      <p className="text-2xl font-bold text-gray-900">89</p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600 ml-1">-3.1%</span>
                      </div>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Products Sold</p>
                      <p className="text-2xl font-bold text-gray-900">1,234</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 ml-1">+15.3%</span>
                      </div>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
                  <div className="space-y-4">
                    {salesData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(data.sales / 30000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">₹{data.sales.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New order received</p>
                      <p className="text-xs text-gray-500">Order #ORD-005 - ₹2,999</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-500 p-2 rounded-full">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New customer registered</p>
                      <p className="text-xs text-gray-500">Sarah Wilson joined</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">15 min ago</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="bg-purple-500 p-2 rounded-full">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product updated</p>
                      <p className="text-xs text-gray-500">Wireless Headphones - Stock updated</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
