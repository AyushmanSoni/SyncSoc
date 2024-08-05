import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/college.png'; // Ensure this path is correct

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });
  // const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.username === "" || formData.email === "" || formData.password === "" || formData.address === "") {
        alert("All fields are required");
      } else {
        console.log(formData);
        // const response = await axios.post('https://chapterverse1.onrender.com/api/v1/sign-up', formData);
        // alert(response.data.message);
        // navigate("/LogIn");
      }
    } catch (err) {
      console.error('Error during sign up:', err);
      setError('Sign up failed. Please try again.');
      // alert(err.response.data.message);
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
          

          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#D49E8D] text-sm font-medium mb-3" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#D49E8D] text-sm font-medium mb-3" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#D49E8D] text-sm font-medium mb-3" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#D49E8D] text-sm font-medium mb-3" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#9F7D68] text-white py-2 px-4 rounded-md hover:bg-[#683B2B] transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Already have an account? <div  className="text-[#086D8A] hover:underline">Log In</div></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
