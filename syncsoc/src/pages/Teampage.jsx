import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/Extras/Error';
import Loader from '../components/Loader/Loader';

const TeamPage = () => {
  const { society } = useParams(); // Get the society name from the URL
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedMembers, setSortedMembers] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors

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
        setError('Either there is netwrok error or you are not logged in');
        setLoading(false);
      }
    };

    fetchMembers();
  }, [society]);

  if (error) {
    return <ErrorMessage message={error} />;
  }
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
      const positionOrder = ['Coordinator', 'Volunteer', 'Member', 'member'];
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#683B2B] mb-8 text-center md:text-left">
        Team Members - {society}
      </h1>

      {/* Search and Sort Options */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
          placeholder="Search by name..."
        />
        <button
          onClick={handleSort}
          className="bg-[#A25C43] text-white py-2 px-6 rounded-md hover:bg-[#683B2B] transition duration-300 w-full md:w-auto"
        >
          Sort by Position
        </button>
      </div>

      {/* Members Table */}
      {members.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">No members found for this society.</p>
      ) : (
        <div className="overflow-x-auto">
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
        </div>
      )}
    </div>
  );
};

export default TeamPage;
