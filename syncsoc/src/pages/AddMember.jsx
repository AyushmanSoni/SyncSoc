import React, { useState } from 'react';
import axios from 'axios';

const AddMemberPage = ({ society }) => {
  const [newMember, setNewMember] = useState({ name: '', rollNo: '', position: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission to add a new member
  const handleAddMember = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const token = localStorage.getItem('token'); // Get token for the request
      const response = await axios.post(
        'http://localhost:5000/team/add_member',
        {
          ...newMember,
          society, // Include the society in the request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );
      
      if (response.status === 201) {
        setSuccessMessage('Member added successfully!');
        setError(null);
        setNewMember({ name: '', rollNo: '', position: '' });
        alert('Member added successfully!'); // Alert when member is added successfully
        // Reset form
      }
    } catch (err) {
      setError('Error adding member. Person with the same roll number might already exist.');
      setSuccessMessage('');
      console.error(err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='h-[100%] p-0 md:p-4'>
      <h1 className='text-3xl md:text-2xl font-semibold text-[#683B2B] mb-4 ml-4 mt-4'>Add New Member</h1>
      <div className='p-4'>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>} */}
        <form onSubmit={handleAddMember}>  {/* Add form wrapper */}
          <div className='mt-4'>
            <label className='text-[#683B2B] text-lg font-medium'>Name</label>
            <input
              type="text"
              name="name"
              value={newMember.name}
              onChange={handleInputChange}
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              placeholder='Enter member name'
              required
            />
          </div>
          <div className='mt-4'>
            <label className='text-[#683B2B] text-lg font-medium'>Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={newMember.rollNo}
              onChange={handleInputChange}
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              placeholder='Enter roll number'
              required
            />
          </div>
          <div className='mt-4'>
            <label className='text-[#683B2B] text-lg font-medium'>Position</label>
            <select
              name="position"
              value={newMember.position}
              onChange={handleInputChange}
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              required
            >
              <option value="">Select Position</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Member">Member</option>
            </select>
          </div>
          <button
            type="submit"  // Set type to submit for proper form submission
            className='mt-6 px-6 bg-[#A25C43] text-white font-semibold py-2 rounded hover:bg-[#683B2B]'
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
