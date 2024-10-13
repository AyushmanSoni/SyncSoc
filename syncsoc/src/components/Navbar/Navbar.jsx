import React, { useState } from 'react';
import { FaGripLines } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const links = [
    { title: 'Home', link: '/' },
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
          ],
        },
        {
          title: 'Technical',
          link: '/societies/technical',
          subDropdown: [
            { title: 'Coding Club', link: '/coding' },
            { title: 'Robotics Club', link: '/robotics' },
            { title: 'Electronics Club', link: '/electronics' },
          ],
        },
        { title: 'Sports Society', link: '/sport' },
      ],
    },
    { title: 'All Events', link: '/all-events' },
    { title: 'Interviews', link: '/interviews' },
    { title: 'Fests', link: '/fests' },
    { title: 'About Us', link: '/about' },
    { title: 'Profile', link: '/pro' },
  ];

  // Remove certain links based on login status and role
  if (!isLoggedIn) {
    links.splice(6, 1); // Remove 'All Events' and 'Fests'
  }
  if (isLoggedIn && role === 'admin') {
    links.splice(5, 1); // Remove 'Fests' for admin
  }
  // if (isLoggedIn && role === 'user') {
  //   links.splice(4, 1); // Remove 'About Us' for regular user
  // }

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
    setCloseTimeout(
      setTimeout(() => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }, 300) // Adjust delay as needed
    );
  };

  return (
    <div className='bg-[#FFFDFB] text-[#F9F6F3] px-4 md:px-24 py-4'>
      <div className='flex items-center justify-between'>
        <Link to ="/">
        <div className='flex items-center'>
          <img
            className='h-10 me-4'
            src='https://www.svgrepo.com/show/458732/group.svg'
            alt='logo'
          />
          <h1 className='text-2xl font-semibold text-[#683B2B]'>
            Sync<span className='text-[#2E1A12]'>Soc</span>
          </h1>
        </div>
        </Link>
        <button
          className='md:hidden text-gray-500 text-2xl ml-4'
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaGripLines />
        </button>
        <div
          className={`hidden md:flex md:flex-grow md:justify-center md:items-center`}
        >
          <div className='flex flex-col md:flex-row md:gap-8 text-[#683B2B] font-medium'>
            {links.map((items, i) => (
              <div
                key={i}
                className='relative z-50'
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
                  <div className='absolute left-0 mt-2 bg-[#FFFDFB] shadow-lg rounded-md w-56'>
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
                          <div className='absolute left-full top-0 mt-0 ml-1 bg-[#FFFDFB] shadow-lg rounded-md w-56'>
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
          {!isLoggedIn && (
            <>
              <Link
                to='/login'
                className='px-4 py-2 text-[#683B2B] font-medium hover:text-[#2E1A12]'
              >
                LogIn
              </Link>
              <Link
                to='/signup'
                className='px-4 py-2 bg-[#683B2B] text-white border rounded-lg hover:bg-[#2E1A12]'
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <div className='flex flex-col items-start gap-4'>
          {links.map((item, i) => (
            <div key={i}>
              <Link
                to={item.link}
                className='px-4 py-2 text-gray-700 hover:text-[#086D8A]'
              >
                {item.title}
              </Link>
              {item.dropdown && activeDropdown === i && (
                <div className='ml-4 mt-2'>
                  {item.dropdown.map((subItem, j) => (
                    <div key={j}>
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
                        <div className='ml-4 mt-2'>
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
          {!isLoggedIn && (
            <>
              <Link
                to='/login'
                className='px-4 py-2 text-[#683B2B] hover:text-[#2E1A12]'
              >
                LogIn
              </Link>
              <Link
                to='/signup'
                className='px-4 py-2 bg-[#683B2B] text-white border rounded-lg hover:bg-[#2E1A12]'
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
