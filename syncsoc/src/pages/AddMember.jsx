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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-[#683B2B] mt-8">Add New Member</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleAddMember} className="mt-4 space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            name="rollNo"
            value={newMember.rollNo}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Position</label>
          <select
            name="position"
            value={newMember.Position}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
          className="bg-[#A25C43] text-white py-3 px-6 rounded-lg hover:bg-[#683B2B] transition duration-300"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMemberPage;
