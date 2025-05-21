import React from 'react';

const Contact = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Farmly</h1>
      <p className="text-gray-700 mb-2">
        Have questions or need help? Reach out to the Farmly team — we’re here to assist farmers, vendors, and customers alike.
      </p>
      <ul className="text-gray-700 space-y-1">
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:saratkumarkalagara2398s@gmail.com" className="text-blue-600 underline">
            saratkumarkalagara2398s@gmail.com
          </a>
        </li>
        <li><strong>Phone:</strong> +91-98765-43210</li>
        <li><strong>Working Hours:</strong> 10AM - 6PM (Mon - Sat)</li>
        <li><strong>Address:</strong> IIIT Kottayam, Kerala, India</li>
      </ul>
    </div>
  );
};

export default Contact;
