import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { prisma } from './db/db.js';
import { fileURLToPath } from 'url';
import storeIdentificationMiddleware from './middleware/storeIdentifctionMiddleware.js';
// Middleware
import rateLimit from './middleware/rateLimt.js';

import { connectDB } from './db/db.js';
import { setupGraphQL } from './graphql/server.js';
import fs from 'fs';

// Routes
import userRouteAuth from './routes/userRouteAuth.js';
import uiRoute from './routes/uiRoute.js';
// import HeroRouter from "./routes/heroSection.js";
import ProductRouter from './routes/prodcutRoute.js';
import customerRouter from './routes/customerRoutes.js';
import razorpayRoute from './routes/razorpayRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import storeInfoRoute from './routes/storeInfoRoute.js';
import orderRoute from './routes/merchentOrderRoute.js';
import analyticsRoute from './routes/analyticsRoute.js';
import chalk from 'chalk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup static path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: '*' }));
app.use(rateLimit);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(storeIdentificationMiddleware);
app.use(express.static('public'));

// Routes
app.use('/api/v1/user', userRouteAuth);
app.use('/api/v1/ui', uiRoute);
// apps.use("/api/v1/ui/hero", HeroRouter); // Optional if used
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/razorpay', razorpayRoute);
app.use('/api/v1/pay', paymentRoute);
app.use('/api/v1/store', storeInfoRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/analytics', analyticsRoute);

app.get(/.*/, async (req, res) => {
  try {
    const domain = req.hostname;

    // Fetch store info including name, description, and media
    const store = await prisma.store.findUnique({
      where: { domain },
      include: {
        storeInfo: true,
        media: true,
      },
    });

    // Filter media items that belong to storeInfo and have an image
    const images =
      store?.media?.filter((item) => item.image && item.storeInfoId != null) ||
      [];

    // Get the first valid image or fallback
    const firstImage = images[0]?.image;
    const favicon = firstImage
      ? `https://media.pixelperfects.in/${firstImage}`
      : '/favicon.ico';

    // Fallbacks for title and description
    const title = store?.storeInfo?.name || 'Pixel Store';
    const description = store?.storeInfo?.description || 'Welcome to our store';

    console.log('Favicon URL:', favicon);

    // Read template
    const templatePath = path.join(__dirname, '../public/Main/index.html');
    let html = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders
    html = html
      .replace('{{TITLE}}', title)
      .replace('{{DESCRIPTION}}', description)
      .replace(/{{FAVICON}}/g, favicon);

    res.send(html);
  } catch (err) {
    console.error('Error rendering homepage:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Root Route
// redirer to admin panel
app.get('/admin', (req, res) => {
  res.redirect('http://localhost:3000');
});

// app.get('/assets/:file', async (req, res) => {
//   const url = `https://media.pixelperfects.in/Devassets/${req.params.file}`;
//   const response = await fetch(url);
//   const data = await response.text();
//   res.setHeader('Content-Type', 'application/javascript');
//   res.send(data);
// });

// Start Server

const startServer = async () => {
  try {
    await connectDB();
    await setupGraphQL(app);

    app.listen(PORT, () => {
      console.log(
        chalk.yellow(`🚀 Node API running on http://localhost:${PORT}`)
      );
      console.log(
        chalk.green`🚀 GraphQL running at http://localhost:${PORT}/graphql`
      );
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
