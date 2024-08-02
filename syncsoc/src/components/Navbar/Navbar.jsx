import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: 'Home', link: '/' },
    { title: 'Societies', link: '/all-books' },
    { title: 'Event', link: '/cart' },
    { title: 'About', link: '/profile' },
    { title: 'Fests', link: '/fests' }
  ];

  return (
    <div className='bg-[#FFFDFB] text-[#F9F6F3] px-4 md:px-24 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='h-10 me-4' src='https://www.svgrepo.com/show/458732/group.svg' alt='logo' />
          <h1 className='text-2xl font-semibold text-[#086D8A]'>
            Sync<span className='text-[#032B37]'>Soc</span>
          </h1>
        </div>
        <button
          className='md:hidden text-gray-500 text-2xl ml-4'
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaGripLines />
        </button>
        <div className={`hidden md:flex md:flex-grow md:justify-center md:items-center`}>
          <div className='flex flex-col md:flex-row md:gap-8 text-[#F9F6F3]'>
            {links.map((item, i) => (
              <div key={i} className='px-4 py-2 '>
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className='hidden md:flex md:items-center md:gap-8'>
          <div className='px-4 py-2 text-[#086D8A] hover:text-[#075A71]'>
            LogIn
          </div>
          <div className='px-4 py-2 bg-[#086D8A] text-white border rounded-lg hover:bg-[#075A71]'>
            SignUp
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <div className='flex flex-col items-start gap-4'>
          {links.map((item, i) => (
            <div key={i} className='px-4 py-2 hover:text-[#075A71]'>
              {item.title}
            </div>
          ))}
          <div className='px-4 py-2 text-[#086D8A] hover:text-[#075A71]'>
            LogIn
          </div>
          <div className='px-4 py-2 bg-[#086D8A] text-white border rounded-lg hover:bg-[#075A71]'>
            SignUp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
