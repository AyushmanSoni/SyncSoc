import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeamPage = () => {
  const { society } = useParams(); // Get the society name from the URL
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedMembers, setSortedMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', rollNo: '', position: '' });
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors
  const [successMessage, setSuccessMessage] = useState(''); // For success message

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem('token'); // Assuming token is stored in localStorage
  };

  // Fetch members for the selected society
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from storage
        const response = await axios.get(`http://localhost:5000/team/list_of_members/${society}`, {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in Authorization header
          }
        });
        setMembers(response.data);
        setSortedMembers(response.data); // Initialize sorted members with the full list
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch team members');
        setLoading(false);
      }
    };

    fetchMembers();
  }, [society]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSortedMembers(filtered);
  };

  // Handle sorting by position
  const handleSort = () => {
    const sorted = [...members].sort((a, b) => {
      const positionOrder = ['Coordinator', 'Volunteer', 'Member' , 'member'];
      const positionComparison =
        positionOrder.indexOf(a.Position) - positionOrder.indexOf(b.Position);

      // If positions are the same, maintain the order of addition (i.e., index in the array)
      if (positionComparison === 0) {
        return members.indexOf(a) - members.indexOf(b);
      }

      return positionComparison;
    });
    setSortedMembers(sorted);
  };

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
      console.log(response)
      if (response.status === 200 ) {
        setSuccessMessage('Member added successfully!');
        setError(null);
        setNewMember({ name: '', rollNo: '', position: '' }); // Reset form
        setMembers(society); // Fetch updated members list
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#683B2B] mb-8">Team Members - {society}</h1>

      {/* Search and Sort Options */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
          placeholder="Search by name..."
        />
        <button
          onClick={handleSort}
          className="bg-[#A25C43] text-white py-2 px-6 rounded-md hover:bg-[#683B2B] transition duration-300"
        >
          Sort by Position
        </button>
      </div>

      {/* Error or Success Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      {/* Members Table */}
      {members.length === 0 ? (
        <p className="text-xl text-gray-600">No members found for this society.</p>
      ) : (
        <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
          <thead className="bg-[#F6E6E0] text-[#683B2B] font-bold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Roll Number</th>
              <th className="p-4">Position</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member) => (
              <tr key={member.rollNo} className="border-t hover:bg-gray-100">
                <td className="p-4">{member.name}</td>
                <td className="p-4">{member.rollNo}</td>
                <td className="p-4">{member.Position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add New Member Form */}
      <h2 className="text-2xl font-bold text-[#683B2B] mt-8">Add New Member</h2>
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

export default TeamPage;
