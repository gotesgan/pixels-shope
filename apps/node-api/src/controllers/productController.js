import Product from '../models/Product.js';
import Category from '../models/Category.js';
import fs from 'fs/promises';
import slugify from 'slugify';

// import Product from '../models/Product.js';
// import Category from '../models/Category.js';
// import slugify from 'slugify';

export const createProduct = async (req, res) => {
  try {
    const {
      id,
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
      badges,
    } = req.body;

    const storeId = req.user?.storeId;

    // Ensure images come as array of strings (URLs or keys)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.key);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least one product image.',
      });
    }

    // Validate category
    const categoryObj = await Category.findOne({ name: category, storeId });
    if (!categoryObj) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category for this store',
      });
    }

    // Generate slug
    const slug = slugify(`${categoryObj.slug}/${name}`, { lower: true });

    // Parse features/specifications/badges safely
    const parseJSON = (val, fallback) => {
      try {
        return typeof val === 'string' ? JSON.parse(val) : val || fallback;
      } catch {
        return fallback;
      }
    };

    const parsedFeatures = parseJSON(features, []);
    const parsedBadges = parseJSON(badges, []);
    const parsedSpecifications = parseJSON(specifications, {});

    // --- Find existing product ---
    let product;

    if (id) {
      product = await Product.findOne({ _id: id, storeId });
    }
    if (!product) {
      product = await Product.findOne({ slug, storeId });
    }
    if (!product) {
      product = await Product.findOne({ name, storeId });
    }

    if (product) {
      // If found, update it
      product.set({
        name,
        slug,
        description,
        price,
        originalPrice,
        stock,
        sku,
        rating: rating || 0,
        category: categoryObj._id,
        image: images[0],
        images,
        features: parsedFeatures,
        specifications: parsedSpecifications,
        featuresStrip: parsedBadges,
      });

      const updated = await product.save();
      return res.status(200).json({ success: true, data: updated });
    } else {
      // If not found, create new
      const newProduct = new Product({
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
        image: images[0],
        images,
        features: parsedFeatures,
        specifications: parsedSpecifications,
        featuresStrip: parsedBadges,
      });

      const saved = await newProduct.save();
      return res.status(201).json({ success: true, data: saved });
    }
  } catch (error) {
    console.error('Upsert product error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const storeId = req.store?.id || req.user?.storeId;
    const products = await Product.find({ storeId }).populate(
      'category',
      'name slug'
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const storeId = req.store?.id || req.user?.storeId;
    const product = await Product.findOne({
      slug: req.params.slug,
      storeId,
    }).populate('category');
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' });
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
        .json({ success: false, error: 'Product not found' });
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
        .json({ success: false, error: 'Product not found' });
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const storeId = req.user?.storeId;
    console.log('Store ID:', storeId);
    console.log('Request body:', req.body);
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: 'Category name is required' });
    }

    let parentId = null;
    let slug;

    if (parent) {
      // If parent is provided, find it by _id
      const parentCategory = await Category.findOne({ _id: parent, storeId });
      if (!parentCategory) {
        return res
          .status(400)
          .json({ success: false, error: 'Invalid parent category' });
      }

      parentId = parentCategory._id;
      // Slug includes parent's slug for hierarchy
      slug = slugify(`${parentCategory.slug}/${name}`, { lower: true });
    } else {
      // Root category slug
      slug = slugify(name, { lower: true });
    }

    // Upsert: create new or update existing category with same name and parent
    const upsertedCategory = await Category.findOneAndUpdate(
      { name, storeId, parent: parentId },
      { name, slug, storeId, parent: parentId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({ success: true, data: upsertedCategory });
  } catch (error) {
    console.error('Create/Update category error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const storeId = req.user?.storeId;
    const categoryId = req.params.id;

    const category = await Category.findOneAndDelete({
      _id: categoryId,
      storeId,
    });
    console.log('Deleted category:', category);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const storeId = req.store?.id || req.user?.storeId;
    const categories = await Category.find({ storeId }).populate(
      'parent',
      'name slug'
    );
    console.log('Fetched categories:', req.user?.storeId);
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

    // Find the main category
    const category = await Category.findOne({ slug, storeId });
    console.log('Category found:', category);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: 'Category not found' });
    }

    // Get all nested category IDs (including the main one)
    const getAllChildCategories = async (parentId) => {
      const children = await Category.find({ parent: parentId, storeId });
      let ids = children.map((c) => c._id);

      for (let child of children) {
        const subChildIds = await getAllChildCategories(child._id);
        ids = ids.concat(subChildIds);
      }

      return ids;
    };

    const nestedCategoryIds = await getAllChildCategories(category._id);
    const allCategoryIds = [category._id, ...nestedCategoryIds];

    // Fetch products from all categories (parent + children)
    const products = await Product.find({
      category: { $in: allCategoryIds },
      storeId,
    })
      .populate('category', 'name slug')
      .exec();

    console.log('Products found:', products);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Get products by category error:', error);
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
        error: 'Missing store ID',
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required',
      });
    }

    const product = await Product.findOne({
      _id: productId,
      storeId,
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};
