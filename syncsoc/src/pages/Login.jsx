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
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(formData.username==="" || formData.password==="" ){
        alert("All fields are required");
      }
      else{
        // console.log(formData);
        const response = await axios.post('https://chapterverse1.onrender.com/api/v1/sign-in', formData);
        // alert(response.data.message);
        console.log(response.data);
        // dispatch(authActions.login());
        // dispatch(authActions.changeRole(response.data.role));
        //console.log(response.data.id);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        // navigate("/profile")
        if (response.data && response.data.message) {
          alert(response.data.message);
        } else {
          alert('Login successful');
        }
        //navigate("/LogIn")
      }
      
      // Handle successful sign up (e.g., redirect to login page)
    } catch (err) {
      console.error('Error during login:', err);
      alert(err.response.data.message);
      setError('Login failed. Please check your email and password.');
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
          <h2 className="text-[36px] font-bold text-[#683B2B]">Log In</h2>

          {/* Integrated Toggle Button */}
          

          {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-[#D49E8D] text-sm font-medium mb-3" htmlFor="name">Username</label>
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
          <button
            type="submit"
            className="w-full bg-[#683B2B] text-white py-2 mt-8 px-4 rounded-md hover:bg-[#683B2B] transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account? <div className="text-[#683B2B] hover:underline">Sign Up</div></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;