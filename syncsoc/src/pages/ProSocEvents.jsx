import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Remove useParams
import Loader from '../components/Loader/Loader';
import { useSelector } from 'react-redux'; // Use selector to get the role

const ProSocEvents = ({ society }) => { // Accept society as a prop
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(society);

  const role = useSelector((state) => state.auth.role); // Get the role of the logged-in user

  useEffect(() => {
    const fetchEvents = async () => {
      if (role === 'society') {
        try {
          const token = localStorage.getItem('token'); // Retrieve the token from local storage
          const response = await axios.get(`http://localhost:5000/event/list_of_event`, {
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
      }
    };

    fetchEvents();
  }, [society, role]); // Fetch events whenever the society or role changes

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
      <div className='text-5xl font-medium text-[#A25C43] my-8'>
        {society} Our Events
      </div>
      <div className="w-3/4 mx-auto">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="flex bg-[#F1DFDA] text-[#A25C43] p-4 rounded-lg mb-4 h-44 border-b-2 border-[#E1C2B7] transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="w-[15%] flex items-center justify-center">
              <div className="text-center">
                <p className='text-[18px] font-semibold'>{event.time}</p>
                <p className='text-[18px] font-semibold'>Onwards</p>
              </div>
            </div>
            <div className="w-[15%] flex rounded items-center justify-center">
              <img
                src={event.image_url}
                alt={event.name}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="w-[45%] flex flex-col justify-center">
              <div className="flex-1 flex">
                <p className="text-[22px] mt-8 ml-8 font-medium text-[#A25C43]">{event.name}</p>
              </div>
              <div className="flex-1 flex text-[#D49E8D]">
                <p className="text-[18px] ml-8">{event.short_description}</p>
              </div>
            </div>
            <div className="w-[30%] flex items-center justify-center">
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

export default ProSocEvents;
