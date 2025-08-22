import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  Vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  Name: { type: String, required: true },
  Description: { type: String },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  QuantityUnit: {
    type: String,
    enum: ["kgs", "items"],
    required: true,
  },
  Type: {
    type: String,
    enum: [
      "Fresh Produce",
      "Seeds & Saplings",
      "Dry & Raw Produce",
      "Farm-Made Products",
    ],
    required: true,
  },
  Image: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
});

// Indexes for faster queries and sorts
ProductSchema.index({ CreatedAt: -1 });
ProductSchema.index({ Type: 1, CreatedAt: -1 });
ProductSchema.index({ Price: 1 });
ProductSchema.index({ Vendor: 1, CreatedAt: -1 });
// Text index to support name/description search
ProductSchema.index({ Name: "text", Description: "text" });

export default mongoose.model("Product", ProductSchema);
