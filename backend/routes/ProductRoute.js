// routes/ProductRoute.js
import express from "express";
import { getAllProducts, getProductById } from '../controllers/productController.js'

const productRouter = express.Router();

// Fetch all products
productRouter.get("/all-products", getAllProducts);

// Fetch one product by ID (dynamic route)
productRouter.get("/:id", getProductById);

export default productRouter;
