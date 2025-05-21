// import mongoose from 'mongoose';

// const OrderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   vendor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Vendor',
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
//     default: 'Pending',
//   },
// });

// const OrderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   items: [OrderItemSchema],
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   placedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Order', OrderSchema);
// models/OrderModel.js
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // e.g. Pending, Shipped, Delivered
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

export default mongoose.model('Order', OrderSchema);
