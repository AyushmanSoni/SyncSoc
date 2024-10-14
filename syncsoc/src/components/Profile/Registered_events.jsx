import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/participants/student', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        const result = response.data;

        if (Array.isArray(result)) {
          setEvents(result);
        } else {
          throw new Error('Unexpected data format received');
        }

      } catch (error) {
        console.error('Error fetching registered events:', error);
        setError('Failed to fetch registered events');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) {
    return <div className='text-center py-4'>Loading registered events...</div>;
  }

  if (error) {
    return <div className='text-center py-4'>{error}</div>;
  }

  if (!events || events.length === 0) {
    return <div className='text-center py-4'>You haven't registered for any events yet.</div>;
  }

  return (
    <div className='bg-[#F1DFDA] flex h-auto flex-col items-center'>
      <div className='text-4xl font-medium text-[#A25C43] my-8'>
        Your Registered Events
      </div>
      <div className="w-full max-w-4xl mx-auto p-4">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="flex bg-[#F1DFDA] text-[#A25C43] p-4 rounded-lg mb-4 h-auto sm:h-28 border-b-2 border-[#E1C2B7] transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="w-[30%] flex items-center justify-center sm:w-[15%] rounded">
              <img
                src={event.image_url}
                className="h-full w-auto object-contain"
                alt={event.event_name}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center pl-4 sm:w-[45%]">
              <div className="flex-1">
                <p className="text-[20px] font-medium text-[#A25C43]">{event.event_name}</p>
              </div>
            </div>
            <div className="w-full sm:w-[30%] flex items-center justify-center mt-2 sm:mt-0">
              <Link 
                to={`/eventdetails/${event._id}`} 
                className="px-4 py-2 bg-[#FFFDFB] font-medium text-[16px] sm:text-[18px] text-[#A25C43] border-2 border-[#D49E8D] rounded-full hover:bg-[#683B2B] hover:text-white hover:border-none transition duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
