import React from 'react';

const VendorSupport = () => {
  return (
    <div className="p-6">
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
        <ul className="list-disc pl-5 space-y-4">
          <li>
            <p className="font-medium">How do I add a new product?</p>
            <p className="text-gray-700 ml-4">
              Login to your vendor dashboard and navigate to "Add Product" from the sidebar. Fill in the product details including name, type, price, quantity, and upload an image. Click "Submit" to list it.
            </p>
          </li>
          <li>
            <p className="font-medium">Where can I see my payments?</p>
            <p className="text-gray-700 ml-4">
              Go to your vendor dashboard and click on "Payments" in the sidebar. You will see a list of all your completed orders along with payment details including amount, status, and date.
            </p>
          </li>
          <li>
            <p className="font-medium">How do I contact customer service?</p>
            <p className="text-gray-700 ml-4">
              You can reach out to us via the contact details provided below. We’re available Monday to Saturday from 10AM to 6PM.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
        <p className="text-gray-700">
          Email: <a
            href="mailto:support@farmly.com"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            support@farmly.com
          </a>
        </p>
        <p className="text-gray-700">
          Phone: <a
            href="tel:+918688632729"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            +91-86886-32729
          </a>
        </p>
        <p className="text-gray-700">Working Hours: 10AM - 6PM (Mon - Sat)</p>
      </section>
    </div>
  );
};

export default VendorSupport;
