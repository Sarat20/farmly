import ProductModel from "../models/ProductModel.js";

/**
 * Get all products with server-side pagination, filtering, sorting, projection, and lean queries.
 * Returns total count for pagination.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllProducts = async (req, res) => {
  try {
    // Server-side pagination, filtering, sorting
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const skip = (page - 1) * limit;

    const search = (req.query.search || "").trim();
    const type = (req.query.type || "").trim();
    const sort = (req.query.sort || "-CreatedAt").trim(); // e.g., "price", "-price", "CreatedAt", "-CreatedAt"

    const filter = {};
    if (type) {
      filter.Type = type;
    }
    if (search) {
      // Use text index on Name if available, else fallback to regex
      filter.$or = [
        { Name: { $regex: search, $options: "i" } },
        { Description: { $regex: search, $options: "i" } },
      ];
    }

    // Whitelist sort fields
    const sortWhitelist = new Set(["Price", "CreatedAt", "Name"]);
    let sortObj = { CreatedAt: -1 };
    if (sort) {
      const direction = sort.startsWith("-") ? -1 : 1;
      const field = sort.replace(/^-/, "");
      if (sortWhitelist.has(field)) {
        sortObj = { [field]: direction };
      }
    }

    // Parallel count + fetch
    const [total, products] = await Promise.all([
      ProductModel.countDocuments(filter),
      ProductModel.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .select("Name Type Price Quantity QuantityUnit Image Vendor CreatedAt") // projection reduces payload
        .populate("Vendor", "Name Farmname")
        .lean(), // faster read-only
    ]);

    return res.status(200).json({
      success: true,
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Get a product by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id).populate(
      "Vendor",
      "Name Farmname"
    ).lean();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
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
