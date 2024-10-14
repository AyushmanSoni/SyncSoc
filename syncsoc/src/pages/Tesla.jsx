import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/Group 1.svg';
import logo from '../assets/rang.svg'; // replace with your actual logo path

const HeroSection = () => {
  const navigate = useNavigate();
  const societyName = 'Tesla'; // Set the society name for Tesla

  const handleNavigateToTeam = () => {
    navigate(`/team/${societyName}`);
  };

  return (
    <div className="relative bg-white h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-24 py-6">
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="Tesla Logo" 
            className="h-12 text-[#683B2B]" 
          />
          <div className="text-2xl font-medium text-[#683B2B]">{societyName}</div>
        </div>
        <div className="space-x-12 text-lg font-medium">
          <Link to="/" className="text-[#D49E8D] hover:text-[#683B2B]">Home</Link>
          <button 
            onClick={handleNavigateToTeam}
            className="text-[#D49E8D] hover:text-[#683B2B]"
          >
            Team
          </button>
          <Link 
            to={`/events/${societyName}`} // Link to the events of the Tesla society
            className="text-[#D49E8D] hover:text-[#683B2B]"
          >
            Events
          </Link>
          <a href="#contact" className="text-[#D49E8D] hover:text-[#683B2B]">Contact</a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 h-full">
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-28">
          <h1 className='text-4xl md:text-6xl font-bold text-[#683B2B]'>Circuits</h1>
          <h1 className="text-4xl mt-4 md:text-6xl font-bold text-[#683B2B]">
            Innovation<br/>
            <span className="text-[#D49E8D] mt-4">Future!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mt-4 w-[80%]">
            Welcome to Tesla, our electronics society, where circuits come to life, and innovation drives the future of technology.
          </p>

          <div className="mt-8 space-x-4">
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
        <div className="ml-44 md:mt-0 md:w-1/2 mb-36">
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
