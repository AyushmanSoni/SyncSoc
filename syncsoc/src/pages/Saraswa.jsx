import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/literature.svg";
import logo from "../assets/rang.svg"; // replace with your actual logo path

const HeroSection = () => {
  const societyName = "saraswa"; // Set the society name for Saraswa
  const [isOpen, setIsOpen] = useState(false); // State for managing the mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-[#FFFDFB] h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-24 py-6">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-medium text-[#683B2B] ">
            Saraswa
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#D49E8D]">
            {isOpen ? "✖" : "☰"} {/* Simple toggle icon */}
          </button>
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex space-x-12 text-lg font-medium ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]">
            Home
          </Link>
          <Link
            to={`/team/${societyName}`}
            className="text-[#D49E8D] hover:text-[#683B2B]"
          >
            Team
          </Link>
          <Link
            to={`/events/${societyName}`}
            className="text-[#D49E8D] hover:text-[#683B2B]"
          >
            Events
          </Link>
          <a href="#contact" className="text-[#D49E8D] hover:text-[#683B2B]">
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link
            to="/"
            className="block px-4 py-2 text-[#D49E8D] hover:bg-[#D49E8D] hover:text-white"
          >
            Home
          </Link>
          <Link
            to={`/team/${societyName}`}
            className="block px-4 py-2 text-[#D49E8D] hover:bg-[#D49E8D] hover:text-white"
          >
            Team
          </Link>
          <Link
            to={`/events/${societyName}`}
            className="block px-4 py-2 text-[#D49E8D] hover:bg-[#D49E8D] hover:text-white"
          >
            Events
          </Link>
          <a
            href="#contact"
            className="block px-4 py-2 text-[#D49E8D] hover:bg-[#D49E8D] hover:text-white"
          >
            Contact
          </a>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 h-full">
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-28 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-[#683B2B]">
            Words
          </h1>
          <h1 className="text-5xl mt-4 md:text-6xl font-bold text-[#683B2B]">
            Imagination
            <br />
            <span className="text-[#D49E8D] mt-4 inline-block">
              Stories!
            </span>{" "}
            {/* Add mt-12 and inline-block */}
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mt-4 mx-auto md:mx-0 w-full md:w-[80%]">
            Welcome to our literary society, where words come alive, inspiring
            thought, creativity, and meaningful conversations
          </p>

          <div className="mt-8 space-x-4 flex justify-center md:justify-start">
            <Link to={`/events/${societyName}`}>
              <button className="bg-[#683B2B] text-white py-3 px-12 text-lg rounded-lg hover:bg-[#4A291B] transition duration-300">
                Events
              </button>
            </Link>
            <button className="bg-transparent border-2 border-[#683B2B] text-[#683B2B] text-lg py-3 px-10 rounded-md hover:text-[#4A291B] transition duration-300">
              Gallery
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="ml-0 md:ml-20 md:mt-0 md:w-1/2 mb-36 flex justify-center">
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
