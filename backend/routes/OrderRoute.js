// backend/routes/orderRoutes.js
import express from 'express';
import { placeOrder, getUserOrders, getOrdersForVendor, updateOrderItemStatus, cancelOrderItem } from '../controllers/orderController.js';
import { authVendor } from '../middlewares/authVendor.js'; // Make sure to import it!

const router = express.Router();

// User routes (no change)
router.post('/place', placeOrder);
router.get('/user/:userId', getUserOrders);
router.patch('/:orderId/items/:itemId/cancel', cancelOrderItem);

// Vendor routes
// OLD LINE: router.get('/vendor/:vendorId', getOrdersForVendor); // <-- REMOVE THIS LINE!

// NEW LINE: Apply authVendor middleware and remove :vendorId from the URL
router.get('/vendor', authVendor, getOrdersForVendor); 

// For updateOrderItemStatus, also apply authVendor middleware for security
// OLD LINE: router.patch('/:orderId/items/:itemId', updateOrderItemStatus); // <-- REMOVE THIS LINE!

// NEW LINE: Only an authenticated vendor can update item status
router.patch('/:orderId/items/:itemId', authVendor, updateOrderItemStatus); 


export default router;