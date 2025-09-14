// Required Imports
import { prisma } from '../db/db.js';
import dns from 'dns/promises';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import mediaHandler from '../utils/mediahandler.js';

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

const generateSelfSignedCert = async (domain) => {
  const cmd = `sudo certbot --nginx -d ${domain} -d www.${domain} --non-interactive --agree-tos -m your-email@example.com --redirect`;
  try {
    const { stdout, stderr } = await execAsync(cmd);
    console.log('Certbot output:', stdout);
    if (stderr) console.error('Certbot error:', stderr);
    return { certPath: null, keyPath: null }; // Certbot manages certs internally
  } catch (err) {
    console.error('Certbot failed:', err);
    throw new Error('Failed to obtain SSL certificate with Certbot');
  }
};

const writeNginxConfig = (domain, certPath, keyPath) => {
  const wwwDomain = `www.${domain}`;
  const conf = `
server {
  listen 80;
  server_name ${domain} ${wwwDomain};
  return 301 https://${domain}$request_uri;
}

server {
  listen 443 ssl;
  server_name ${domain} ${wwwDomain};

  ssl_certificate ${certPath};
  ssl_certificate_key ${keyPath};

  root /var/www/mtea;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  location /api/ {
    proxy_pass http://localhost:${BACKEND_PORT};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {
    expires 30d;
    access_log off;
    add_header Cache-Control "public";
  }
}`.trim();

  fs.appendFileSync(NGINX_COMBINED_CONFIG, `\n\n${conf}`);

  if (!fs.existsSync(NGINX_ENABLED_LINK)) {
    fs.symlinkSync(NGINX_COMBINED_CONFIG, NGINX_ENABLED_LINK);
  }

  return NGINX_COMBINED_CONFIG;
};

const reloadNginx = async () => {
  try {
    await execAsync('nginx -s reload');
  } catch (err) {
    throw new Error('Failed to reload NGINX');
  }
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

    // Try resolving DNS
    const cnameRecords = await dns.resolveCname(domain).catch(() => []);
    const aRecords = await dns.resolve4(domain).catch(() => []);

    if (cnameRecords.length === 0 && aRecords.length === 0) {
      return res.status(400).json({
        error: `Domain does not resolve to any server. CNAME: ${cnameRecords}, A: ${aRecords}`,
      });
    }

    // Find store for current user
    const store = await prisma.store.findFirst({
      where: { userId: req.user.id },
      include: { storeInfo: true, media: true },
    });
    if (!store) {
      return res.status(404).json({ error: 'Store not found for user' });
    }

    // Update domain
    const updatedStore = await prisma.store.update({
      where: { id: store.id },
      data: { domain },
      include: { storeInfo: true, media: true },
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
