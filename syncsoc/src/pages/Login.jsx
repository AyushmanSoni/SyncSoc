import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import background from '../assets/back.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.username === "" || formData.password === "") {
        alert("All fields are required");
      } else {
        // const response = await axios.post('https://chapterverse1.onrender.com/api/v1/sign-in', formData);
        console.log(formData);
        const response = await axios.post('https://chapterverse1.onrender.com/api/v1/sign-in', formData);
        console.log(response.data);
        
        // Storing user data
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        
        // Handling response
        if (response.data && response.data.message) {
          alert(response.data.message);
        } else {
          alert('Login successful');
        }
        
        // Dispatch actions (if needed)
        // dispatch(authActions.login());
        // dispatch(authActions.changeRole(response.data.role));
        
        // navigate("/profile");
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ background: `url(${background})` }}
    >
      <div className="absolute inset-y-0 right-0 w-full md:w-5/6 bg-gradient-to-l from-[#F7F5F1] via-[#F7F5F1] to-transparent"></div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4 md:p-0">
        <div className="bg-[#FFFDFB] p-8 max-w-md w-full rounded-lg shadow-lg md:bg-transparent md:shadow-none md:ml-auto md:mr-[5%]">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#683B2B] text-center md:text-left">Log In</h2>

          {error && <div className="mb-4 text-red-500">{error}</div>}
          
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-[#D49E8D] text-sm font-medium mb-2" htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="username"
                value={formData.username}
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
            <button
              type="submit"
              className="w-full bg-[#683B2B] text-white py-2 mt-4 rounded-md hover:bg-[#4A291B] transition duration-300"
            >
              Log In
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-700">Don't have an account? <Link to="/signup" className="text-[#683B2B] hover:underline">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
