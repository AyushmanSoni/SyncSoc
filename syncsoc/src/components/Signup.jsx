import React, { useState } from 'react';
import background from '../assets/college.png';
import '../index.css'; // Make sure the path is correct

const Signup = () => {
  const [isStudent, setIsStudent] = useState(true);

  const handleToggleChange = () => {
    setIsStudent(!isStudent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const userData = {
      email,
      password,
    };

    try {
      let response;
      if (isStudent) {
        // Submit to student section of the database
        response = await fetch('/api/student/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      } else {
        // Submit to club section of the database
        response = await fetch('/api/club/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const result = await response.json();
      console.log('Signup successful:', result);
      // Redirect or show success message

    } catch (error) {
      console.error('Error during signup:', error);
      // Show error message to the user
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ background: `url(${background})` }}
    >
      <div className="absolute inset-y-0 right-0 w-5/6 bg-gradient-to-l from-[#F7F5F1] via-[#F7F5F1] to-transparent"></div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10" style={{ marginLeft: '55%' }}>
        <div className="p-8 max-w-md w-full">
          <h2 className="text-[36px] font-bold text-[#683B2B]">Sign In to SyncSoc</h2>
          <p className='font-semibold text-[#D49E8D] text-[14px]'>Unite Innovate Succeed Together</p>

          {/* Integrated Toggle Button */}
          <div className="flex items-center justify-center my-4">
            <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-[#F7F5F1] p-1 border border-[#D49E8D]'>
              <input
                type='checkbox'
                className='sr-only'
                checked={!isStudent}
                onChange={handleToggleChange}
              />
              <span
                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                  isStudent ? 'text-primary bg-[#683b2b] text-white' : 'text-body-color'
                }`}
              >
                Student
              </span>
              <span
                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                  !isStudent ? 'text-primary bg-[#683b2b] text-white' : 'text-body-color'
                }`}
              >
                Society
              </span>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#D49E8D] text-sm font-medium mb-3">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
              />
            </div>
            <div className="mb-16">
              <label htmlFor="password" className="block text-[#D49E8D] text-sm font-medium mb-3">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#9F7D68] text-white py-2 px-4 rounded-md hover:bg-[#683b2b] "
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
