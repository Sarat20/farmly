import React, { useState } from 'react';
import axios from 'axios';

const VendorAddProduct = () => {
    const [productData, setProductData] = useState({
        Name: '',
        Description: '',
        Price: '',
        Quantity: '',
        Type: 'Fresh Produce',
        QuantityUnit: 'kgs',
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('vtoken');
        if (!token) {
            alert("You must be logged in to add a product!");
            return;
        }

        const formData = new FormData();
        formData.append('Name', productData.Name);
        formData.append('Description', productData.Description);
        formData.append('Price', productData.Price);
        formData.append('Quantity', productData.Quantity);
        formData.append('Type', productData.Type);
        formData.append('QuantityUnit', productData.QuantityUnit);
        if (image) formData.append('Image', image);

        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/vendor/add-product`,
                formData,
                {
                    headers: {
                        'vtoken': token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setLoading(false);
            alert(response.data.message);
        } catch (error) {
            setLoading(false);
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    return (
        <div className='flex justify-center mt-15'>
            <div className="p-4 w-1/2 items-center bg-white shadow-md rounded">
                <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="Name"
                            value={productData.Name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Description:</label>
                        <textarea
                            name="Description"
                            value={productData.Description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Price:</label>
                        <input
                            type="number"
                            name="Price"
                            value={productData.Price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Quantity:</label>
                        <input
                            type="number"
                            name="Quantity"
                            value={productData.Quantity}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Quantity Unit */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Unit:</label>
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="QuantityUnit"
                                    value="kgs"
                                    checked={productData.QuantityUnit === 'kgs'}
                                    onChange={handleChange}
                                /> Kgs
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="QuantityUnit"
                                    value="items"
                                    checked={productData.QuantityUnit === 'items'}
                                    onChange={handleChange}
                                /> Items
                            </label>
                        </div>
                    </div>

                    {/* Type */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Type:</label>
                        <select
                            name="Type"
                            value={productData.Type}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                            <option value="Fresh Produce">Fresh Produce</option>
                            <option value="Seeds & Saplings">Seeds & Saplings</option>
                            <option value="Dry & Raw Produce">Dry & Raw Produce</option>
                            <option value="Farm-Made Products">Farm-Made Products</option>
                        </select>
                    </div>

                    {/* Image */}
                    <div className="mb-3 flex items-center gap-4">
                        <label className="w-24 text-gray-700">Image:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 disabled:bg-gray-400 text-sm"
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorAddProduct;
