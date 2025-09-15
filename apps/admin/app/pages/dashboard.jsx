import { useState, useEffect } from 'react';
import SectionCard from '../components/section-card';
import {
  ImageIcon,
  Package,
  LayoutGrid,
  Info,
  Phone,
  HelpCircle,
  FileText,
  CreditCard,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
} from 'lucide-react';

export default function Dashboard() {
  // State to hold dynamic analytics data
  const [analytics, setAnalytics] = useState({
    activeOrders: 0,
    totalCustomers: 0,
    monthlyRevenue: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data on component mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('https://api.pixelperfects.in/api/v1/analytics/dashbaord', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        const data = await response.json();
        setAnalytics(data); // Update state with fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Static sections data (unchanged, as these seem to be UI-specific)
  const sections = [
    {
      title: 'Hero Section',
      description: 'Manage your homepage hero images and content to attract customers',
      icon: ImageIcon,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      stats: '3 Active Images',
      actions: ['Edit', 'Add New', 'Preview'],
      path: '/hero',
    },
    {
      title: 'Products',
      description: 'Add, edit, and manage your complete product catalog',
      icon: Package,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      stats: `${analytics.totalProducts} Products`, // Dynamic stat
      actions: ['View All', 'Add Product', 'Manage'],
      path: '/products',
    },
    {
      title: 'Categories',
      description: 'Organize products with categories and subcategories',
      icon: LayoutGrid,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      stats: '12 Categories',
      actions: ['View All', 'Add Category', 'Edit'],
      path: '/categories',
    },
    {
      title: 'About Page',
      description: 'Tell your story and showcase company information',
      icon: Info,
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      stats: '5 Sections',
      actions: ['Edit Content', 'Add Section', 'Preview'],
      path: '/about',
    },
    {
      title: 'Contact Page',
      description: 'Manage contact information and customer inquiries',
      icon: Phone,
      color: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      stats: '23 New Messages',
      actions: ['View Messages', 'Edit Info', 'Settings'],
      path: '/contact',
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions and helpful answers',
      icon: HelpCircle,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      stats: '18 Questions',
      actions: ['View All', 'Add FAQ', 'Edit'],
      path: '/faq',
    },
    {
      title: 'Policies',
      description: 'Legal documents: Terms, Privacy, and Return policies',
      icon: FileText,
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      stats: '3 Documents',
      actions: ['Terms', 'Privacy', 'Returns'],
      path: '/policies',
    },
    {
      title: 'Payment Settings',
      description: 'Configure PhonePe and other payment methods',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      stats: 'PhonePe Active',
      actions: ['Configure', 'Test', 'View Logs'],
      path: '/payments',
    },
    {
      title: 'Orders',
      description: 'View and manage all customer orders',
      icon: ShoppingCart,
      color: 'bg-gradient-to-r from-pink-500 to-rose-500',
      stats: `${analytics.activeOrders} Orders`, // Dynamic stat
      actions: ['View All', 'Pending', 'Completed'],
      path: '/orders',
    },
    {
      title: 'Customers',
      description: 'Manage customer accounts and relationships',
      icon: Users,
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      stats: `${analytics.totalCustomers} Customers`, // Dynamic stat
      actions: ['View All', 'Add Customer', 'Export'],
      path: '/customers',
    },
    {
      title: 'Analytics',
      description: 'View sales reports and performance metrics',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-violet-500 to-purple-500',
      stats: 'Last 30 days',
      actions: ['Sales Report', 'Traffic', 'Revenue'],
      path: '/analytics',
    },
    {
      title: 'Store Settings',
      description: 'Configure store information and preferences',
      icon: Settings,
      color: 'bg-gradient-to-r from-gray-500 to-slate-500',
      stats: 'Store Active',
      actions: ['General', 'Appearance', 'Advanced'],
      path: '/settings',
    },
  ];

  // Handle loading and error states
  if (loading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-blue-100 text-lg">
              Manage your e-commerce store from one powerful dashboard
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-700">{analytics.totalProducts}</div>
              <div className="text-sm text-gray-600 font-medium">Total Products</div>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% this month</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-700">{analytics.activeOrders}</div>
              <div className="text-sm text-gray-600 font-medium">Active Orders</div>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8% this week</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-700">{analytics.totalCustomers}</div>
              <div className="text-sm text-gray-600 font-medium">Total Customers</div>
              <div className="flex items-center mt-2 text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-2% this month</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-orange-700">₹{analytics.monthlyRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600 font-medium">Monthly Revenue</div>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+15% this month</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Store Management</h2>
          <div className="text-sm text-gray-500">
            Click any section to manage
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}