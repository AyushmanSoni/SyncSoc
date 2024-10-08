import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { MdEmojiEvents } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { MdLibraryAdd } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import { IoMdPhotos } from "react-icons/io";
const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user type from localStorage (either "member" or "society")
  const role = localStorage.getItem("role");

  let societyName = "";
  if (role === "society" && data.email) {
    societyName = data.email.split("@")[0]; // Example: for "artclub@example.com", societyName will be "artclub"
  }

  return (
    <div className='bg-[#FFFDFB] p-4 flex flex-col h-full'>
      {/* User Profile Information */}
      <div className='flex items-center flex-col justify-center'>
        <img src="https://cdn-icons-png.freepik.com/512/6596/6596121.png" className='h-[12vh]' alt='Profile' />
        <p className='mt-3 text-2xl font-semibold text-[#A25C43]'>{data.name}</p>
        <p className='mt-1 text-lg text-[#A25C43]'>{data.role}</p>
        <p className='mt-1 text-normal font-medium text-[#A25C43]'>{data.rollNo}</p>
        <p className='mt-1 text-normal text-[#A25C43]'>{data.email}</p>

        <div className='w-full mt-4 h-[1px] hidden bg-gray-800 lg:block'></div>
      </div>

      {/* Conditional Sidebar Links based on user role */}
      <div className='w-full flex-col pl-2 justify-center hidden lg:flex mt-4'>
        {role === "member" && (
          <>
            <div className='flex items-center'>
              <HiOutlineClipboardCheck size={24} className='mr-2 mt-2 text-[#A25C43]' />
              <Link to="/pro" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200 mt-2">
                Registered Events
              </Link>
            </div>
            <div className='flex items-center mt-2'>
              <IoIosSettings size={24} className='mr-2 text-[#A25C43]' />
              <Link to="/pro/settings" className="text-[#A25C43] text-lg font-medium w-full py-2 ">
                Settings
              </Link>
            </div>
          </>
        )}

        {role === "society" && (
          <>
            <div className='flex items-center'>
              <MdEmojiEvents size={24} className='mr-2 mt-2 text-[#A25C43]' />
              <Link to="/pro" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200 mt-2">
                Our Events
              </Link>
            </div>
            <div className='flex items-center mt-2'>
              <MdLibraryAdd size={24} className='mr-2 text-[#A25C43]' />
              <Link to="/pro/add-event" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200 ">
                Add Event
              </Link>
            </div>
            <div className='flex items-center mt-2'>
              <IoPersonAdd size={24} className='mr-2 text-[#A25C43]' />
              <Link to="/pro/add-member" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200">
                Add Member
              </Link>
            </div>
            <div className='flex items-center mt-2'>
            <SiGooglemeet size={24} className='mr-2 text-[#A25C43]' />
              <Link to="/pro/add-member" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200">
                Interviews
              </Link>
            </div>
            <div className='flex items-center mt-2'>
            <IoIosSettings size={30} className=' text-[#A25C43]' />
              <Link to="/pro/add-member" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200">
                Settings
              </Link>
            </div>
            <div className='flex items-center mt-2'>
            <IoMdPhotos size={24} className='mr-2 text-[#A25C43]' />
              <Link to="/pro/add-member" className="text-[#A25C43] text-lg font-medium w-full py-2 rounded transition-all duration-200">
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
          navigate("/"); // Navigate to home or login page
        }}
      >
        Log Out <FaSignOutAlt size={20} className="ml-2" />
      </button>
    </div>
  );
};

export default Sidebar;
