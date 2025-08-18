# Pixels Shop Documentation

## Overview

Pixels Shop is an e-commerce platform that allows merchants to create online stores, manage products, and sell to customers. This documentation covers the user flow for store creation and domain setup.

## Components

### 1. Account Creation (`Create.jsx`)
- **Purpose**: Allows new users to register for a Pixels Shop account
- **Fields**:
  - Personal Information (name, email, phone)
  - Address Details (street, city, state, country, zip code)
  - Password (with confirmation and validation)
- **Validation**:
  - Password match confirmation
  - Minimum password length (6 characters)
  - Phone number validation (minimum 10 digits)
- **API Endpoint**: `POST /api/v1/user/register`
- **Success Flow**: Redirects to store creation page after successful registration

### 2. Store Creation (`Create-Store.jsx`)
- **Purpose**: Allows merchants to create their online store
- **Fields**:
  - Store name (required)
  - Business type (required dropdown)
  - Brand color picker (with preview)
  - Logo upload (optional)
- **Features**:
  - Color picker with live preview of store name
  - File upload for store logo
- **API Endpoint**: `POST /api/v1/user/create-store`
- **Success Flow**:
  - Displays success message with store details
  - Stores store data in local storage
  - Provides "Next" button to proceed to domain setup

### 3. Domain Question (`DomainQuestion.jsx`)
- **Purpose**: Determines if user has an existing domain
- **Options**:
  - "Yes, I have a domain" → Redirects to domain setup
  - "No, I need a domain" → Redirects to Pixels Shop admin

### 4. Domain Setup (`DomainSetup.jsx`)
- **Purpose**: Guides users through DNS configuration
- **Information Provided**:
  - Step-by-step instructions for DNS setup
  - Required A record (points to Pixels Shop IP)
  - Required CNAME record (for www subdomain)
- **Success Flow**: Stores DNS records and proceeds to verification

### 5. Domain Verification (`DomainVerify.jsx`)
- **Purpose**: Verifies domain configuration
- **Features**:
  - Domain input field
  - Mock verification function (simulates DNS propagation delay)
  - Success/failure messaging
- **Success Flow**:
  - Stores verified domain
  - Auto-redirects to login after 2 seconds

### 6. Sign In (`SignIn.jsx`)
- **Purpose**: Authenticates existing users
- **Fields**:
  - Email
  - Password (with forgot password link)
- **API Endpoint**: `POST /api/v1/user/login`
- **Success Flow**: Redirects to Pixels Shop admin with token

## Technical Details

### Authentication Flow
1. User registers via `Create.jsx`
2. Upon successful registration:
   - Auth token is stored in `localStorage`
   - User data is stored in `localStorage`
   - Redirects to store creation

### Store Creation Flow
1. User creates store via `Create-Store.jsx`
2. Upon success:
   - Store data is stored in `localStorage`
   - Redirects to domain question page

### Domain Setup Flow
1. User indicates if they have a domain
2. If yes:
   - Receives DNS configuration instructions
   - Proceeds to verification
3. If no:
   - Redirects to Pixels Shop admin

### Data Storage
- Uses `localStorage` for:
  - Auth token (`authToken`)
  - User data (`user`)
  - Store data (`createdStore`)
  - DNS records (`dnsRecords`)
  - Verified domain (`verifiedDomain`)

## Error Handling
All components include:
- Loading states during API calls
- Error message display
- Form validation
- Protected API calls with auth tokens where required

## Styling
Consistent styling across all components using:
- Tailwind CSS utility classes
- Responsive design
- Consistent color scheme and spacing
- Clear visual hierarchy

## API Integration
Components interact with these endpoints:
- `POST /api/v1/user/register` - Account creation
- `POST /api/v1/user/create-store` - Store creation
- `POST /api/v1/user/login` - User authentication

## Security Considerations
- Passwords are never stored locally
- Auth tokens are stored securely
- Form validation occurs both client and server-side
- Sensitive operations require authentication

This documentation covers the core user flows for Pixels Shop's merchant onboarding process. The system provides a complete solution for merchants to create their online presence from account creation through to domain configuration.