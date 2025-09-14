'use client';

import { useState, useEffect } from 'react';
import {
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSave,
  FiX,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = `http://${window.location.hostname}:3001/api/v1/customer`;
const PRODUCTS_API_BASE_URL = `http://tesr.127.0.0.1.nip.io:3001/api/v1/products`;

export default function AccountPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersWithProducts, setOrdersWithProducts] = useState([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [error, setError] = useState(null);
  const [currentAddress, setCurrentAddress] = useState({
    id: null,
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Helper function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Helper function to make authenticated API calls
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return null;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('customerInfo');
      navigate('/login');
      return null;
    }

    return response;
  };

  // Helper function to fetch product details
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${PRODUCTS_API_BASE_URL}/id/${productId}`);
      if (response.ok) {
        const data = await response.json();
        return data.success ? data.data : null;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
  };

  // Fetch product details for all order items
  const enrichOrdersWithProductDetails = async (ordersList) => {
    if (!ordersList || ordersList.length === 0) {
      setOrdersWithProducts([]);
      return;
    }

    setIsLoadingProducts(true);

    try {
      const enrichedOrders = await Promise.all(
        ordersList.map(async (order) => {
          const enrichedItems = await Promise.all(
            order.items.map(async (item) => {
              const productDetails = await fetchProductDetails(item.productId);
              return {
                ...item,
                productName:
                  productDetails?.name || `Product ID: ${item.productId}`,
                productImage: productDetails?.image || null,
                productSlug: productDetails?.slug || null,
              };
            }),
          );

          return {
            ...order,
            items: enrichedItems,
          };
        }),
      );

      setOrdersWithProducts(enrichedOrders);
    } catch (error) {
      console.error('Error enriching orders with product details:', error);
      setOrdersWithProducts(ordersList); // Fallback to original orders
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Fetch customer profile data
  const fetchCustomerInfo = async () => {
    try {
      const storedCustomerInfo = localStorage.getItem('customerInfo');
      if (storedCustomerInfo) {
        const customerData = JSON.parse(storedCustomerInfo);
        setCustomerInfo(customerData);
        setProfileData({
          name:
            customerData.name ||
            `${customerData.firstName || ''} ${customerData.lastName || ''}`.trim(),
          email: customerData.email || '',
          phone: customerData.phone || customerData.phoneNumber || '',
        });
      } else {
        // If not in localStorage, fetch from API
        const response = await makeAuthenticatedRequest(
          `${API_BASE_URL}/profile`,
        );
        if (response && response.ok) {
          const data = await response.json();
          setCustomerInfo(data);
          setProfileData({
            name:
              data.name ||
              `${data.firstName || ''} ${data.lastName || ''}`.trim(),
            email: data.email || '',
            phone: data.phone || data.phoneNumber || '',
          });
          localStorage.setItem('customerInfo', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Error fetching customer info:', error);
      setError('Failed to load customer information');
    }
  };

  // Update profile information
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSavingProfile(true);

    try {
      const updateData = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      };

      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/profile`,
        {
          method: 'PUT',
          body: JSON.stringify(updateData),
        },
      );

      if (response && response.ok) {
        const updatedData = await response.json();

        // Update customerInfo state
        const newCustomerInfo = {
          ...customerInfo,
          ...updatedData,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
        };

        setCustomerInfo(newCustomerInfo);
        localStorage.setItem('customerInfo', JSON.stringify(newCustomerInfo));
        setIsEditingProfile(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Cancel profile editing
  const handleCancelProfileEdit = () => {
    setProfileData({
      name:
        customerInfo.name ||
        `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim(),
      email: customerInfo.email || '',
      phone: customerInfo.phone || customerInfo.phoneNumber || '',
    });
    setIsEditingProfile(false);
    setError(null);
  };

  // Fetch shipping addresses
  const fetchAddresses = async () => {
    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/Shipping`,
      );
      if (response && response.ok) {
        const data = await response.json();
        setAddresses(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('Failed to load addresses');
    }
  };

  // Fetch orders - Updated to use the correct endpoint
  const fetchOrders = async () => {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/order/`);
      if (response && response.ok) {
        const data = await response.json();
        const ordersList = Array.isArray(data) ? data : [];
        setOrders(ordersList);

        // Fetch product details for orders
        await enrichOrdersWithProductDetails(ordersList);
      } else if (response && response.status === 404) {
        // Orders endpoint might not exist yet
        setOrders([]);
        setOrdersWithProducts([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Don't set error for orders as the endpoint might not exist
      setOrders([]);
      setOrdersWithProducts([]);
    }
  };

  // Load all data on component mount
  useEffect(() => {
    const loadData = async () => {
      const token = getAuthToken();
      if (!token) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      setError(null);

      await Promise.all([fetchCustomerInfo(), fetchAddresses(), fetchOrders()]);

      setIsLoading(false);
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerInfo');
    navigate('/login');
    window.location.reload();
  };

  const handleAddressEdit = (address) => {
    setCurrentAddress({
      id: address.id,
      name: address.name || '',
      address: address.address || '',
      city: address.city || '',
      state: address.state || '',
      country: address.country || '',
      zipCode: address.zipCode || address.zip_code || '',
    });
    setIsEditingAddress(true);
  };

  const handleAddressDelete = async (addressId) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/Shipping/${addressId}`,
        {
          method: 'DELETE',
        },
      );

      if (response && response.ok) {
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
      } else {
        setError('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      setError('Failed to delete address');
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const addressData = {
        name: currentAddress.name,
        address: currentAddress.address,
        city: currentAddress.city,
        state: currentAddress.state,
        country: currentAddress.country,
        zipCode: currentAddress.zipCode,
      };

      let response;
      if (currentAddress.id) {
        // Update existing address
        response = await makeAuthenticatedRequest(
          `${API_BASE_URL}/Shipping/${currentAddress.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(addressData),
          },
        );
      } else {
        // Add new address
        response = await makeAuthenticatedRequest(`${API_BASE_URL}/Shipping`, {
          method: 'POST',
          body: JSON.stringify(addressData),
        });
      }

      if (response && response.ok) {
        // Refresh addresses list
        await fetchAddresses();
        setIsEditingAddress(false);
        setCurrentAddress({
          id: null,
          name: '',
          address: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setError('Failed to save address');
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: value,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!customerInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Failed to load customer information. Please try logging in again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-medium text-lg">
                  {customerInfo.name ||
                    customerInfo.firstName +
                      ' ' +
                      (customerInfo.lastName || '')}
                </p>
                <p className="text-gray-500 text-sm">{customerInfo.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FiUser />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FiMapPin />
                <span>Addresses</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FiShoppingBag />
                <span>Orders</span>
              </button>
            </nav>

            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
                    >
                      <FiEdit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="flex space-x-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSavingProfile}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-md"
                      >
                        <FiSave size={16} />
                        <span>
                          {isSavingProfile ? 'Saving...' : 'Save Changes'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelProfileEdit}
                        className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                      >
                        <FiX size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md">
                          {customerInfo.name ||
                            `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim()}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md">
                          {customerInfo.email}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md">
                        {customerInfo.phone ||
                          customerInfo.phoneNumber ||
                          'Not provided'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">My Addresses</h2>
                  {!isEditingAddress && (
                    <button
                      onClick={() => {
                        setCurrentAddress({
                          id: null,
                          name: '',
                          address: '',
                          city: '',
                          state: '',
                          country: '',
                          zipCode: '',
                        });
                        setIsEditingAddress(true);
                      }}
                      className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
                    >
                      <FiPlus size={16} />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                {isEditingAddress ? (
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={currentAddress.name}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Home, Office, etc."
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={currentAddress.zipCode}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="ZIP Code"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={currentAddress.address}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Street address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={currentAddress.city}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={currentAddress.state}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="State"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={currentAddress.country}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Country"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                      >
                        {currentAddress.id ? 'Update Address' : 'Add Address'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingAddress(false);
                          setError(null);
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {addresses.length === 0 ? (
                      <p className="text-gray-500">
                        You don't have any saved addresses yet.
                      </p>
                    ) : (
                      addresses.map((address) => (
                        <div
                          key={address.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{address.name}</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAddressEdit(address)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <FiEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleAddressDelete(address.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2">
                            {address.address}
                          </p>
                          <p className="text-gray-600">
                            {address.city}, {address.state}{' '}
                            {address.zipCode || address.zip_code}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab - Updated to show product names */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Orders</h2>

                {isLoadingProducts && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
                    Loading product details...
                  </div>
                )}

                {ordersWithProducts.length === 0 ? (
                  <p className="text-gray-500">
                    You haven't placed any orders yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {ordersWithProducts.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">
                              Placed on{' '}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'DELIVERED'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'PENDING'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : order.status === 'PROCESSING'
                                      ? 'bg-blue-100 text-blue-800'
                                      : order.status === 'SHIPPED'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-start"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-lg">
                                    {item.productName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    SKU: {item.sku}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                  </p>
                                  {item.productImage && (
                                    <div className="mt-2">
                                      <img
                                        src={`https://media.pixelperfects.in/${item.productImage}`}
                                        alt={item.productName}
                                        className="w-16 h-16 object-cover rounded-md"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-lg">
                                    ₹{item.price.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    per item
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm text-gray-600">
                                Payment Method:
                              </p>
                              <p className="text-sm font-medium">
                                {order.payment.method}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm text-gray-600">
                                Payment Status:
                              </p>
                              <p
                                className={`text-sm font-medium ${
                                  order.payment.status === 'COMPLETED'
                                    ? 'text-green-600'
                                    : order.payment.status === 'PENDING'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                }`}
                              >
                                {order.payment.status}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-medium">Total</p>
                              <p className="font-bold text-xl">
                                ₹{order.totalAmount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
