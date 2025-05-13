import React, { useState } from 'react';
import axios from 'axios';

const VendorAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (let key in formData) {
        payload.append(key, formData[key]);
      }

      // Replace with actual vendorId
      payload.append('vendorId', 'VENDOR_OBJECT_ID_HERE');

      const res = await axios.post('http://localhost:5000/api/vendors/add-product', payload);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border" required />
        <select name="category" onChange={handleChange} className="w-full mb-2 p-2 border" required>
          <option value="">Select Category</option>
          <option value="Fresh Produce">🥦 Fresh Produce</option>
          <option value="Seeds & Saplings">🌱 Seeds & Saplings</option>
          <option value="Dry & Raw Produce">🥥 Dry & Raw Produce</option>
          <option value="Farm-Made Products">🧴 Farm-Made Products</option>
        </select>
        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full mb-2 p-2 border" required />
        <input name="quantity" type="text" placeholder="Quantity (e.g., 10kg)" onChange={handleChange} className="w-full mb-2 p-2 border" required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full mb-2" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default VendorAddProduct;
