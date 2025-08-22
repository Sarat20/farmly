
import express from "express";
import { getAllProducts, getProductById } from '../controllers/productController.js'

const productRouter = express.Router();


productRouter.get("/all-products", getAllProducts);


productRouter.get("/:id", getProductById);

export default productRouter;
