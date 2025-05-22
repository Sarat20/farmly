import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Vendorlogin = () => {
  const [state, setState] = useState('Login');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentDataUse, setConsentDataUse] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const isFormValid = agreeTerms && consentDataUse;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const { email, password } = formData;
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vendor/login`, {
        Email: email,
        Password: password,
      });

      if (response.data.token) {
        localStorage.setItem("vtoken", response.data.token);
        localStorage.removeItem('token'); 
        alert('Login successful!');
        navigate('/vendor/dashboard');
      } else {
        setErrorMsg('No token received. Please try again.');
      }

      setFormData({});
      setAgreeTerms(false);
      setConsentDataUse(false);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const form = new FormData();
      form.append('Name', formData.name);
      form.append('Email', formData.email);
      form.append('Password', formData.password);
      form.append('Mobilenumber', formData.phone);
      form.append('Farmname', formData.farmName);
      form.append('Village', formData.village);
      form.append('District', formData.district);
      form.append('State', formData.state);
      form.append('Pincode', formData.pincode);
      form.append('Deliveryarea', formData.deliveryAddress || '');
      form.append('BankAccount', formData.accountNumber);
      form.append('IFSC', formData.ifsc);
      form.append('UPI', formData.upi || '');
      form.append('PAN', formData.pan);
      form.append('Aadhar', formData.aadhaar);

      if (profilePhoto) {
        form.append('ProfilePhoto', profilePhoto);
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vendor/register`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.token) {
        localStorage.setItem("vtoken", response.data.token);
        localStorage.removeItem('token'); 
        alert('Registration successful!');
        navigate('/vendor/dashboard');
      } else {
        setErrorMsg('No token received. Please try again.');
      }

      setFormData({});
      setProfilePhoto(null);
      setAgreeTerms(false);
      setConsentDataUse(false);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputField = ({ name, label, type = 'text', placeholder }) => (
    <div>
      <label className="block mb-1 cursor-pointer">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border border-black px-3 py-2 rounded outline-none"
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center py-4 bg-white">
      <div className={`border border-black rounded-xl p-8 w-full ${state === 'Login' ? 'max-w-sm' : 'max-w-3xl'}`}>
        <h2 className="text-3xl font-bold text-center mb-6">
          {state === 'SignUp' ? 'Farmer Registration' : 'Vendor Login'}
        </h2>

        <div className="mb-6 text-center text-sm">
          {state === 'Login' ? (
            <p>
              New vendor?{' '}
              <span onClick={() => setState('SignUp')} className="text-green-600 underline cursor-pointer">
                Register here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className="text-blue-600 underline cursor-pointer">
                Login here
              </span>
            </p>
          )}
        </div>

        {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}

        {/* ---------- Login Form ---------- */}
        {state === 'Login' && (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            {inputField({ name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' })}
            {inputField({ name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' })}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {/* ---------- Registration Form ---------- */}
        {state === 'SignUp' && (
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <div>
              <h3 className="font-semibold mb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputField({ name: 'name', label: 'Name', placeholder: 'Enter Name' })}
                {inputField({ name: 'phone', label: 'Mobile Number', placeholder: 'Enter Phone Number' })}
              </div>
              <div className="mt-2">
                <label className="block mb-1 cursor-pointer">Profile Photo (Optional)</label>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full border border-black px-3 py-2 rounded outline-none"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Farm & Address Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputField({ name: 'farmName', label: 'Farm Name', placeholder: 'Enter Farm Name' })}
                {inputField({ name: 'village', label: 'Village', placeholder: 'Enter Village' })}
                {inputField({ name: 'district', label: 'District', placeholder: 'Enter District' })}
                {inputField({ name: 'state', label: 'State', placeholder: 'Enter State' })}
                {inputField({ name: 'pincode', label: 'Pincode', placeholder: 'Enter Pincode' })}
                <div className="md:col-span-2">
                  <label className="block mb-1 cursor-pointer">Delivery Address (Optional)</label>
                  <textarea
                    name="deliveryAddress"
                    value={formData.deliveryAddress || ''}
                    onChange={handleInputChange}
                    placeholder="Enter Address"
                    className="w-full border border-black px-3 py-2 rounded outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputField({ name: 'accountNumber', label: 'Bank Account Number', type: 'number', placeholder: 'Enter Account Number' })}
                {inputField({ name: 'ifsc', label: 'IFSC Code', placeholder: 'Enter IFSC' })}
                {inputField({ name: 'upi', label: 'UPI ID (Optional)', placeholder: 'Enter UPI ID' })}
                {inputField({ name: 'pan', label: 'PAN Card', placeholder: 'Enter PAN' })}
                {inputField({ name: 'aadhaar', label: 'Aadhaar Number', placeholder: 'Enter Aadhaar' })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Login Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputField({ name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' })}
                {inputField({ name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="mt-1"
                />
                <span>
                  I agree to the{' '}
                  <a href="/terms" target="_blank" className="text-blue-600 underline">
                    Terms and Conditions
                  </a>{' '}
                  of Farmly.
                </span>
              </label>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentDataUse}
                  onChange={() => setConsentDataUse(!consentDataUse)}
                  className="mt-1"
                />
                <span>
                  I consent to the use of my data by Farmly for platform operations, logistics, and service improvements.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full text-white font-semibold py-2 rounded transition ${isFormValid && !loading ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Vendorlogin;