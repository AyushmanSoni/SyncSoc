import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { state } = useLocation(); // Get the eventName from state
  const { eventId } = useParams(); // Get eventId from URL params
  const eventName = state?.eventName || 'Unknown Event'; // Fallback for null state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    rollNo: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Check if the user is logged in by checking for a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login or show an error
      alert('You need to be logged in to register for this event.');
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.rollNo) {
        alert('All fields are required');
        return;
      }

      const token = localStorage.getItem('token'); // Ensure token is available
      if (!token) {
        alert('You need to be logged in to register.');
        return;
      }

      // Send the registration request with token in headers
      const response = await axios.post(
        `http://localhost:5000/participants/${eventName}`, // Register for the specific event
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Token for backend authentication
          }
        }
      );

      // If registration is successful
      setMessage(response.data.message || 'Registration successful!');
      setError('');
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Event Registration: {eventName}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Roll Number</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your roll number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#A25C43] text-white py-2 px-4 rounded-md hover:bg-[#683B2B] transition duration-300"
        >
          Enter more Details
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default RegistrationForm;
