import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user type from localStorage (either "member" or "society")
  const role = localStorage.getItem("role");

  let societyName = "";
  if (role === "society" && data.email) {
    societyName = data.email.split("@")[0]; // Example: for "artclub@example.com", societyName will be "artclub"
  }
  console.log(societyName);

  return (
    <div className='bg-white p-4 rounded flex flex-col items-center h-screen'>
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
      <div>
        {role === "member" && (
          <div className='w-full flex-col hidden lg:flex mt-4'>
            <div className='flex'>
              <img src="https://www.svgrepo.com/show/57971/register.svg" alt="" className='h-9 mt-4 pt-2 pb-2 mr-2 text-[#A25C43]' />
              <Link to="/pro"
                className="text-[#A25C43] text-xl font-semibold w-full py-2 rounded transition-all duration-200 mt-2">
                Registered Events
              </Link>
            </div>
            <div className='flex'>
              <img src="https://www.svgrepo.com/show/57971/register.svg" alt="" className='h-9 mt-4 pt-2 pb-2 mr-2 text-[#A25C43]' />
              <Link to="/pro/settings"
                className="text-[#A25C43] font-semibold text-xl mb-8 w-full py-2 hover:bg-[#F1DFDA] rounded transition-all duration-200 mt-2">
                Settings
              </Link>
            </div>
          </div>
        )}

        {role === "society" && (
          <div className='w-full flex-col items-center justify-center hidden lg:flex'>
            <Link to="/pro"
              className="text-[#A25C43] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
              Our Events
            </Link>
            <Link to="/pro/add-event"
              className="text-[#A25C43] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
              Add Event
            </Link>
            <Link to="/pro/add-member"
              className="text-[#A25C43] font-semibold w-full py-2 text-center hover:bg-[#DAE9ED] rounded transition-all duration-200 mt-2">
              Add Member
            </Link>
          </div>
        )}
      </div>

      {/* Log Out Button */}
      <button
        className='bg-[#A25C43] w-3/6 lg:w-3/4 mt-4 lg:mt-0 text-white border border-[#683B2B] font-semibold flex items-center justify-center py-2 rounded hover:bg-[#683B2B] transition-all duration-300 hover:text-white'
        onClick={() => {
          console.log("Logging out...");
          dispatch(authActions.logout());
          localStorage.clear(); // Clear all local storage values
          console.log("Logged out successfully.");
          console.log(localStorage); // Verify local storage is cleared
          navigate("/"); // Navigate to home or login page
        }}
      >
        Log Out <FaSignOutAlt className="ml-4 text-white" />
      </button>
    </div>
  );
};

export default Sidebar;
