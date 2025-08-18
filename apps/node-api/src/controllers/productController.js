import Product from "../models/Product.js";
import Category from "../models/Category.js";
import fs from "fs/promises";
import slugify from "slugify";

import upload from "../utils/mediahandler.js"; // or wherever your upload.js is
import mediaHandler from "../utils/mediahandler.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      originalPrice,
      stock,
      sku,
      rating,
      features,
      specifications,
    } = req.body;

    const storeId = req.user?.storeId;
    console.log("Request body:", req.body);

    const categoryObj = await Category.findOne({ name: category, storeId });
    if (!categoryObj) {
      return res.status(400).json({
        success: false,
        error: "Invalid category for this store",
      });
    }

    const slug = slugify(`${categoryObj.slug}/${name}`, { lower: true });

    const files = req.files || [];
    if (!files.length) {
      return res.status(400).json({
        success: false,
        error: "At least one image is required.",
      });
    }

    const uploadedImages = [];
    for (const file of files) {
      const data = await mediaHandler.upload(file.path);
      console.log("Uploaded file response:", data);

      if (data?.uploadedImages?.length) {
        for (const img of data.uploadedImages) {
          if (img.filename) {
            uploadedImages.push(img.filename);
          }
        }
      }

      // Delete local file
      try {
        await fs.unlink(file.path);
        console.log(`Deleted local file: ${file.path}`);
      } catch (err) {
        console.error(`Failed to delete local file: ${file.path}`, err);
      }
    }

    if (!uploadedImages.length) {
      return res.status(400).json({
        success: false,
        error: "Image upload failed.",
      });
    }

    // Safely parse features and specifications
    let parsedFeatures = [];
    let parsedSpecifications = {};

    try {
      parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: "Invalid JSON format for features",
      });
    }

    try {
      const parsed = typeof specifications === "string" ? JSON.parse(specifications) : specifications;
      parsedSpecifications = Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: "Invalid JSON format for specifications",
      });
    }

    const mainImage = uploadedImages[0];
    const galleryImages = uploadedImages;

    const product = new Product({
      name,
      slug,
      storeId,
      description,
      price,
      originalPrice,
      stock,
      sku,
      rating: rating || 0,
      category: categoryObj._id,
      image: mainImage,
      images: galleryImages,
      features: parsedFeatures,
      specifications: parsedSpecifications,
    });

    const saved = await product.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const storeId = req.store?.id;
    const products = await Product.find({ storeId }).populate(
      "category",
      "name slug"
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const storeId = req.store?.id;
    const product = await Product.findOne({
      slug: req.params.slug,
      storeId,
    }).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const storeId = req.user?.storeId;
    const updates = { ...req.body };

    if (req.file) {
      const mediaData = await mediaHandler(req.file.path);
      updates.image = mediaData.url;
    }

    if (updates.name) {
      updates.slug = slugify(`${storeId}-${updates.name}`, { lower: true });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, storeId },
      updates,
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const storeId = req.user?.storeId;
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      storeId,
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    console.log(req.user);
    const { name, parent } = req.body;
    const storeId = req.user?.storeId;
    console.log(req.body);

    let parentId = null;
    let slug;

    if (parent) {
      // Find the parent category by name and storeId
      const parentCategory = await Category.findOne({ name: parent, storeId });

      if (!parentCategory) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid parent category" });
      }

      parentId = parentCategory._id;
      // Use parent's slug as prefix for the new category slug
      slug = slugify(`${parentCategory.slug}/${name}`, { lower: true });
    } else {
      // Root category slug
      slug = slugify(name, { lower: true });
    }

    // Create the new category with parent as ObjectId or null
    const newCategory = new Category({
      name,
      slug,
      storeId,
      parent: parentId,
    });

    const saved = await newCategory.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.log("Create category error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const storeId = req.store?.id;
    const categories = await Category.find({ storeId }).populate(
      "parent",
      "name slug"
    );
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get category tree
export const getCategoryTree = async (req, res) => {
  try {
    const storeId = req.store?.id;
    const categories = await Category.find({ storeId });

    const buildTree = (parentId = null) => {
      return categories
        .filter((cat) => String(cat.parent) === String(parentId))
        .map((cat) => ({
          ...cat.toObject(),
          children: buildTree(cat._id),
        }));
    };

    const tree = buildTree();
    res.status(200).json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get products by category slug
export const getProductsByCategory = async (req, res) => {
  try {
    const storeId = req.store?.id;
    const { slug } = req.params;

    const category = await Category.findOne({ slug, storeId });
    console.log("Category found:", category);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    const products = await Product.find({ category: category._id, storeId })
      .populate("category", "name slug")
      .exec();
    console.log("Products found:", products);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get product by MongoDB ID
export const getProductById = async (req, res) => {
  try {
    const storeId = req.store?.id;
    const productId = req.params.id;
    console.log(storeId, productId);
    if (!storeId) {
      return res.status(400).json({
        success: false,
        error: "Missing store ID",
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: "Product ID is required",
      });
    }

    const product = await Product.findOne({
      _id: productId,
      storeId,
    }).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};
