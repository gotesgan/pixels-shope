import mongoose from "mongoose";
import Product from "../models/Product.js"; // adjust the path accordingly

/**
 * Creates an OrderItem-like object from a product ID and quantity.
 * @param {String} productId - MongoDB ObjectId of the product.
 * @param {Number} quantity - Quantity to order.
 * @param {String} [variant] - Optional variant (size, color, etc).
 * @returns {Promise<Object>} OrderItem-like object.
 */
const createOrderItemFromProduct = async (
  productId,
  quantity,
  variant = null
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid productId");
  }

  const product = await Product.findById(productId).lean();

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    productId: product._id.toString(),
    sku: product.sku.replace(/\s+/g, ''), // 🔥 remove all whitespace
    quantity,
    price: product.price,
    variant,
  };
};

export default createOrderItemFromProduct;
