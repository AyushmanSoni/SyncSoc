import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import image from '../assets/Group 1.svg';
import logo from '../assets/rang.svg'; // replace with your actual logo path

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToTeam = () => {
    const societyName = 'AMS'; // replace with your society name
    navigate(`/team/${societyName}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative bg-white min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-24 py-6">
        <div className="flex items-center space-x-4">
          
          <div className="text-lg md:text-2xl font-medium text-[#683B2B]">Acoustic and Media</div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#D49E8D]">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 md:space-x-12 text-base md:text-lg font-medium">
          <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]">Home</Link>
          <button onClick={handleNavigateToTeam} className="text-[#D49E8D] hover:text-[#683B2B]">Team</button>
          <a href="#services" className="text-[#D49E8D] hover:text-[#683B2B]">Events</a>
          <a href="#contact" className="text-[#D49E8D] hover:text-[#683B2B]">Contact</a>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center space-y-4 py-4 md:hidden">
            <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={toggleMenu}>Home</Link>
            <button onClick={() => { handleNavigateToTeam(); toggleMenu(); }} className="text-[#D49E8D] hover:text-[#683B2B]">Team</button>
            <a href="#services" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={toggleMenu}>Events</a>
            <a href="#contact" className="text-[#D49E8D] hover:text-[#683B2B]" onClick={toggleMenu}>Contact</a>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-6 md:py-12">
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-[#683B2B]">Capture</h1>
          <h1 className="text-4xl mt-2 md:mt-4 md:text-6xl font-bold text-[#683B2B]">
            Frame<br />
            <span className="text-[#D49E8D]">Color!</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 mt-4 md:w-[80%]">
            Welcome to our photography society, where every captured moment reveals a new perspective and freezes time in stunning clarity.
          </p>

          <div className="mt-6 md:mt-8 space-x-4">
            <button className="bg-[#683B2B] text-white py-2 md:py-3 px-8 md:px-12 text-base md:text-lg rounded-lg hover:bg-[#4A291B] transition duration-300">
              Events
            </button>
            <button className="bg-transparent border-2 border-[#683B2B] text-[#683B2B] text-base md:text-lg py-2 md:py-3 px-8 md:px-10 rounded-md hover:text-[#4A291B] transition duration-300">
              Gallery
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2">
          <img
            src={image}
            alt="Photography"
            className="w-full h-auto max-w-[80%] md:max-w-[90%] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
