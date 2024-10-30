import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchParticipants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/participants/society/${eventName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      setParticipants(response.data);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized access');
      } else {
        setErrorMessage('Error fetching participants');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-0 md:w-[70%]">
      <h1 className="text-2xl font-medium mb-4 mt-4 text-[#A25C43]">Participants List Our Events</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center mb-4 gap-2">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={fetchParticipants}
          className="bg-[#A25C43] text-white px-4 py-2 rounded"
        >
          Fetch Participants
        </button>
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {participants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Participant Name</th>
                <th className="border px-4 py-2">Roll No.</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{participant.name}</td>
                  <td className="border px-4 py-2">{participant.rollNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No participants found for this event</p>
      )}
    </div>
  );
};

export default ParticipantsPage;