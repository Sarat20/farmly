import React from 'react';

const About = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">About Farmly</h1>
      <p className="text-gray-700">
        Farmly is a dedicated platform built to bridge the gap between farmers and consumers by offering a seamless online marketplace for agro products.
        Our goal is to empower farmers and small-scale producers by providing them with the tools they need to sell directly to customers without middlemen.
      </p>
      <p className="text-gray-700 mt-4">
        From fresh produce and seeds to farm-made goods, Farmly supports a wide variety of agricultural products.
        We aim to support sustainable farming, increase farmer incomes, and deliver quality products to consumers.
      </p>
      <p className="text-gray-700 mt-4">
        At Farmly, we believe in transparency, fair trade, and building a community that values the hands that feed us.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Meet the Creator</h2>
        <div className="flex items-start gap-4">
          <img
           src="https://res.cloudinary.com/drbgvjxmt/image/upload/v1747752520/dp_h60uvq.jpg" // Replace with your actual image path or Cloudinary URL
            alt="Kalagara Sarat Kumar"
            className="w-28 h-28 object-cover rounded-full border"
          />
          <div>
            <p className="text-gray-700">
              Hi, I'm <strong>Kalagara Sarat Kumar</strong>, a B.Tech student at IIIT Kottayam and a passionate full-stack developer.
              I built Farmly to empower farmers and digitize the agro product market through modern web technologies.
            </p>
            <p className="text-gray-700 mt-2">
              I'm always open to feedback, collaboration, or just a good tech conversation.
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:saratkumarkalagara2398s@gmail.com" className="text-blue-600 underline">
                saratkumarkalagara2398s@gmail.com
              </a>
            </p>
            <p className="mt-1 text-gray-700">
              <strong>College:</strong> Indian Institute of Information Technology (IIIT) Kottayam
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
