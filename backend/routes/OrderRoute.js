
import express from 'express';
import { placeOrder, getUserOrders, getOrdersForVendor, updateOrderItemStatus, cancelOrderItem } from '../controllers/orderController.js';
import { authVendor } from '../middlewares/authVendor.js'; // Make sure to import it!

const router = express.Router();

router.post('/place', placeOrder);
router.get('/user/:userId', getUserOrders);
router.patch('/:orderId/items/:itemId/cancel', cancelOrderItem);

router.get('/vendor', authVendor, getOrdersForVendor); 

router.patch('/:orderId/items/:itemId', authVendor, updateOrderItemStatus); 


export default router;