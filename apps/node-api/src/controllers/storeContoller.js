// Required Imports
import { prisma } from '../db/db.js';
import dns from 'dns/promises';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
// //import mediaHandler from '../utils/mediahandler.js';

const execAsync = promisify(exec);

// Constants
const NGINX_SITES_AVAILABLE = '/etc/nginx/sites-available';
const NGINX_SITES_ENABLED = '/etc/nginx/sites-enabled';
const NGINX_COMBINED_CONFIG = path.join(
  NGINX_SITES_AVAILABLE,
  'multi-store.conf'
);
const NGINX_ENABLED_LINK = path.join(NGINX_SITES_ENABLED, 'multi-store.conf');
const BACKEND_PORT = process.env.PORT;

// Utility Functions
const getServerIPs = () => {
  const nets = os.networkInterfaces();
  return Object.values(nets)
    .flat()
    .filter((i) => i.family === 'IPv4' && !i.internal)
    .map((i) => i.address);
};

const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const generateLocalDomain = (slug) => {
  // const localIP = '127.0.0.1'; // Or your LAN IP if you want to share in network
  return `${slug}.localtest.me`;
};

// Store Creation
export const createStore = async (req, res) => {
  const { name, businessTypes, colour } = req.body;
  const file = req.file;

  if (!name) {
    return res.status(400).json({ error: 'Store name is required' });
  }

  try {
    const slug = generateSlug(name);
    const domain = generateLocalDomain(slug);

    const existingStore = await prisma.store.findUnique({ where: { domain } });
    if (existingStore) {
      return res
        .status(400)
        .json({ error: 'Store with this name already exists on localhost' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const store = await tx.store.create({
        data: { domain, userId: req.user.userid },
      });

      const storeInfo = await tx.storeInfo.create({
        data: {
          storeId: store.id,
          name,
          businessTypes: businessTypes || null,
          colour,
        },
      });

      if (file?.key) {
        await tx.media.create({
          data: {
            image: file.key, // ✅ directly saving file.key
            storeId: store.id,
            storeInfoId: storeInfo.id,
          },
        });
      }

      return { store, storeInfo };
    });

    res.status(201).json({
      message: 'Store created successfully',
      store: {
        id: result.store.id,
        domain: result.store.domain,
        storeInfo: {
          name: result.storeInfo.name,
          businessTypes: result.storeInfo.businessTypes,
          colour: result.storeInfo.colour,
        },
      },
    });
  } catch (err) {
    console.error('Store creation failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const verifyAndSetupDomain = async (req, res) => {
  let { domain } = req.body;
  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  try {
    domain = domain
      .toLowerCase()
      .trim()
      .replace(/^www\./, '');

    // Find store for current user
    const store = await prisma.store.findFirst({
      where: { userId: req.user.id },
    });
    if (!store) {
      return res.status(404).json({ error: 'Store not found for user' });
    }

    // System-generated default domain (like mystore.pixelperfects.in)
    const expectedTarget = store.domain;

    // Resolve CNAME record for custom domain
    const cnameRecords = await dns.resolveCname(domain).catch(() => []);

    if (!cnameRecords.includes(expectedTarget)) {
      return res.status(400).json({
        error: `Invalid CNAME. Expected: ${expectedTarget}, Found: ${
          cnameRecords.join(', ') || 'none'
        }`,
      });
    }

    // ✅ Update custom domain in DB
    const updatedStore = await prisma.store.update({
      where: { id: store.id },
      data: { domain },
    });

    res.status(200).json({
      message: 'Domain verified and updated successfully.',
      domain,
      store: updatedStore,
    });
  } catch (err) {
    console.error('Domain verification failed:', err);
    res.status(500).json({ error: err.message });
  }
};

//get store details
export const getStoreDetails = async (req, res) => {
  try {
    console.log('Fetching store details for user:', req.user);
    const store = await prisma.store.findFirst({
      where: { userId: req.user.userid },
      include: { storeInfo: true, media: true, owner: true },
    });
    if (!store) {
      return res.status(404).json({ error: 'Store not found for user' });
    }
    res.status(200).json({ store });
  } catch (err) {
    console.error('Fetching store details failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update store details

export const updateStoreDetails = async (req, res) => {
  const {
    name,
    businessTypes,
    colour,
    tagline,
    description,
    address,
    city,
    state,
    country,
    postalCode,
    phone,
    displayMode,
  } = req.body;

  const file = req.file;

  try {
    const store = await prisma.store.findFirst({
      where: { userId: req.user.id },
      include: { storeInfo: true, media: true },
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found for user' });
    }

    // --- Upsert storeInfo ---
    const updatedStoreInfo = await prisma.storeInfo.upsert({
      where: { id: store.storeInfo?.id ?? '' }, // if empty, will trigger create
      update: {
        ...(name && { name }),
        ...(businessTypes && { businessTypes }),
        ...(colour && { colour }),
        ...(tagline && { tagline }),
        ...(description && { description }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(country && { country }),
        ...(postalCode && { postalCode }),
        ...(phone && { phone }),
        ...(displayMode && { displayMode }),
      },
      create: {
        name: name ?? '',
        businessTypes: businessTypes ?? '',
        colour: colour ?? '',
        tagline: tagline ?? '',
        description: description ?? '',
        address: address ?? '',
        city: city ?? '',
        state: state ?? '',
        country: country ?? 'India',
        postalCode: postalCode ?? '',
        phone: phone ?? '',
        displayMode: displayMode ?? 'both',
        storeId: store.id,
      },
    });

    // --- Upsert media (only if file provided) ---
    if (file?.key) {
      await prisma.media.upsert({
        where: { id: store.media[0]?.id ?? '' },
        update: { image: file.key },
        create: {
          image: file.key,
          storeId: store.id,
          storeInfoId: updatedStoreInfo.id,
        },
      });
    }

    res.status(200).json({
      message: 'Store details updated successfully',
      storeInfo: updatedStoreInfo,
    });
  } catch (err) {
    console.error('Updating store details failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
