// backend/routes/orderRoutes.js (or wherever your order routes are defined)

import express from 'express';
import { placeOrder, getUserOrders, getOrdersForVendor, updateOrderItemStatus, cancelOrderItem } from '../controllers/orderController.js';

const router = express.Router();

// User routes
router.post('/place', placeOrder);
router.get('/user/:userId', getUserOrders);
router.patch('/:orderId/items/:itemId/cancel', cancelOrderItem); // NEW ROUTE FOR USER CANCELLATION

// Vendor routes
router.get('/vendor/:vendorId', getOrdersForVendor);
router.patch('/:orderId/items/:itemId', updateOrderItemStatus); // Existing route for vendor status update

export default router;