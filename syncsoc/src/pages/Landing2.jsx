import React, { useState } from 'react';
import img2 from '../assets/cultural.svg'; // Ensure this path is correct

const CulturalSocieties = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-[#FFFDFB] p-8 font-sans h-screen">
      {/* Centered Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4B2C20] pb-2 border-b-2 border-[#4B2C20] inline-block">
          Cultural Societies
        </h1>
      </div>
      <div className='h-auto lg:h-[75vh] flex flex-col lg:flex-row-reverse bg-[#FFFDFB]'>
        <div className='w-full lg:w-1/2 flex flex-col justify-center p-4 mx-auto lg:pl-[100px]'>
          <div className="flex flex-col">
            <div className="text-[#8B4513] text-xl md:text-2xl" style={{ lineHeight: '1.6', paddingRight: '25%' }}>
              Discover cultural vibrancy with Rangtarangini, Geneticxcrew, Virtuosi, Sarasva, and Nirmiti. Join us in celebrating art, music, and dance through diverse expressions. Unite with fellow enthusiasts to ignite creativity and foster lasting connections.
            </div>
          </div>
          <div className="text-left mt-8 relative">
            <button
              onClick={toggleDropdown}
              className="bg-[#8B4513] text-white px-6 py-3 text-lg font-bold rounded-lg"
            >
              Explore More
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 border border-[#8B4513] rounded-lg shadow-lg w-full z-10">
                <ul className="bg-white">
                  <li className="px-6 py-3 hover:bg-[#f5f5f5] cursor-pointer">Option 1</li>
                  <li className="px-6 py-3 hover:bg-[#f5f5f5] cursor-pointer">Option 2</li>
                  <li className="px-6 py-3 hover:bg-[#f5f5f5] cursor-pointer">Option 3</li>
                  <li className="px-6 py-3 hover:bg-[#f5f5f5] cursor-pointer">Option 4</li>
                  <li className="px-6 py-3 hover:bg-[#f5f5f5] cursor-pointer">Option 5</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='relative h-auto lg:h-full w-full lg:w-[40%]'>
          <div className='absolute top-12 lg:top-6 left-6 lg:mt-20 w-full h-[70%] bg-[#b0725c] rounded-r-[110px]' />
          <img 
            className='absolute top-16 lg:top-16 mt-2 lg:mt-4 right w-full h-auto lg:w-[100%] lg:h-[70%] object-cover rounded-r-[100px]' 
            src={img2} 
            alt='Illustration' 
          />
        </div>
      </div>
    </div>
  );
};

export default CulturalSocieties;
