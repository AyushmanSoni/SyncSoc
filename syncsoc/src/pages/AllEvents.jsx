import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const RectangularCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const role = useSelector((state) => state.auth.role); // Get the role of the logged-in user
  console.log(role);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from storage

        const response = await axios.get('http://localhost:5000/list_of_event', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Add token to the request headers
          }
        });

        const result = response.data;

        if (Array.isArray(result)) {
          setEvents(result);
        } else {
          throw new Error('Unexpected data format received');
        }

      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!events || events.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div className='bg-[#F1DFDA] h-auto flex flex-col items-center'>
      <div className='text-5xl font-medium text-[#A25C43] my-8 text-center'>
        All Events
      </div>
      <div className="w-3/4 mx-auto">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="flex flex-col md:flex-row bg-[#F1DFDA] text-[#A25C43] p-4 rounded-lg mb-4 h-auto md:h-44 border-b-2 border-[#E1C2B7] transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="w-full md:w-[15%] flex items-center justify-center mb-4 md:mb-0">
              <div className="text-center">
                <p className='text-[18px] font-semibold'>{event.startTime}</p>
                <p className='text-[18px] font-semibold'>Onwards</p>
              </div>
            </div>
            <div className="w-full md:w-[15%] flex rounded items-center justify-center mb-4 md:mb-0">
              <img
                src={event.image_url}
                alt={event.name}
                className="h-32 md:h-full w-auto object-contain"
              />
            </div>
            <div className="w-full md:w-[45%] flex flex-col justify-center mb-4 md:mb-0">
              <div className="flex-1 flex">
                <p className="text-[22px] mt-8 ml-8 md:mt-0 font-medium text-[#A25C43]">{event.name}</p>
              </div>
              <div className="flex-1 flex text-[#D49E8D]">
                <p className="text-[18px] ml-8">{event.short_description}</p>
              </div>
            </div>
            <div className="w-full md:w-[30%] flex items-center justify-center">
              <Link 
                to={`/eventdetails/${event._id}`} 
                className="px-6 py-2 bg-[#FFFDFB] font-medium text-[18px] text-[#A25C43] border-2 border-[#D49E8D] rounded-full hover:bg-[#683B2B] hover:text-white hover:border-none"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RectangularCard;
