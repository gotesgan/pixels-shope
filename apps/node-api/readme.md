# Meta: Multi-Tenant E-commerce Platform Documentation

**Version 1.0**

---

## Chapter 1: Architecture Overview

### System Components

```mermaid
graph TD
  A[Client] --> B[REST/GraphQL API]
  B --> C[Middleware Layer]
  C --> D[Controllers]
  D --> E[Database Models]
  E --> F[(MongoDB/PostgreSQL)]
  D --> G[External Services]
```

### Key Features

- **Multi-Tenant Isolation**: Stores operate independently with domain-based routing
- **Modular Design**: Split into auth, content, payments, and product management
- **Hybrid API**: REST for CRUD + GraphQL for complex queries

---

## Chapter 2: Database Models

### Core Schemas

#### 1. Product Model (`Product.js`)

```javascript
{
  storeId: "STR_123", // Partition key
  sku: "PROD-456",
  slug: "wireless-headphones",
  specifications: [
    {key: "Battery", value: "20hrs"},
    {key: "Colors", value: ["Black","Silver"]}
  ]
}
```

#### 2. Category Hierarchy (`Category.js`)

```mermaid
graph TD
  Electronics --> Headphones
  Electronics --> Speakers
  Headphones --> Wireless
  Headphones --> Wired
```

#### 3. Order Relationships

```mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--o{ ORDER_ITEM : contains
  ORDER_ITEM }|--|| PRODUCT : references
```

---

## Chapter 3: Middleware Ecosystem

### Processing Pipeline

```mermaid
sequenceDiagram
  Client->>+StoreID Middleware: Request
  StoreID Middleware->>+Auth Middleware: {storeId}
  Auth Middleware->>+Rate Limiter: JWT Validation
  Rate Limiter->>+Controller: Approved Request
```

### Key Middlewares

| Middleware                    | Functionality                       | Error Codes          |
| ----------------------------- | ----------------------------------- | -------------------- |
| `storeIdentifctionMiddleware` | Domain→StoreID mapping              | 400, 404             |
| `authenticate`                | JWT validation + user/store binding | 401                  |
| `authorizeStoreAccess`        | RBAC for store admins               | 403                  |
| `multerConfig`                | File upload handling                | 413 (File too large) |

---

## Chapter 4: Controller Landscape

### Module Matrix

| Controller          | Key Methods                    | Dependencies        |
| ------------------- | ------------------------------ | ------------------- |
| `productController` | createProduct, getCategoryTree | Multer, Slugify     |
| `paymentController` | sendData, CheckData            | PhonePe SDK, Prisma |
| `contactController` | createSubmission, updateStatus | Nodemailer, Prisma  |
| `phonePeController` | toggleStatus, updateConfig     | Crypto, Prisma      |

### Flow: Product Creation

```mermaid
sequenceDiagram
  Client->>+API: POST /products (Images+JSON)
  API->>+Multer: Process uploads
  Multer->>+MediaHandler: CDN Upload
  MediaHandler->>+Prisma: Create DB Entry
  Prisma->>-API: 201 Created
```

---

## Chapter 5: GraphQL API Deep Dive

### Schema Design Principles

1. **Store-Centric**: All queries implicitly use `storeId`
2. **Nested Resolvers**:

```graphql
query {
  aboutPage {
    companyFact {
      factItems {
        # 3-level nesting
        label
      }
    }
  }
}
```

### Performance Tactics

- **Query Batching**: Single resolver fetches related entities
- **Caching**: Apollo Server caching for common queries
- **Selective Loading**:

```javascript
// Only load media if requested
include: {
  media: context.queryHasField("media");
}
```

---

## Chapter 6: REST API Endpoints

### Security Configuration

```javascript
// Typical protected route
router.post(
  "/products",
  authenticate, // Verify JWT
  authorizeStoreAccess, // Check admin role
  upload.array("images", 5), // Max 5 files
  validateProductData, // Joi validation
  createProduct // Handler
);
```

### Key Endpoints

| Path                       | Methods   | Rate Limit |
| -------------------------- | --------- | ---------- |
| `/api/products`            | GET, POST | 100/min    |
| `/api/payments`            | POST      | 20/min     |
| `/api/contact-submissions` | GET       | 50/min     |

---

## Chapter 7: Utility Modules

### Media Handler Workflow

```mermaid
graph LR
  A[Multer Temp File] --> B[FormData]
  B --> C[CDN API]
  C --> D[(Persist URL)]
  D --> E[Auto-Cleanup]
```

### Order Item Factory

**Input**

```javascript
{
  productId: "60ab12cd34ef56",
  quantity: 2,
  variant: "Size:L"
}
```

**Output**

```javascript
{
  sku: "PROD-123",
  price: 2999,
  image: "cdn/headphones.jpg",
  specifications: [...]
}
```

---

## Chapter 8: Security Framework

### Defense Layers

1. **Transport**: HTTPS + SSL pinning
2. **Authentication**: JWT with storeID claims
3. **Authorization**: Role-based access control
4. **Validation**: Request schema validation
5. **Sanitization**:

```javascript
// Product title sanitization
title.replace(/<[^>]*>?/gm, "");
```

### Monitoring

- Suspicious activity detection (>5 failed logins/min)
- File upload MIME type validation
- Query complexity analysis (GraphQL)

---

## Chapter 9: Error Handling System

### Standard Response Format

```json
{
  "success": false,
  "code": "PRODUCT_NOT_FOUND",
  "message": "No product with ID 123",
  "details": {
    "storeId": "STR_123",
    "attemptedId": "123"
  }
}
```

### Error Types

| Category       | Example Codes              | HTTP Status |
| -------------- | -------------------------- | ----------- |
| Authentication | INVALID_JWT, EXPIRED_TOKEN | 401         |
| Authorization  | STORE_ACCESS_DENIED        | 403         |
| Validation     | INVALID_PRODUCT_SKU        | 400         |
| Database       | RECORD_NOT_FOUND           | 404         |

---

## Chapter 10: Deployment & Scaling

### Infrastructure Diagram

```mermaid
graph TD
  A[Cloudflare] --> B[NGINX Load Balancer]
  B --> C[API Instance 1]
  B --> D[API Instance 2]
  C --> E[(MongoDB Cluster)]
  D --> E
  E --> F[Redis Cache]
```

### Horizontal Scaling Strategies

1. **Stateless APIs**: Auto-scale based on CPU/RAM
2. **DB Sharding**: `storeId` as shard key
3. **CDN**: Offload media to Cloudflare/BunnyCDN

---

This documentation provides a panoramic view of the platform's architecture, from database schemas to API security practices. Each component works in concert through well-defined interfaces and middleware layers, enabling secure multi-tenant operations at scale.
