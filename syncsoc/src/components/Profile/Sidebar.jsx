import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  
  // Retrieve user type from localStorage (either "member" or "society")
  const role = localStorage.getItem("role");

  // Check if `data` exists before trying to access its properties
  // const username = data?.username || "Guest";  // Fallback to "Guest" if data is undefined
  // const email = data?.email || "Not available";  // Fallback if data is undefined

  return (
    <div className='bg-white p-4 rounded flex flex-col items-center justify-between h-[100%]'>
      {/* User Profile Information */}
      <div className='flex items-center flex-col justify-center'>
        <img src="https://cdn-icons-png.freepik.com/512/6596/6596121.png" className='h-[12vh]' alt='Profile' />
        {/* <p className='mt-3 text-xl font-semibold text-[#086D8A]'>{data.username}</p>
        <p className='mt-1 text-normal text-[#086D8A]'>{data.email}</p> */}
        <div className='w-full mt-4 h-[1px] hidden bg-[#086D8A] lg:block'></div>
      </div>

      {/* Conditional Sidebar Links based on user role */}
      {/* {role === "member" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile"
            className="text-[#086D8A] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
            Registered Events
          </Link>
          <Link to="/settings"
            className="text-[#086D8A] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
            Settings
          </Link>
        </div>
      )} */}

      {/* {role === "society" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile"
            className="text-[#086D8A] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
            All Events
          </Link>
          <Link to="/add-event"
            className="text-[#086D8A] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
            Add Event
          </Link>
        </div>
      )} */}

      {/* Log Out Button */}
      {/* <button
        className='bg-[#086D8A] w-3/6 lg:w-full mt-4 lg:mt-0 text-[#086D8A] border border-[#086D8A] font-semibold flex items-center justify-center py-2 rounded hover:bg-[#075A71] transition-all duration-300 hover:text-white'
        onClick={() => {
          dispatch(authActions.logout());
          localStorage.clear(); // Clear all local storage values
          history("/"); // Navigate to home or login page
        }}
      >
        Log Out <FaSignOutAlt className="ml-4" />
      </button> */}
    Sidebar</div>
  );
};

export default Sidebar;
