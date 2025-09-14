'use client';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { fetchGraphQL } from '../lib/fetchGrap';

const Footer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFooterData = async () => {
    try {
      const host = window.location.hostname;

      const query = `
        query FooterData {
          aboutPage { id }
          contactPage {
            id
            socialLinks { id platform url isActive }
          }
          storeInfo {
            name
            colour
            tagline
            description
            address
            city
            state
            country
            postalCode
            phone
            media { image }
          }
        }
      `;

      const res = await fetchGraphQL(host, query);
      setData(res);
    } catch (error) {
      console.error('Footer query failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFooterData();
  }, []);

  if (loading) return null;

  // Destructure store info
  const store = data?.storeInfo || {};
  const storeName = store.name;
  const storeTagline = store.tagline;
  const storeColor = store.colour || "#000";

  const socialLinks = data?.contactPage?.socialLinks?.filter(link => link.isActive) || [];
  const socialIconMap = {
    FACEBOOK: FiFacebook,
    INSTAGRAM: FiInstagram,
    TWITTER: FiTwitter,
  };

  return (
    <footer className="bg-gray-100 pt-8 pb-6 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Store Info */}
          {storeName && (
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: storeColor }}>
                {storeName}
              </h3>
              {storeTagline && <p className="text-sm text-gray-600 mb-4">{storeTagline}</p>}

              {socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map(link => {
                    const IconComponent = socialIconMap[link.platform];
                    return (
                      IconComponent && (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-500"
                        >
                          <IconComponent size={20} />
                        </a>
                      )
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Quick Links */}
          {(data?.aboutPage || data?.contactPage) && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {data?.aboutPage && (
                  <li>
                    <Link to="/aboutus" className="text-gray-600 hover:text-black">
                      About Us
                    </Link>
                  </li>
                )}
                {data?.contactPage && (
                  <li>
                    <Link to="/contactus" className="text-gray-600 hover:text-black">
                      Contact Us
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-black">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacypolicy" className="text-gray-600 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/termsofservice" className="text-gray-600 hover:text-black">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/returnpolicy" className="text-gray-600 hover:text-black">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {storeName && (
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} {storeName}. All rights reserved.
              </p>
            )}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <p className="text-sm text-gray-600 flex items-center">
                Created by{' '}
                <a
                  href="https://pixel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 ml-1"
                >
                  <img
                    src="https://media.pixelperfects.in/pixelperfect03.png"
                    alt="Pixel Logo"
                    className="w-5 h-5 drop-shadow-md"
                  />
                  <span>Pixel</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
