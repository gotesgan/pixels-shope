import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import ReturnPolicy from './pages/ReturnPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import AccountPage from './pages/AccountPage';
import './App.css';

export default function App() {
  return (
    <CartProvider>
      {/* Wrap the entire apps with CartProvider */}
      <Router>
        <ScrollToTop />

        {/* Fixed Header and Navbar Container */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <Header />
          <Navbar />
        </div>

        {/* Main content with proper spacing to account for fixed header */}
        <main className="min-h-screen pt-32">
          <Routes>
            {/* Homepage route */}
            <Route path="/" element={<Homepage />} />

            {/* Product routes */}
            <Route path="/product/:slug" element={<ProductDetailsPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<AccountPage />} />

            {/* Cart route */}
            <Route path="/cart" element={<Cart />} />

            {/* Static page routes */}
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/returnpolicy" element={<ReturnPolicy />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </CartProvider>
  );
}
