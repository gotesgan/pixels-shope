# Documentation for E-Commerce Application

## Overview

This documentation covers the key components and functionality of a React-based e-commerce application. The application includes features like product browsing, cart management, user authentication, and various informational pages.

## Table of Contents

1. [Core Components](#core-components)
2. [Pages](#pages)
3. [Context Providers](#context-providers)
4. [Utility Functions](#utility-functions)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Routing](#routing)
8. [Styling](#styling)

## Core Components

### Header.jsx
- Displays the store branding (logo and name)
- Includes search functionality
- Shows cart icon and user login status
- Dynamically loads store information from the API

### Navbar.jsx
- Displays product categories in a responsive menu
- Handles category selection and navigation
- Works on both desktop and mobile views

### Footer.jsx
- Contains company information and quick links
- Includes social media links and legal policy links
- Responsive layout

### HeroSection.jsx
- Displays a rotating banner of hero images
- Auto-rotates with manual navigation controls
- Fetches images from the API

### ProductSection.jsx
- Displays products grouped by category
- Includes filtering by category
- Shows product ratings and pricing
- Responsive grid layout

### CartIcon.jsx (imported in Header)
- Displays cart item count
- Links to the cart page

## Pages

### Homepage.jsx
- Composes HeroSection and ProductSection
- Main landing page of the application

### ProductDetailsPage.jsx
- Detailed view of a single product
- Image gallery with thumbnails
- Product specifications and features tabs
- Related products section
- Add to cart/buy now functionality

### CategoryPage.jsx
- Displays products filtered by category
- Uses URL parameters for category selection

### Cart.jsx
- Shows cart items with quantity controls
- Shipping address selection
- Order summary and checkout functionality
- Handles both logged-in and guest users

### AccountPage.jsx
- User profile management
- Address book functionality
- Order history
- Authentication required

### Login.jsx
- User authentication forms (login/signup)
- Form validation
- Error handling

### AboutUs.jsx
- Company information page
- Dynamic content loaded from API
- Multiple sections (story, values, brands, etc.)

### ContactUs.jsx
- Contact information and form
- Business hours display
- Social media links
- Map integration

### FAQ.jsx
- Frequently asked questions
- Categorized and searchable
- Expandable/collapsible items

### Policy Pages (PrivacyPolicy, TermsOfService, ReturnPolicy)
- Legal documentation
- Consistent layout
- Dynamic content loading

## Context Providers

### CartContext.jsx
- Manages cart state across the application
- Provides functions for:
  - Adding/removing items
  - Updating quantities
  - Calculating totals
- Persists cart to localStorage

## Utility Functions

### fetchGrap.js
- GraphQL client utility
- Handles API requests
- Error handling
- Adds protocol if missing

### Image URL formatting
- Helper functions to construct proper image URLs
- Handles both local and remote images

## API Integration

The application integrates with several API endpoints:

- GraphQL API for most data fetching
- REST endpoints for specific operations
- Dynamic hostname detection for API calls

Key API features:
- Product data
- Category information
- User authentication
- Cart and order processing
- Content management (pages, policies, etc.)

## State Management

- React hooks (useState, useEffect) for component state
- Context API for shared state (cart)
- URL parameters for navigation state
- localStorage for persistence (cart, auth)

## Routing

- Client-side routing using react-router
- Dynamic routes for:
  - Products (/product/:slug)
  - Categories (/category/:slug)
- Protected routes for account pages

## Styling

- Tailwind CSS for utility-first styling
- Responsive design throughout
- Consistent color scheme
- Animation effects for better UX
- Icon libraries (Lucide, React Icons)

## Key Features

1. **Product Browsing**
   - Category filtering
   - Search functionality
   - Detailed product views

2. **Shopping Cart**
   - Persistent across sessions
   - Quantity adjustment
   - Address selection

3. **User Accounts**
   - Registration/login
   - Profile management
   - Order history

4. **Checkout Process**
   - Cart review
   - Address selection
   - Payment integration

5. **Content Management**
   - Dynamic pages (About, Contact, etc.)
   - Policy documents
   - FAQ system

6. **Responsive Design**
   - Works on all device sizes
   - Mobile-friendly navigation
   - Adaptive layouts

## Usage Notes

- Requires a backend API (GraphQL and REST)
- Environment configuration may be needed for API endpoints
- Image handling assumes specific URL structure
- Authentication uses JWT tokens stored in localStorage

## Error Handling

- Loading states for async operations
- Error boundaries for components
- User-friendly error messages
- Retry mechanisms where appropriate