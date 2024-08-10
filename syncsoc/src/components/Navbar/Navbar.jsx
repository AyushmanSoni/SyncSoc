import React, { useState } from 'react';
import { FaGripLines } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: 'Home', link: '/' },
    { title: 'Societies', link: '/societies' },
    { title: 'All Events', link: '/all-events' },
    { title: 'Fests', link: '/fests' },
    { title: 'About Us', link: '/profile' }
  ];

  return (
    <div className='bg-[#FFFDFB] text-[#F9F6F3] px-4 md:px-24 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='h-10 me-4' src='https://www.svgrepo.com/show/458732/group.svg' alt='logo' />
          <h1 className='text-2xl font-semibold text-[#683B2B]'>
            Sync<span className='text-[#2E1A12]'>Soc</span>
          </h1>
        </div>
        <button
          className='md:hidden text-gray-500 text-2xl ml-4'
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaGripLines />
        </button>
        <div className={`hidden md:flex md:flex-grow md:justify-center md:items-center`}>
          <div className='flex flex-col md:flex-row md:gap-8 text-[#683B2B] font-medium'>
            {links.map((items, i) => (
              <Link to={items.link} key={i} className='px-4 py-2 '>
                {items.title}
              </Link>
            ))}
          </div>
        </div>
        <div className='hidden md:flex md:items-center md:gap-8'>
          <Link to="/login" className='px-4 py-2 text-[#683B2B] font-medium hover:text-[#2E1A12]'>
            LogIn
          </Link>
          <Link to="/signup" className='px-4 py-2 bg-[#683B2B] text-white border rounded-lg hover:bg-[#2E1A12]'>
            SignUp
          </Link>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <div className='flex flex-col items-start gap-4'>
          {links.map((item, i) => (
            <a key={i} href={item.link} className='px-4 py-2 text-gray-700 hover:text-[#086D8A]'>
              {item.title}
            </a>
          ))}
          <a href='/login' className='px-4 py-2 text-[#683B2B] hover:text-[#2E1A12]'>
            LogIn
          </a>
          <a href='/signup' className='px-4 py-2 bg-[#683B2B] text-white border rounded-lg hover:bg-[#2E1A12]'>
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
