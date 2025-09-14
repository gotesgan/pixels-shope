'use client';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchGraphQL } from '../lib/fetchGrap';

const DynamicStoreHelmet = () => {
  const [storeInfo, setStoreInfo] = useState(null);
  const [isPhonepeActive, setIsPhonepeActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch store info
  useEffect(() => {
    const loadStoreInfo = async () => {
      try {
        const host = window.location.hostname;
        const query = `
          query StoreData {
            phonepeStatus {
              isActive
            }
            storeInfo {
              id
              storeId
              name
              displayMode
              colour
              businessTypes
              createdAt
              updatedAt
              media {
                id
                image
              }
            }
          }
        `;
        const data = await fetchGraphQL(host, query);

        if (data?.storeInfo) setStoreInfo(data.storeInfo);
        if (data?.phonepeStatus?.isActive) setIsPhonepeActive(true);
      } catch (error) {
        console.error('Failed to load store info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoreInfo();
  }, []);

  if (loading) return null; // or a loader component

  // Fallbacks
  const storeName = storeInfo?.name || 'Pixel';
  const storeTagline = storeInfo?.businessTypes || 'Welcome to our store';
  const logoImage = storeInfo?.media?.[0]?.image || '/favicon.ico';
  const currentUrl = `https://${window.location.hostname}`;

  const title = `${storeName} - ${storeTagline}`;
  const description = storeTagline;
  const ogImage = logoImage;
  const keywords = [storeName, 'e-commerce', storeTagline].join(', ');
console.log(storeName)
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={storeName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={storeName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" href={logoImage} />
      <link rel="apple-touch-icon" href={logoImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={storeName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default DynamicStoreHelmet;
