import React from 'react';

const VendorSupport = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Support</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <ul className="list-disc pl-5">
          <li>How do I add a new product?</li>
          <li>Where can I see my payments?</li>
          <li>How do I contact customer service?</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Contact Support</h2>
        <form className="grid grid-cols-1 gap-4 max-w-md">
          <input type="text" placeholder="Subject" className="p-2 border rounded" />
          <textarea placeholder="Describe your issue" rows="4" className="p-2 border rounded"></textarea>
          <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600">Submit</button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact Info</h2>
        <p>Email: support@yourplatform.com</p>
        <p>Phone: +91-98765-43210</p>
        <p>Working Hours: 10AM - 6PM (Mon - Sat)</p>
      </section>
    </div>
  );
};

export default VendorSupport;
