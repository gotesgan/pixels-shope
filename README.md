# Pixels Shope Monorepo

Welcome to the **Pixels Shope Monorepo**. This repository contains multiple projects and apps for our e-commerce platform, managed together using **Nx** and a monorepo structure.

---

## Monorepo Structure

```
pixels-shope/
├─ apps/
│  ├─ account/        # Customer-facing Vite React app
│  ├─ frontend/       # Main Vite React storefront
│  ├─ admin/          # Admin dashboard (Next.js)
│  └─ node-api/       # Node.js API (Express + GraphQL)
├─ packages/          # Shared packages/libraries
├─ nx.json            # Nx workspace configuration
├─ package.json       # Root package.json with scripts
├─ tsconfig.json      # Root TypeScript config
└─ README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/gotesgan/pixels-shope.git
cd pixels-shope
```

2. Install dependencies:

```bash
npm install
```

3. Install dependencies for apps (if needed):

```bash
npm install --prefix apps/account
npm install --prefix apps/frontend
npm install --prefix apps/admin
npm install --prefix apps/node-api
```

---

## Available Scripts

From the root of the monorepo, you can run scripts for each app individually or all together.

### Run all apps concurrently

```bash
npm run dev:all
```

This will start:

* **Account (Vite React)**
* **Frontend (Vite React)**
* **Admin (Next.js)**
* **Node API (Express + GraphQL)**

### Run individual apps

```bash
npm run dev:account      # Customer account app
npm run dev:frontend     # Storefront frontend
npm run dev:admin        # Admin dashboard
npm run dev:node-api     # Backend API
```

---

## Nx Monorepo Features

* Centralized management for multiple apps and packages.
* Shared configurations and libraries.
* Ability to run and build apps independently or together.
* Easy dependency tracking across apps.

---

## Node API (apps/node-api)

* **Server**: Express + GraphQL
* **Database**: MongoDB (and optional Prisma for SQL)
* **Scripts**:

```bash
npm run dev    # Start API with nodemon
```

---

## Admin App (apps/admin)

* **Framework**: Next.js
* **TailwindCSS** integrated
* **Scripts**:

```bash
npm run dev    # Start Next.js dev server
```

---

## Frontend Apps (apps/account & apps/frontend)

* **Framework**: React + Vite
* **TailwindCSS** integrated
* **Scripts**:

```bash
npm run dev    # Start Vite dev server
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a Pull Request.

---

## License

**Pixels-Perfect License**

* Non-commercial use only.
* All code can be copied, shared, or modified for non-commercial purposes.
* Any commercial use without permission will be considered a breach of contract.

---

**Happy coding!**
