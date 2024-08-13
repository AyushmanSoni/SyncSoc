import React, { useState } from 'react';
import { FaGripLines } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const links = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Societies',
      link: '/societies',
      dropdown: [
        {
          title: 'Cultural',
          link: '/societies/cultural',
          subDropdown: [
            { title: 'Music Society', link: '/band' },
            { title: 'Dance Society', link: '/dance' },
            { title: 'Drama Society', link: '/drama' },
            { title: 'Literary Society', link: '/lit' },
            { title: 'Fine Arts Society', link: '/art' },
            { title: 'Photography Society', link: '/pic' },
          ]
        },
        {
          title: 'Technical',
          link: '/societies/technical',
          subDropdown: [
            { title: 'Coding Club', link: '/coding' },
            { title: 'Robotics Club', link: '/robotics' },
            { title: 'Electronics Club', link: '/electronics' },
          ]
        },
        {
          title: 'Sports Society',
          link: '/societies/sports'
        },
      ]
    },
    { title: 'All Events', link: '/all-events' },
    { title: 'Fests', link: '/fests' },
    { title: 'About Us', link: '/profile' }
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown(null); // Close sub-dropdown when switching main dropdowns
  };

  const toggleSubDropdown = (index) => {
    setActiveSubDropdown(activeSubDropdown === index ? null : index);
  };

  // Delay state for dropdowns
  const [closeTimeout, setCloseTimeout] = useState(null);

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
  };

  const handleMouseLeave = () => {
    setCloseTimeout(setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 300)); // Adjust delay as needed
  };

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
              <div
                key={i}
                className='relative z-50' // Ensure the dropdown is above other content
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={items.link}
                  className='px-4 py-2 flex items-center'
                  onClick={(e) => {
                    if (items.dropdown) {
                      e.preventDefault();
                      toggleDropdown(i);
                    }
                  }}
                >
                  {items.title}
                </Link>
                {items.dropdown && activeDropdown === i && (
                  <div
                    className='absolute left-0 mt-2 bg-[#FFFDFB] shadow-lg rounded-md w-56'
                  >
                    {items.dropdown.map((subItem, j) => (
                      <div key={j} className='relative'>
                        <Link
                          to={subItem.link}
                          className='block px-4 py-2 text-[#683B2B] hover:bg-[#F7F5F1]'
                          onClick={(e) => {
                            if (subItem.subDropdown) {
                              e.preventDefault();
                              toggleSubDropdown(j);
                            }
                          }}
                        >
                          {subItem.title}
                        </Link>
                        {subItem.subDropdown && activeSubDropdown === j && (
                          <div
                            className='absolute left-full top-0 mt-0 ml-1 bg-[#FFFDFB] shadow-lg rounded-md w-56'
                          >
                            {subItem.subDropdown.map((subSubItem, k) => (
                              <Link
                                key={k}
                                to={subSubItem.link}
                                className='block px-4 py-2 text-[#683B2B] hover:bg-[#F7F5F1]'
                              >
                                {subSubItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
            <div key={i}>
              <a href={item.link} className='px-4 py-2 text-gray-700 hover:text-[#086D8A]'>
                {item.title}
              </a>
              {item.dropdown && activeDropdown === i && (
                <div className='ml-4 mt-2'>
                  {item.dropdown.map((subItem, j) => (
                    <div key={j}>
                      <a
                        href={subItem.link}
                        className='block px-4 py-2 text-[#683B2B] hover:bg-[#F7F5F1]'
                        onClick={(e) => {
                          if (subItem.subDropdown) {
                            e.preventDefault();
                            toggleSubDropdown(j);
                          }
                        }}
                      >
                        {subItem.title}
                      </a>
                      {subItem.subDropdown && activeSubDropdown === j && (
                        <div className='ml-4 mt-2'>
                          {subItem.subDropdown.map((subSubItem, k) => (
                            <a
                              key={k}
                              href={subSubItem.link}
                              className='block px-4 py-2 text-[#683B2B] hover:bg-[#F7F5F1]'
                            >
                              {subSubItem.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
