// /routes/auth/register.ts
import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    city,
    state,
    country,
    zipCode,
  } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
      },
    });
    const tokenPayload = { userId: user.id };


    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        stores: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    // Extract storeId if present
    const storeId =
      user.stores && user.stores.length > 0 ? user.stores[0].id : null;

    const tokenPayload = { userId: user.id };
    if (storeId) {
      tokenPayload.storeId = storeId;
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET , {
      expiresIn: "7d",
    });
console.log("Generated token:", token);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.log("Login error:", err.message);
    res.status(500).json({ error: "Server error" },err.message);
  }
};
