import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import image from '../assets/Group 1.svg'; // Replace with your actual image path
import logo from '../assets/rang.svg'; // Replace with your actual logo path

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToTeam = () => {
    const societyName = 'gravity'; // Replace with your society name
    navigate(`/team/${societyName}`);
    setMenuOpen(false); // Close menu after navigating
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <div className="relative bg-white min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-24 py-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Rangtarangini Logo" className="h-12 text-[#683B2B]" />
          <div className="text-2xl font-medium text-[#683B2B]">Gravity</div>
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
          <button 
            onClick={handleNavigateToTeam}
            className="text-[#D49E8D] hover:text-[#683B2B]"
          >
            Team
          </button>
          <a href="#services" className="text-[#D49E8D] hover:text-[#683B2B]">Events</a>
          <a href="#contact" className="text-[#D49E8D] hover:text-[#683B2B]">Contact</a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={() => setMenuOpen(false)}>Home</Link>
          <button onClick={handleNavigateToTeam} className="text-[#D49E8D] hover:text-[#683B2B]">
            Team
          </button>
          <a href="#services" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#contact" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 min-h-[70vh] mb-16"> {/* Adjusted min height and added margin-bottom */}
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-10 md:mb-0"> {/* Added bottom margin for spacing */}
          <h1 className='text-4xl md:text-6xl font-bold text-[#683B2B]'>Science</h1>
          <h1 className="text-4xl mt-4 md:text-6xl font-bold text-[#683B2B]">
            Creativity<br/>
            <span className="text-[#D49E8D] mt-4">Solutions!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mt-4 w-[80%]">
            Welcome to Gravity, where creativity meets science, and every challenge is met with innovative solutions.
          </p>

          <div className="mt-8 space-x-4">
            <button className="bg-[#683B2B] text-white py-3 px-12 text-lg rounded-lg hover:bg-[#4A291B] transition duration-300">
              Events
            </button>
            <button className="bg-transparent border-2 border-[#683B2B] text-[#683B2B] text-lg py-3 px-10 rounded-md hover:text-[#4A291B] transition duration-300">
              Gallery
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center mb-16 md:mb-0">
          <img
            src={image} // Replace with your actual image path
            alt="Your Image"
            className="w-[90%] h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
