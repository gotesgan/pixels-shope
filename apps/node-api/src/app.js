import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import storeIdentificationMiddleware from "./middleware/storeIdentifctionMiddleware.js";
// Middleware
import rateLimit from "./middleware/rateLimt.js";

// DB & GraphQL

import { connectDB } from "./db/db.js";
import { setupGraphQL } from "./graphql/server.js";

// Routes
import userRouteAuth from "./routes/userRouteAuth.js";
import uiRoute from "./routes/uiRoute.js";
// import HeroRouter from "./routes/heroSection.js";
import ProductRouter from "./routes/prodcutRoute.js";
import customerRouter from "./routes/customerRoutes.js";
import phonepeRoute from "./routes/phonePeRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import chalk from "chalk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup static path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: true }));
app.use(rateLimit);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static("public"));
app.use(storeIdentificationMiddleware)
// Routes
app.use("/api/v1/user", userRouteAuth);
app.use("/api/v1/ui", uiRoute);
// apps.use("/api/v1/ui/hero", HeroRouter); // Optional if used
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/phonepe", phonepeRoute);
app.use("/api/v1/pay", paymentRoute);

// Root Route

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    await setupGraphQL(app);

    app.listen(PORT, () => {
       console.log(chalk.yellow(`🚀 Node API running on http://localhost:${PORT}`));
      console.log(chalk.green`🚀 GraphQL running at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
