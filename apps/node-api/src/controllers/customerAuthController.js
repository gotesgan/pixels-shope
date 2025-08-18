import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Customer Registration
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const storeId = req.store.id; // From middleware

    // Validate input
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if customer already exists in this store
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        email_storeId: { email, storeId },
      },
    });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ error: "Email already registered in this store" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        storeId,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      { id: customer.id, email: customer.email, storeId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({ customer, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const storeId = req.store.id; // From middleware

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find customer in current store
    const customer = await prisma.customer.findUnique({
      where: {
        email_storeId: { email, storeId },
      },
    });

    if (!customer) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, customer.password);
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: customer.id, email: customer.email, storeId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ customer, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create Shipping Address
export const createShippingAddress = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { name, address, city, state, country, zipCode } = req.body;

    const shippingAddress = await prisma.shippingAddress.create({
      data: {
        customerId,
        name,
        address,
        city,
        state,
        country,
        zipCode,
      },
    });

    res.status(201).json(shippingAddress);
  } catch (error) {
    res.status(500).json({ error: "Failed to create shipping address" });
  }
};

// Get all shipping addresses for a customer
export const getShippingAddresses = async (req, res) => {
  try {
    const customerId = req.customer.id;

    const addresses = await prisma.shippingAddress.findMany({
      where: { customerId },
    });

    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shipping addresses" });
  }
};

// Update Shipping Address
export const updateShippingAddress = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { id } = req.params;
    const { name, address, city, state, country, zipCode } = req.body;

    const updated = await prisma.shippingAddress.updateMany({
      where: { id, customerId },
      data: { name, address, city, state, country, zipCode },
    });

    if (updated.count === 0) {
      return res
        .status(404)
        .json({ error: "Shipping address not found or unauthorized" });
    }

    res.json({ message: "Shipping address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update shipping address" });
  }
};

// Delete Shipping Address
export const deleteShippingAddress = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { id } = req.params;

    const deleted = await prisma.shippingAddress.deleteMany({
      where: { id, customerId },
    });

    if (deleted.count === 0) {
      return res
        .status(404)
        .json({ error: "Shipping address not found or unauthorized" });
    }

    res.json({ message: "Shipping address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete shipping address" });
  }
};
