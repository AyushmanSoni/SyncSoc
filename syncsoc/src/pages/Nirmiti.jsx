import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/paint.svg' 
import { FaBars, FaTimes } from 'react-icons/fa'; // Replace with your actual image path
// Replace with your actual logo path

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const societyName = 'saraswa'; // Replace with your society name dynamically if needed

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative bg-[#FFFDFB] min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-24 py-6">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-medium text-[#683B2B]">Saraswa</div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#D49E8D]">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-lg font-medium">
          <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]">Home</Link>
          <Link to={`/team/${societyName}`} className="text-[#D49E8D] hover:text-[#683B2B]">Team</Link>
          <Link to={`/events/${societyName}`} className="text-[#D49E8D] hover:text-[#683B2B]">Events</Link>
          
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={toggleMenu}>Home</Link>
          <Link to={`/team/${societyName}`} className="text-[#D49E8D] hover:text-[#683B2B]" onClick={toggleMenu}>Team</Link>
          <Link to={`/events/${societyName}`} className="text-[#D49E8D] hover:text-[#683B2B]" onClick={toggleMenu}>Events</Link>
          
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 min-h-[70vh] mb-16">
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className='text-4xl md:text-6xl font-bold text-[#683B2B]'>Creativity</h1>
          <h1 className="text-4xl mt-4 md:text-6xl font-bold text-[#683B2B]">
          Expression<br/>
            <span className="text-[#D49E8D]">Masterpiece!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mt-4 w-[80%]">
          Welcome to our fine arts society, where every brushstroke and creation is a celebration of beauty, expression, and imagination.
          </p>
          <div className="mt-8 space-x-4">
            {/* Link to the Events page with the society name */}
            <Link 
              to={`/events/${societyName}`} 
              className="bg-[#683B2B] text-white py-3 px-12 text-lg rounded-lg hover:bg-[#4A291B] transition duration-300"
            >
              Events
            </Link>
            <button className="bg-transparent border-2 border-[#683B2B] text-[#683B2B] text-lg py-3 px-10 rounded-md hover:text-[#4A291B] transition duration-300">
              Gallery
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img
            src={image} // Replace with your actual image path
            alt="Your Image"
            className="w-[70%] h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
