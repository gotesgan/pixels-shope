'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  CreditCard,
  Smartphone,
  DollarSign,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCredentials, setShowCredentials] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState({
    razorpay: {
      isActive: false,
      clientId: 'test',
      clientSecret: 'tes',
      clientVersion: 'v1',
      testMode: true,
    },
    cod: {
      isActive: true,
      minOrderAmount: 0,
      maxOrderAmount: 5000,
      availableAreas: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
    },
    general: {
      currency: 'INR',
      taxRate: 18,
      shippingCharges: 50,
      freeShippingThreshold: 999,
    },
  });
  const [transactions, setTransactions] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper to get headers with token
  const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) headers.append('Authorization', `Bearer ${token}`);
    return headers;
  };

  // Fetch Razorpay settings
  const fetchRazorpaySettings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/razorpay/', {
        method: 'GET',
        headers: getHeaders(),
        redirect: 'follow',
      });

      if (response.ok) {
        const resJson = await response.json();
        console.log('Fetched Razorpay settings:', resJson);
        setPaymentSettings((prev) => ({
          ...prev,
          razorpay: { ...resJson.data },
        }));
      } else {
        throw new Error('Failed to fetch Razorpay settings');
      }
    } catch (error) {
      console.error('Error fetching Razorpay settings:', error);
      // setError('Failed to load Razorpay settings.');
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/pay/', {
        method: 'GET',
        headers: getHeaders(),
        redirect: 'follow',
      });

      if (response.ok) {
        const resJson = await response.json();
        console.log('Fetched transactions:', resJson);
        // Transform API data to match the expected transaction structure
        const transformedTransactions = resJson.map((item) => ({
          id: item.id,
          orderId: item.orderId,
          amount: item.amount,
          method: item.method,
          status: item.status,
          transactionId: item.transactionId,
          timestamp: item.timestamp,
        }));
        setTransactions(transformedTransactions);
      } else {
        throw new Error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions.');
    }
  };

  // Fetch both settings and transactions on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRazorpaySettings(), fetchTransactions()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Save Razorpay settings
  const saveRazorpaySettings = async () => {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append('keyId', paymentSettings.razorpay.clientId);
      urlencoded.append('keySecret', paymentSettings.razorpay.clientSecret);

      const response = await fetch('http://localhost:3001/api/v1/razorpay/', {
        method: paymentSettings.razorpay.id ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: urlencoded,
        redirect: 'follow',
      });

      if (response.ok) {
        alert('Razorpay settings saved successfully!');
        await fetchRazorpaySettings();
      } else {
        throw new Error('Failed to save Razorpay settings');
      }
    } catch (error) {
      console.error('Error saving Razorpay settings:', error);
      alert('Error saving settings. Please try again.');
    }
  };

  // Toggle Razorpay status
  const toggleRazorpayStatus = async () => {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append('keyId', paymentSettings.razorpay.clientId);
      urlencoded.append('keySecret', paymentSettings.razorpay.clientSecret);

      const response = await fetch('http://localhost:3001/api/v1/razorpay/toggle-status', {
        method: 'PATCH',
        headers: getHeaders(),
        body: urlencoded,
        redirect: 'follow',
      });

      if (response.ok) {
        setPaymentSettings((prev) => ({
          ...prev,
          razorpay: { ...prev.razorpay, isActive: !prev.razorpay.isActive },
        }));
      } else {
        throw new Error('Failed to toggle Razorpay status');
      }
    } catch (error) {
      console.error('Error toggling Razorpay status:', error);
      alert('Error toggling Razorpay status.');
    }
  };

  const handleSave = () => {
    saveRazorpaySettings();
  };

  const updateRazorpaySetting = (field, value) => {
    setPaymentSettings((prev) => ({
      ...prev,
      razorpay: { ...prev.razorpay, [field]: value },
    }));
  };

  const updateCodSetting = (field, value) => {
    setPaymentSettings((prev) => ({
      ...prev,
      cod: { ...prev.cod, [field]: value },
    }));
  };

  const updateGeneralSetting = (field, value) => {
    setPaymentSettings((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: value },
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'RAZORPAY':
        return <Smartphone className="h-4 w-4" />;
      case 'COD':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar isOpen={sidebarOpen} />
        <Navbar
          toggleSidebar={toggleSidebar}
          storeName="My Store"
          sidebarOpen={sidebarOpen}
        />
        <main
          className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
        >
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading payment settings and transactions...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar isOpen={sidebarOpen} />
        <Navbar
          toggleSidebar={toggleSidebar}
          storeName="My Store"
          sidebarOpen={sidebarOpen}
        />
        <main
          className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
        >
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchData();
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar
        toggleSidebar={toggleSidebar}
        storeName="My Store"
        sidebarOpen={sidebarOpen}
      />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
      >
        <div className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Settings
                  </h1>
                  <p className="text-gray-600">
                    Configure payment methods and transaction settings
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-green-700">
                  ₹
                  {transactions.reduce(
                    (sum, t) =>
                      t.status === 'COMPLETED' ? sum + t.amount : sum,
                    0,
                  )}
                </div>
                <div className="text-sm text-green-600">Total Revenue</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-blue-700">
                  {transactions.filter((t) => t.status === 'COMPLETED').length}
                </div>
                <div className="text-sm text-blue-600">Successful Payments</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-yellow-700">
                  {transactions.filter((t) => t.status === 'PENDING').length}
                </div>
                <div className="text-sm text-yellow-600">Pending Payments</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-red-700">
                  {transactions.filter((t) => t.status === 'FAILED').length}
                </div>
                <div className="text-sm text-red-600">Failed Payments</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Razorpay Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Smartphone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Razorpay Integration
                      </h3>
                      <p className="text-sm text-gray-600">
                        Configure Razorpay payment gateway
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleRazorpayStatus}
                    className="flex items-center space-x-2"
                  >
                    {paymentSettings?.razorpay.isActive ? (
                      <ToggleRight className="h-8 w-8 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-8 w-8 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">
                      {paymentSettings?.razorpay.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key ID
                    </label>
                    <input
                      type={showCredentials ? 'text' : 'password'}
                      value={paymentSettings?.razorpay.clientId}
                      onChange={(e) =>
                        updateRazorpaySetting('clientId', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!paymentSettings?.razorpay.isActive}
                      placeholder="Enter Razorpay Key ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Secret
                    </label>
                    <div className="relative">
                      <input
                        type={showCredentials ? 'text' : 'password'}
                        value={paymentSettings?.razorpay.clientSecret}
                        onChange={(e) =>
                          updateRazorpaySetting('clientSecret', e.target.value)
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={!paymentSettings?.razorpay.isActive}
                        placeholder="Enter Razorpay Key Secret"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCredentials(!showCredentials)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCredentials ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={paymentSettings?.razorpay.testMode}
                      onChange={(e) =>
                        updateRazorpaySetting('testMode', e.target.checked)
                      }
                      className="rounded"
                      disabled={!paymentSettings?.razorpay.isActive}
                    />
                    <span className="text-sm text-gray-700">Test Mode</span>
                  </label>
                </div>
              </div>

              {/* Uncomment Cash on Delivery Settings if needed */}
              {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-600">
                        Configure COD payment method
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={paymentSettings?.cod.isActive}
                      onChange={(e) =>
                        updateCodSetting('isActive', e.target.checked)
                      }
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Order Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={paymentSettings?.cod.minOrderAmount}
                      onChange={(e) =>
                        updateCodSetting(
                          'minOrderAmount',
                          Number.parseInt(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!paymentSettings?.cod.isActive}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Order Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={paymentSettings?.cod.maxOrderAmount}
                      onChange={(e) =>
                        updateCodSetting(
                          'maxOrderAmount',
                          Number.parseInt(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!paymentSettings.cod.isActive}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Areas
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {paymentSettings.cod.availableAreas.map((area, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                      + Add Area
                    </button>
                  </div>
                </div>
              </div> */}
            </div>

            {/* General Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                General Payment Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={paymentSettings.general.currency}
                    onChange={(e) =>
                      updateGeneralSetting('currency', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={paymentSettings.general.taxRate}
                    onChange={(e) =>
                      updateGeneralSetting(
                        'taxRate',
                        Number.parseFloat(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Charges (₹)
                  </label>
                  <input
                    type="number"
                    value={paymentSettings.general.shippingCharges}
                    onChange={(e) =>
                      updateGeneralSetting(
                        'shippingCharges',
                        Number.parseInt(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Free Shipping Above (₹)
                  </label>
                  <input
                    type="number"
                    value={paymentSettings.general.freeShippingThreshold}
                    onChange={(e) =>
                      updateGeneralSetting(
                        'freeShippingThreshold',
                        Number.parseInt(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.transactionId || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getMethodIcon(transaction.method)}
                            <span className="text-sm text-gray-900">
                              {transaction.method}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}