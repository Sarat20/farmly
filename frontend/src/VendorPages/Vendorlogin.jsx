import React, { useState } from 'react';

const Vendorlogin = () => {
  const [state, setState] = useState('Login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className={`border border-black rounded-xl p-8 w-full ${state === 'Login' ? 'max-w-sm' : 'max-w-3xl'}`}>
        <h2 className="text-3xl font-bold text-center mb-6">
          {state === 'SignUp' ? 'Farmer Registration' : 'Vendor Login'}
        </h2>

        <div className="mb-6 text-center text-sm">
          {state === 'Login' ? (
            <p>
              New vendor?{' '}
              <span
                onClick={() => setState('SignUp')}
                className="text-green-600 underline cursor-pointer"
              >
                Register here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}
        </div>

        {/* ---------- Login Form ---------- */}
        {state === 'Login' && (
          <form className="space-y-4">
            <div>
              <label className="block mb-1 cursor-pointer">Email</label>
              <input type="email" placeholder="Enter Email" className="w-full border border-black px-3 py-2 rounded outline-none" />
            </div>
            <div>
              <label className="block mb-1 cursor-pointer">Password</label>
              <input type="password" placeholder="Enter Password" className="w-full border border-black px-3 py-2 rounded outline-none" />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
              Login
            </button>
          </form>
        )}

        {/* ---------- Registration Form ---------- */}
        {state === 'SignUp' && (
          <form className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 cursor-pointer">Name</label>
                  <input type="text" placeholder="Enter Name" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">Mobile Number</label>
                  <input type="text" placeholder="Enter Phone Number" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 cursor-pointer">Profile Picture</label>
                  <input type="file" className="w-full" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Farm & Address Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 cursor-pointer">Farm Name</label>
                  <input type="text" placeholder="Enter Farm Name" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">Village</label>
                  <input type="text" placeholder="Enter Village" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">District</label>
                  <input type="text" placeholder="Enter District" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">State</label>
                  <input type="text" placeholder="Enter State" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">Pincode</label>
                  <input type="text" placeholder="Enter Pincode" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 cursor-pointer">Delivery Address (Optional)</label>
                  <textarea placeholder="Enter Address" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 cursor-pointer">Bank Account Number</label>
                  <input type="number" placeholder="Enter Account Number" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">IFSC Code</label>
                  <input type="text" placeholder="Enter IFSC" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">UPI ID (Optional)</label>
                  <input type="text" placeholder="Enter UPI ID" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">PAN Card</label>
                  <input type="text" placeholder="Enter PAN" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">Aadhaar Number</label>
                  <input type="text" placeholder="Enter Aadhaar" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Login Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 cursor-pointer">Email</label>
                  <input type="email" placeholder="Enter Email" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
                <div>
                  <label className="block mb-1 cursor-pointer">Password</label>
                  <input type="password" placeholder="Enter Password" className="w-full border border-black px-3 py-2 rounded outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start space-x-2 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span>
                  I agree to the{' '}
                  <a href="/terms" target="_blank" className="text-blue-600 underline cursor-pointer">
                    Terms and Conditions
                  </a>{' '}
                  of Farmly.
                </span>
              </label>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span>
                  I consent to the use of my data by Farmly for platform operations, logistics, and service improvements.
                </span>
              </label>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Vendorlogin;
