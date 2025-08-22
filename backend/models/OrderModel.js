import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, 
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  address: {
    line1: String,
    city: String,
    pincode: String,
  },
  phone: String,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now },
});

// Indexes to speed up queries used in controllers
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ 'items.vendor': 1, createdAt: -1 });
OrderSchema.index({ createdAt: -1 });

export default mongoose.model('Order', OrderSchema);
