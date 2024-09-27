import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ eventName }) => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/${eventName}`, { name, rollNo });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Roll Number</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your roll number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#A25C43] text-white py-2 px-4 rounded-md hover:bg-[#683B2B] transition duration-300"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default RegistrationForm;
