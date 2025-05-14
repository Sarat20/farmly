import React, { useState } from 'react';
import axios from 'axios';

const VendorAddProduct = () => {
    const [productData, setProductData] = useState({
        Name: '',
        Description: '',
        Price: '',
        Quantity: '',
        Type: 'Fresh Produce', // default type, change as needed
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('vtoken'); // Get token from localStorage
        if (!token) {
            alert("You must be logged in to add a product!");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('Name', productData.Name);
        formData.append('Description', productData.Description);
        formData.append('Price', productData.Price);
        formData.append('Quantity', productData.Quantity);
        formData.append('Type', productData.Type);
        if (image) {
            formData.append('Image', image);
        }

        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:4000/api/vendor/add-product',
                formData,
                {
                    headers: {
                        'vtoken': token,  // Send token in headers as 'vtoken'
                        'Content-Type': 'multipart/form-data', // Specify content type for file upload
                    },
                }
            );

            setLoading(false);
            alert(response.data.message); // Show success or error message from backend
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
                <div className="mb-3 flex items-center gap-4">
                    <label className="block text-gray-700 w-24">Name:</label>
                    <input
                        type="text"
                        name="Name"
                        value={productData.Name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                </div>

                <div className="mb-3 flex items-center gap-4">
                    <label className="block text-gray-700 w-24">Description:</label>
                    <textarea
                        name="Description"
                        value={productData.Description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                </div>

                <div className="mb-3 flex items-center gap-4">
                    <label className="block text-gray-700 w-24">Price:</label>
                    <input
                        type="number"
                        name="Price"
                        value={productData.Price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                </div>

                <div className="mb-3 flex items-center gap-4">
                    <label className="block text-gray-700 w-24">Quantity:</label>
                    <input
                        type="number"
                        name="Quantity"
                        value={productData.Quantity}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                </div>

                <div className="mb-3 flex items-center gap-4">
                    <label className="block text-gray-700 w-24">Type:</label>
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

                <div className="mb-3 flex items-center gap-4">
                    <label className="block text-gray-700 w-24">Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                </div>

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
