import React from 'react';

const About = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">About Farmly</h1>
      <p className="text-gray-700 leading-relaxed">
        Farmly is a dedicated platform built to bridge the gap between farmers and consumers by offering a seamless online marketplace for agro products.
        Our goal is to empower farmers and small-scale producers by providing them with the tools they need to sell directly to customers without middlemen.
      </p>
      <p className="text-gray-700 mt-4 leading-relaxed">
        From fresh produce and seeds to farm-made goods, Farmly supports a wide variety of agricultural products.
        We aim to support sustainable farming, increase farmer incomes, and deliver quality products to consumers.
      </p>
      <p className="text-gray-700 mt-4 leading-relaxed">
        At Farmly, we believe in transparency, fair trade, and building a community that values the hands that feed us.
      </p>

      <section className="mt-10 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Meet the Creator</h2>
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <img
           src="https://res.cloudinary.com/drbgvjxmt/image/upload/v1747752520/dp_h60uvq.jpg" // Replace with your actual image path or Cloudinary URL
            alt="Kalagara Sarat Kumar"
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border shadow"
          />
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed">
              Hi, I'm <strong>Kalagara Sarat Kumar</strong>, a B.Tech student at IIIT Kottayam and a passionate full-stack developer.
              I built Farmly to empower farmers and digitize the agro product market through modern web technologies.
            </p>
            <p className="text-gray-700 mt-2 leading-relaxed">
              I'm always open to feedback, collaboration, or just a good tech conversation.
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:saratkumarkalagara2398s@gmail.com" className="text-blue-600 underline break-all">
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
