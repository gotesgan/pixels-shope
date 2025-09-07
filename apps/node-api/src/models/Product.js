import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    storeId: { type: String, required: true, index: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    image: { type: String, required: true },
    images: [String],

    features: [String], // ✅ List of bullet-point features
    specifications: [mongoose.Schema.Types.Mixed], // ✅ Array of key-value or object specs
    featuresStrip: [String], // ✅ Short feature highlights
  },
  { timestamps: true }
);

// Store-scoped unique slugs
productSchema.index({ slug: 1, storeId: 1 }, { unique: true });
// Index for common queries
productSchema.index({ storeId: 1, category: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
