import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-80 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('https://example.com/your-hero-image.jpg')` }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-md">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Explore, Engage, Excel</h1>
          <p className="text-lg md:text-xl text-gray-200 text-center mt-4">Connecting you with the heart of campus life.</p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="px-8 md:px-16 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          We are a platform dedicated to helping students explore all the societies in our college, register for exciting events and interviews, and actively participate in campus activities. Our mission is to make it easier for you to engage with the campus community, discover new interests, and contribute your skills.
        </p>
      </div>

      {/* Features Section */}
      <div className="px-8 md:px-16 py-12 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What We Offer</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Explore Societies</h3>
              <p className="text-gray-700">
                Browse through all college societies, learn about their activities, and find the perfect fit for your interests.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Register for Events</h3>
              <p className="text-gray-700">
                Stay updated with upcoming events and interviews. Register directly through our platform to secure your spot.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Volunteer Selection</h3>
              <p className="text-gray-700">
                Interested in contributing? Apply for volunteer positions in various societies and gain valuable experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="px-8 md:px-16 py-12 text-center bg-[#683B2B] text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us Today</h2>
        <p className="text-lg md:text-xl mb-8">
          Ready to dive into the campus community? Start exploring now and be a part of something great.
        </p>
        <button className="bg-white text-[#683B2B] py-2 px-8 rounded-lg font-medium hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
