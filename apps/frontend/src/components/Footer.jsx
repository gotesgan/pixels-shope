"use client"
import { Link } from "react-router-dom"
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi"

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-8 pb-6 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-blue-500">Bi</span>
              <span className="text-green-500">zonance</span>
            </h3>
            <p className="text-gray-600 mb-4">Natural, toxin-free products for you and your baby.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/aboutus" className="text-gray-600 hover:text-black-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-gray-600 hover:text-black-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-black-500">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {/* Updated to use Link instead of anchor tags */}
              <li>
                <Link to="/privacypolicy" className="text-gray-600 hover:text-black-500">
                Privacy Policy
              </Link>
              </li>
              <li>
              <Link to="/termsofservice" className="text-gray-600 hover:text-black-500">
                Terms of Service
              </Link>
              </li>
              <li>
              <Link to="/returnpolicy" className="text-gray-600 hover:text-black-500">
                Return Policy
              </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Bizonance. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <p className="text-sm text-gray-600"> Cretated by <a href="https://bizonance.com" target="_blank">Bizonance</a></p>

            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
