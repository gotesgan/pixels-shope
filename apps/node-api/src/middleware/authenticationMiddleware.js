import jwt from "jsonwebtoken";
import { prisma } from "../db/db.js";

// Main authentication middleware
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authorization token required",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);
  try {
    // Decode JWT

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { stores: { select: { id: true } } },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid authentication token",
        success: false,
      });
    }

    const tokenStoreId = decoded.storeId;

    // Check if store exists in user's access list if storeId is provided
    if (tokenStoreId) {
      const validStore = user.stores.some((store) => store.id === tokenStoreId);
      if (!validStore) {
        return res.status(403).json({
          error: "Invalid store access",
          success: false,
        });
      }
    } else {
      // No storeId provided => likely the user has not created or selected a store yet
      console.log("No storeId in token — assuming store not created yet");
    }

    // Attach user data to request
    req.user = {
      userid: user.id,
      email: user.email,
      storeId: tokenStoreId || null, // can be null for store creation flow
    };

    req.store = tokenStoreId ? { Id: tokenStoreId } : null;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      error: "Invalid or expired token",
      success: false,
    });
  }
};

// Optional store authorization middleware
export const authorizeStoreAccess = (req, res, next) => {
  if (!req.user.storeId) {
    return res.status(403).json({
      error: "Store access required for this operation",
      success: false,
    });
  }
  next();
};
