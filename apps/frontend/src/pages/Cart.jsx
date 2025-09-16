'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Plus,
  Minus,
  MapPin,
  Edit,
  Check,
} from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [payment, setPayment] = useState({});

  // Razorpay script loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Check authentication status and fetch addresses on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);

    const storedCustomerInfo = localStorage.getItem('customerInfo');
    if (storedCustomerInfo) {
      setCustomerInfo(JSON.parse(storedCustomerInfo));
    }

    if (authToken) {
      fetchAddresses();
    }
  }, []);

  // Fetch shipping addresses
  const fetchAddresses = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) return;

    setIsLoadingAddresses(true);
    setError(null);

    try {
      const hostname = window.location.hostname;
      const response = await fetch(
        `https://${hostname}:3001/api/v1/customer/Shipping`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Fetch addresses response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched addresses:', data);

        // Handle different API response formats
        const addressList = Array.isArray(data) ? data : data.addresses || [];
        setAddresses(addressList);

        // Auto-select the first address or default address if available
        if (addressList.length > 0) {
          const defaultAddress = addressList.find((addr) => addr.isDefault);
          setSelectedAddressId(
            defaultAddress
              ? defaultAddress._id || defaultAddress.id
              : addressList[0]._id || addressList[0].id,
          );
        }
      } else {
        console.error('Failed to fetch addresses:', response.status);
        setError('Failed to load addresses. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('An error occurred while loading addresses.');
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  // Handle address selection
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    // Check if user is logged in first
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // Store current path to redirect back after login
      localStorage.setItem('redirectAfterLogin', '/cart');
      // Redirect to login page
      navigate('/login');
      return;
    }

    // Check if address is selected
    if (!selectedAddressId) {
      alert('Please select a shipping address');
      return;
    }

    setIsPlacingOrder(true);
    setError(null);

    try {
      // Extract only _id and quantity
      const simplifiedItems = cartItems.map(({ _id, quantity }) => ({
        _id,
        quantity,
      }));
      const totalAmount = getCartTotal();

      // Create the payload to send to the payment API
      const paymentData = {
        simplifiedItems: simplifiedItems,
        amount: totalAmount,
        shippingAddressId: selectedAddressId, // Include selected address ID
      };

      console.log('Sending payment data:', paymentData);

      // Get the current hostname dynamically
      const hostname = window.location.hostname;

      // Make the API call to create the Razorpay order
      const response = await fetch(`https://localhost:3001/api/v1/pay/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Payment request failed with status: ${response.status}`,
        );
      }

      const orderData = await response.json();
      setPayment(orderData);

      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Razorpay checkout options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Your Store Name',
        order_id: orderData.orderId,
        handler: async function (response) {
          // Verify payment at backend
          const verifyRes = await fetch(`http://api.pixelperfects.in/api/v1/pay/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(response),
          });

          if (!verifyRes.ok) throw new Error('Payment verification failed');
          const verifiedData = await verifyRes.json();

          // Clear cart & navigate
          clearCart();
          navigate('/order-confirmation', { state: { orderData: verifiedData } });
        },
        prefill: {
          name: customerInfo?.name,
          email: customerInfo?.email,
          contact: customerInfo?.phone,
        },
        theme: { color: '#22c55e' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Calculate cart total
  const cartTotal = getCartTotal();

  // Get selected address details
  const selectedAddress = addresses.find(
    (addr) => (addr._id || addr.id) === selectedAddressId,
  );

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            to="/"
            className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          {/* Cart header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
            <div className="md:col-span-6">Product</div>
            <div className="md:col-span-2 text-center">Price</div>
            <div className="md:col-span-2 text-center">Quantity</div>
            <div className="md:col-span-2 text-center">Total</div>
          </div>

          {/* Cart items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Product info */}
                <div className="md:col-span-6 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : '/placeholder.svg?height=80&width=80'
                      }
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      <Link
                        to={`/product/${item.slug}`}
                        className="hover:text-green-600"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 md:hidden">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Price - hidden on mobile */}
                <div className="hidden md:block md:col-span-2 text-center text-sm text-gray-900">
                  ₹{item.price.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="md:col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-1 border-r hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border-l hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <span className="text-sm font-medium text-gray-900 md:hidden">
                    Total:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Remove button */}
                <div className="col-span-1 flex justify-end md:justify-center">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </h2>
              {isLoggedIn && (
                <Link
                  to="/account"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Manage Addresses
                </Link>
              )}
            </div>

            {!isLoggedIn ? (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Sign in to continue
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please sign in to select a shipping address.
                </p>
                <div className="mt-6">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            ) : isLoadingAddresses ? (
              <div className="flex justify-center py-4">
                <svg
                  className="animate-spin h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No addresses found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add a shipping address to continue.
                </p>
                <div className="mt-6">
                  <Link
                    to="/account"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Address
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => {
                  // Handle different address formats
                  const addressId = address._id || address.id;
                  const isSelected = selectedAddressId === addressId;

                  return (
                    <div
                      key={addressId}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAddressSelect(addressId)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {isSelected ? (
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">
                                {address.name || 'Address'}
                              </p>
                              {address.isDefault && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {address.address || address.street || ''}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}
                              {address.city && address.state ? ', ' : ''}
                              {address.state}{' '}
                              {address.zipCode || address.zip_code}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.country}
                            </p>
                            {customerInfo?.phone && (
                              <p className="text-sm text-gray-600">
                                Phone: {customerInfo.phone}
                              </p>
                            )}
                          </div>
                        </div>
                        <Link
                          to="/account"
                          className="text-gray-400 hover:text-gray-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  ₹{cartTotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">
                  Calculated at checkout
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-gray-900">
                  ₹{cartTotal.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={
                  isPlacingOrder ||
                  (isLoggedIn && !selectedAddressId) ||
                  !isLoggedIn
                }
                className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  isPlacingOrder ||
                  (isLoggedIn && !selectedAddressId) ||
                  !isLoggedIn
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isPlacingOrder ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : !isLoggedIn ? (
                  'Sign in to Place Order'
                ) : !selectedAddressId ? (
                  'Select Address to Continue'
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}