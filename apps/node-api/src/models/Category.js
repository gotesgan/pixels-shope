import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

// Store-scoped unique slugs
categorySchema.index({ slug: 1, storeId: 1 }, { unique: true });
// Index for hierarchical queries
categorySchema.index({ storeId: 1, parent: 1 });

const Category = mongoose.model("Category", categorySchema);
export default Category;