// controllers/ProductController.js
import ProductModel from "../models/ProductModel.js";

/**
 * GET /api/products/all-products
 * Returns all products sorted by creation date (most recent first),
 * populated with Vendor’s Name & Farmname.
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .sort({ CreatedAt: -1 })
      .populate("Vendor", "Name Farmname"); // only populate Name & Farmname

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * GET /api/products/:id
 * Returns a single product by its ID (req.params.id),
 * populated with Vendor’s Name & Farmname.
 */
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id).populate(
      "Vendor",
      "Name Farmname"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { getAllProducts, getProductById };
