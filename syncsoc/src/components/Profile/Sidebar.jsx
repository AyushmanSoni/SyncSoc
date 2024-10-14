import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; // FaBars and FaTimes for hamburger icon
import { IoIosSettings } from 'react-icons/io';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { MdEmojiEvents } from 'react-icons/md';
import { IoPersonAdd } from 'react-icons/io5';
import { MdLibraryAdd } from 'react-icons/md';
import { SiGooglemeet } from 'react-icons/si';
import { IoMdPhotos } from 'react-icons/io';
import { BsPersonUp } from "react-icons/bs";
import { BsPersonVcardFill } from "react-icons/bs";

const Sidebar = ({ data }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user type from localStorage (either "member" or "society")
  const role = localStorage.getItem("role");

  let societyName = "";
  if (role === "society" && data.email) {
    societyName = data.email.split("@")[0]; // Example: for "artclub@example.com", societyName will be "artclub"
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close sidebar after selecting an option
  };

  return (
    <div className='h-full'>
      {/* Top bar with Hamburger menu */}
      <div className='lg:hidden p-4 flex justify-between items-center bg-[#FFFDFB]'>
        <img src="https://cdn-icons-png.freepik.com/512/6596/6596121.png" className='h-[8vh]' alt='Profile' />
        <button onClick={toggleSidebar} className="text-[#A25C43]">
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar (Overlayed on small screens) */}
      <div
        className={`bg-[#FFFDFB] p-4 flex flex-col h-full fixed top-0 left-0 w-64 z-50 lg:static lg:flex lg:w-auto transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* User Profile Information (Visible on sidebar only) */}
        <div className='flex items-center flex-col justify-center'>
          <img
            src="https://cdn-icons-png.freepik.com/512/6596/6596121.png"
            className='h-[12vh] mb-3'
            alt='Profile'
          />
          <p className='text-2xl font-semibold text-[#A25C43]'>{data.name}</p>
          <p className='text-lg text-[#A25C43]'>{data.role}</p>
          <p className='text-normal font-medium text-[#A25C43]'>{data.rollNo}</p>
          <p className='text-normal text-[#A25C43]'>{data.email}</p>
          <div className='w-full mt-4 h-[1px] hidden bg-gray-800 lg:block'></div>
        </div>

        {/* Sidebar Links (Conditional based on role) */}
        <div className='w-full flex-col pl-2 justify-center lg:flex mt-4'>
          {role === 'member' && (
            <>
              <div className='flex items-center'>
                <HiOutlineClipboardCheck size={24} className='mr-2 mt-2 text-[#A25C43]' />
                <Link
                  to='/pro'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200 mt-2'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Registered Events
                </Link>
              </div>
              <div className='flex items-center mt-2'>
                <SiGooglemeet size={24} className='mr-2 text-[#A25C43]' />
                <Link
                  to='/interviews'
                  className='text-[#A25C43] text-lg font-medium w-full py-2'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Interviews
                </Link>
              </div>
            </>
          )}

          {role === 'society' && (
            <>
              <div className='flex items-center'>
                <MdEmojiEvents size={24} className='mr-2 mt-2 text-[#A25C43]' />
                <Link
                  to='/pro'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200 mt-2'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Our Events
                </Link>
              </div>
              <div className='flex items-center mt-2'>
                <MdLibraryAdd size={24} className='mr-2 text-[#A25C43]' />
                <Link
                  to='/pro/add-event'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Add Event
                </Link>
              </div>
              <div className='flex items-center mt-2'>
                <IoPersonAdd size={24} className='mr-2 text-[#A25C43]' />
                <Link
                  to='/pro/add-member'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Add Member
                </Link>
              </div>
              <div className='flex items-center mt-2'>
                <SiGooglemeet size={24} className='mr-2 text-[#A25C43]' />
                <Link
                  to='/pro/interviews'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Interviews
                </Link>
              </div>
              <div className='flex items-center mt-2'>
              <BsPersonVcardFill size={30} className='text-[#A25C43] mr-1' />
                <Link
                  to='/pro/participants'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Participants
                </Link>
              </div>
              <div className='flex items-center mt-2'>
                <IoMdPhotos size={24} className='mr-2 text-[#A25C43]' />
                <Link
                  to='/pro/add-member'
                  className='text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200'
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  Gallery
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Log Out Button */}
        <button
          className='bg-[#A25C43] w-3/6 lg:w-3/4 mt-4 text-white border border-[#683B2B] font-semibold flex items-center justify-center py-2 rounded hover:bg-[#683B2B] transition-all duration-300 hover:text-white'
          onClick={() => {
            dispatch(authActions.logout());
            localStorage.clear(); // Clear all local storage values
            navigate('/'); // Navigate to home or login page
          }}
        >
          Log Out <FaSignOutAlt size={20} className='ml-2' />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
