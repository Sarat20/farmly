import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const token = localStorage.getItem('vtoken');
        const response = await axios.get('http://localhost:4000/api/vendor/profile', {
          headers: { vtoken: token },
        });
        setVendor(response.data.vendor);
        setFormData(response.data.vendor);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vendor profile');
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('vtoken');
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      if (imageFile) {
        formDataToSend.append('ProfilePhoto', imageFile);
      }

      const response = await axios.put(
        'http://localhost:4000/api/vendor/update-profile',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            vtoken: token,
          },
        }
      );

      setVendor(response.data.updatedVendor);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update vendor profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const fields = [
    { label: 'Name', name: 'Name' },
    { label: 'Email', name: 'Email' },
    { label: 'Mobile Number', name: 'Mobilenumber' },
    { label: 'Farm Name', name: 'Farmname' },
    { label: 'Village', name: 'Village' },
    { label: 'District', name: 'District' },
    { label: 'State', name: 'State' },
    { label: 'Pincode', name: 'Pincode' },
    { label: 'Delivery Area', name: 'Deliveryarea' },
    { label: 'Bank Account', name: 'BankAccount' },
    { label: 'IFSC', name: 'IFSC' },
    { label: 'UPI', name: 'UPI' },
    { label: 'PAN', name: 'PAN' },
    { label: 'Aadhar', name: 'Aadhar' },
  ];

  return (
    //<div className="w-full min-h-screen bg-blue-500 p-6">
      <div className="max-w-5xl mx-auto shadow-xl bg-blue-400 rounded-lg p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Vendor Profile</h2>

        {vendor?.ProfilePhoto && (
          <div className="flex  mb-6">
            <img
              src={vendor.ProfilePhoto}
              alt="Vendor"
              className="w-28 h-28 rounded-full border object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(({ label, name }) => (
            <div key={name} className="flex items-center">
              <label className="w-36 text-gray-700 font-medium">{label}:</label>
              {editMode ? (
                <input
                  type="text"
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  className="flex-1 px-3 py-1 border rounded-md text-sm"
                />
              ) : (
                <p className="flex-1 text-sm text-gray-800">{vendor[name] || 'Not provided'}</p>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <div className="mt-4">
            <label className="block font-medium mb-1">Profile Photo:</label>
            <input type="file" onChange={handleFileChange} className="text-sm" />
          </div>
        )}

        <div className="mt-6 text-center">
          {editMode ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
   //</div>
  );
};

export default VendorProfile;
