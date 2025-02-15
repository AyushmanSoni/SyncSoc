import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/back.svg'
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // console.log("working");
    e.preventDefault();

    try {
      if (formData.name === "" || formData.email === "" || formData.password === "" || formData.rollNo === "") {
        alert("All fields are required");
      } else {
        // console.log(formData);
        const response = await axios.post('http://localhost:5000/Signup', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log(response.data);


        // console.log(response);
        navigate("/login");
      }
    } catch (err) {
      // console.log("working");
      console.error('Error during sign up:', err);
      setError('Sign up failed. Please try again.');
      alert(err.response?.data || 'An error occurred. Please try again.');

    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-y-0 right-0 w-full md:w-5/6 bg-gradient-to-l from-[#F7F5F1] via-[#F7F5F1] to-transparent"></div>

      <div className="absolute inset-0 flex items-center justify-center z-10 p-4 md:p-0">
      <div className="bg-[#FFFDFB] p-8 max-w-md w-full rounded-lg shadow-lg md:bg-transparent md:shadow-none md:ml-auto md:mr-[5%]">

          <h2 className="text-[28px] md:text-[36px] font-bold text-[#683B2B] text-center md:text-left">Sign Up to SyncSoc</h2>
          <p className='font-semibold text-[#D49E8D] text-[14px] text-center md:text-left'>Unite Innovate Succeed Together</p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-[#D49E8D] text-sm font-medium mb-2" htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#D49E8D] text-sm font-medium mb-2" htmlFor="email">Email</label>
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
              <label className="block text-[#D49E8D] text-sm font-medium mb-2" htmlFor="password">Password</label>
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
              <label className="block text-[#D49E8D] text-sm font-medium mb-2" htmlFor="rollNo">Roll Number</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="bg-[#F7F5F1] appearance-none border-2 border-[#D49E8D] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#683B2B]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#683B2B] text-white py-2 mt-4 rounded-md hover:bg-[#4A291B] transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-700">Already have an account? <Link to="/login" className="text-[#683B2B] hover:underline">Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
