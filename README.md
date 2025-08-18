# Pixels Shop Full Documentation

## Overview

Pixels Shop is a multi-tenant e-commerce platform that enables merchants to create online stores, manage products, and sell to customers. This document provides a comprehensive guide covering account creation, store setup, admin dashboard, frontend application, backend architecture, databases, APIs, Nx monorepo, deployment, and scaling.

---

## Table of Contents

1. [Monorepo Structure](#monorepo-structure)
2. [Account Management](#account-management)
3. [Store Setup & Domain Management](#store-setup--domain-management)
4. [Admin Dashboard](#admin-dashboard)
5. [Frontend Application](#frontend-application)
6. [Backend Architecture](#backend-architecture)
7. [Database Models](#database-models)
8. [Middleware & Security](#middleware--security)
9. [API Endpoints](#api-endpoints)
10. [GraphQL & REST Integration](#graphql--rest-integration)
11. [State Management](#state-management)
12. [Routing & Navigation](#routing--navigation)
13. [Styling & UI](#styling--ui)
14. [Deployment & Scaling](#deployment--scaling)

---

## Monorepo Structure

Nx workspace is used to manage multiple applications (account, admin, frontend, backend) and shared libraries.

```
apps/
  account/        # Account creation & user flows
  admin/          # Admin dashboard
  frontend/       # Main e-commerce frontend
  backend/        # API server
libs/             # Shared libraries
  ui/             # Reusable components
  utils/          # Utility functions
package.json
nx.json
```

### Nx Diagram

```mermaid
graph TD
  A[Nx Workspace] --> B[Apps]
  B --> C[Account App]
  B --> D[Admin App]
  B --> E[Frontend App]
  B --> F[Backend App]
  A --> G[Shared Libraries]
  G --> H[UI Components]
  G --> I[Utilities]
```

---

## Account Management

### User Registration (`Create.jsx`)

* Fields: Name, Email, Phone, Address, Password
* Validation: Password match, min length, phone validation
* API: `POST /api/v1/user/register`

### Login (`SignIn.jsx`)

* Fields: Email, Password
* API: `POST /api/v1/user/login`
* Stores token & user data in `localStorage`

### Account Flow Diagram

```mermaid
sequenceDiagram
  User->>Account App: Fill Registration Form
  Account App->>Backend API: POST /register
  Backend API->>DB: Store User Data
  DB-->>Backend API: Success
  Backend API-->>Account App: Success + Token
  Account App->>User: Redirect to Store Creation
```

---

## Store Setup & Domain Management

### Store Creation (`Create-Store.jsx`)

* Fields: Store name, Business type, Brand color, Logo
* API: `POST /api/v1/user/create-store`

### Domain Setup (`DomainSetup.jsx` & `DomainVerify.jsx`)

* DNS A record and CNAME configuration
* Domain verification and redirection

### Store Setup Diagram

```mermaid
sequenceDiagram
  User->>Store App: Create Store
  Store App->>Backend API: POST /create-store
  Backend API->>DB: Save Store Info
  User->>DomainSetup: Enter Domain Info
  DomainSetup->>Backend API: Verify Domain
  Backend API->>DNS Service: Verify Records
  DNS Service-->>Backend API: Success
  User->>Store App: Redirect to Admin/Login
```

---

## Admin Dashboard

### Features

* About page management
* Product management
* User management
* Store settings configuration
* API integration for CRUD operations

### Folder Structure

```
apps/admin/
  app/
    about/page.jsx
    products/page.jsx
    users/page.jsx
    settings/page.jsx
    components/Sidebar.jsx
    components/Navbar.jsx
    api/index.js
    styles/
```

### Admin Workflow Diagram

```mermaid
graph TD
  A[Admin UI] --> B[API Calls]
  B --> C[Backend Controllers]
  C --> D[Database]
```

---

## Frontend Application

* Core components: Header, Navbar, Footer, HeroSection, ProductSection, CartIcon
* Pages: Homepage, ProductDetails, Category, Cart, Account, AboutUs, ContactUs, FAQ, Policies
* State management via React Context and hooks
* GraphQL & REST integration

### Component Interaction Diagram

```mermaid
graph TD
  Header --> CartIcon
  Navbar --> ProductSection
  Homepage --> HeroSection
  Homepage --> ProductSection
  Footer --> Links
```

---

## Backend Architecture

* Node.js with Express
* Hybrid API: REST for CRUD, GraphQL for nested queries
* Two databases: MongoDB (main), PostgreSQL (account/store data)
* Middleware: Authentication, Authorization, Rate Limiting, File Uploads

### Backend Diagram

```mermaid
graph TD
  A[Frontend/Account/Admin] --> B[API Server]
  B --> C[Middleware Layer]
  C --> D[Controllers]
  D --> E[MongoDB/PostgreSQL]
  D --> F[External Services]
```

---

## Database Models

### Product Model

```javascript
{
  storeId: 'STR_123',
  sku: 'PROD-456',
  slug: 'wireless-headphones',
  specifications: [{key: 'Battery', value: '20hrs'}]
}
```

### Category Model

```mermaid
graph TD
  Electronics --> Headphones
  Electronics --> Speakers
  Headphones --> Wireless
  Headphones --> Wired
```

### Orders ERD

```mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--o{ ORDER_ITEM : contains
  ORDER_ITEM }|--|| PRODUCT : references
```

---

## Middleware & Security

* JWT Authentication
* Store-based authorization
* Role-based access control
* Validation & sanitization

### Middleware Flow Diagram

```mermaid
sequenceDiagram
  Client->>+StoreID Middleware: Request
  StoreID Middleware->>+Auth Middleware: Validate JWT
  Auth Middleware->>+Rate Limiter: Check Limits
  Rate Limiter->>+Controller: Process Request
```

---

## API Endpoints

| Endpoint      | Method    | Description             |
| ------------- | --------- | ----------------------- |
| /api/products | GET, POST | List or create products |
| /api/users    | GET, POST | User CRUD operations    |
| /api/orders   | GET, POST | Manage orders           |
| /api/payments | POST      | Payment processing      |

---

## Deployment & Scaling

* Load Balancer (NGINX)
* Auto-scaling API instances
* MongoDB sharding by storeId
* Redis caching
* CDN for media

### Deployment Diagram

```mermaid
graph TD
  Cloudflare --> NGINX
  NGINX --> API1
  NGINX --> API2
  API1 --> MongoDB Cluster
  API2 --> MongoDB Cluster
  MongoDB Cluster --> Redis Cache
```

---

This comprehensive documentation provides diagrams, flowcharts, and step-by-step explanations for the Pixels Shop monorepo, ensuring clarity for developers, admins, and stakeholders.
