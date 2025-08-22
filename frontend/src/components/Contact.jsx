import React from 'react';

const Contact = () => {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Contact Farmly</h1>
      <p className="text-gray-700 mb-2 text-sm sm:text-base">
        Have questions or need help? Reach out to the Farmly team — we’re here to assist farmers, vendors, and customers alike.
      </p>
      <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:saratkumarkalagara2398s@gmail.com" className="text-blue-600 underline break-all">
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
