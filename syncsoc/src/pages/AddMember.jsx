import React, { useState } from 'react';
import axios from 'axios';

const AddMemberPage = ({ society }) => {
  const [newMember, setNewMember] = useState({ name: '', rollNo: '', position: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission to add a new member
  const handleAddMember = async (e) => {
    e.preventDefault();
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
      if (response.status === 200) {
        setSuccessMessage('Member added successfully!');
        setError(null);
        setNewMember({ name: '', rollNo: '', position: '' }); // Reset form
        alert('Member added successfully!'); // Alert when member is added successfully
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
      <h2 className='text-2xl md:text-3xl font-semibold text-[#683B2B] mb-8'>Add New Member</h2>
      <div className='p-4 bg-white rounded'>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleAddMember} className="mt-4 space-y-4">
          <div>
            <label className='text-[#683B2B] text-xl font-medium'>Name</label>
            <input
              type="text"
              name="name"
              value={newMember.name}
              onChange={handleInputChange}
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              placeholder='Enter member name'
              required
            />
          </div>
          <div className='mt-6'>
            <label className='text-[#683B2B] text-xl font-medium'>Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={newMember.rollNo}
              onChange={handleInputChange}
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              placeholder='Enter roll number'
              required
            />
          </div>
          <div className='mt-6'>
            <label className='text-[#683B2B] text-xl font-medium'>Position</label>
            <select
              name="position"
              value={newMember.position} // Changed to 'position' (correct casing)
              onChange={handleInputChange}
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              required
            >
              <option value="">Select Position</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Member">Member</option>
            </select>
          </div>
          <button
            type="submit"
            className='mt-6 px-3 bg-[#A25C43] text-white font-semibold py-2 rounded hover:bg-[#683B2B]'
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
