// storeIdentificationMiddleware.js
import { prisma } from '../db/db.js';

// Allowed subdomains
const allowedSubdomains = ['http://souled-store.localtest.me'];

const storeIdentificationMiddleware = async (req, res, next) => {
  const path = req.path || '';

  // Only run for /api or /graphql routes
  if (!path.startsWith('/api') && !path.startsWith('/graphql')) {
    return next(); // Skip middleware
  }

  const host = req.headers.host
    ? req.headers.host.split(':')[0].toLowerCase()
    : null;

  // Allow localhost (dev mode)
  if (
    host === 'localhost' ||
    host === 'localhost:3000' ||
    host === 'souled-store.localtest.me:5174'
  ) {
    return next();
  }

  try {
    if (!host) {
      return res.status(400).json({ error: 'Host header missing' });
    }

    // Allow specific subdomains
    if (allowedSubdomains.includes(host)) {
      return next();
    }

    // Lookup store by domain
    const store = await prisma.store.findUnique({
      where: { domain: host },
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found for this domain' });
    }

    console.log('Store found:', store);
    req.store = store;
    next();
  } catch (error) {
    console.error('Error in storeIdentificationMiddleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default storeIdentificationMiddleware;
