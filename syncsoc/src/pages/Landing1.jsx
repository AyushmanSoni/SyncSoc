import React, { useState } from 'react';

const Landing1 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white p-6 font-sans">
      <h1 className="text-3xl text-brown-400 border-b-2 border-brown-800 inline-block mb-6">
        Technical Societies
      </h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col justify-between flex-1 md:mr-4">
          <div className="text-brown-600 text-right p-2">
            Welcome to our Technical Societies page, where innovation meets collaboration. Dive into Geekhaven, Tesla, and Gravity for tech-driven adventures. Join us as we shape the future of technology together and explore the forefront of innovation.
          </div>
          <div className="mt-4">
            <button
              onClick={toggleDropdown}
              className="bg-brown-800 text-white px-4 py-2 rounded"
            >
              Explore More
            </button>
            {isDropdownOpen && (
              <div className="mt-2 border border-brown-800 rounded shadow-lg">
                <ul className="bg-white">
                  <li className="px-4 py-2 hover:bg-brown-100 cursor-pointer">Option 1</li>
                  <li className="px-4 py-2 hover:bg-brown-100 cursor-pointer">Option 2</li>
                  <li className="px-4 py-2 hover:bg-brown-100 cursor-pointer">Option 3</li>
                  <li className="px-4 py-2 hover:bg-brown-100 cursor-pointer">Option 4</li>
                  <li className="px-4 py-2 hover:bg-brown-100 cursor-pointer">Option 5</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <img
            src="https://t4.ftcdn.net/jpg/00/43/64/51/360_F_43645148_tyVMgFvaLyP7w4K0hiaZSyqKJhxX7Apr.jpg"
            alt="Technical Societies"
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing1;

