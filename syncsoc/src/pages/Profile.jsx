import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Profile/Sidebar';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Mobilenav from '../components/Profile/Mobilenav';
const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-user-info', { headers });
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile information');
      }
    };
    fetchProfile();

  }, []);

  return (
    <div className='bg-[#F1DFDA] px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4'>
      {/* <div className="w-full md:w-1/6">
            <Sidebar/>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div> */}


      {!profile && !error && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {error && (
        <div className="w-full h-full flex items-center justify-center text-red-500">
          {error}
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-1/4">
            <Sidebar data = {profile}/>
          </div>
          <div className="w-full md:w-3/4">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
