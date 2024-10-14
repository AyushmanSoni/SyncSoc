import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import Loader from '../components/Loader/Loader';
import { useSelector } from 'react-redux'; // Use selector to get the role
import ErrorMessage from '../components/Extras/Error';

const SocEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { society } = useParams();
  console.log(society); // Extract the society name from URL parameters
  const role = useSelector((state) => state.auth.role); // Get the role of the logged-in user

  useEffect(() => {
    const fetchEvents = async () => {
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
    return <ErrorMessage message="Failed to fetch Events" />;
  }

  if (!events || events.length === 0) {
    return <ErrorMessage message="No events Found" />;
  }


  return (
    <div className="bg-[#F1DFDA] h-auto flex flex-col items-center">
      <div className="text-3xl md:text-5xl font-medium text-[#A25C43] my-8 text-center px-4">
        {society} Events
      </div>
      <div className="w-full md:w-3/4 mx-auto px-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex flex-col sm:flex-row bg-[#F1DFDA] text-[#A25C43] p-4 rounded-lg mb-4 border-b-2 border-[#E1C2B7] transition duration-300 ease-in-out hover:shadow-lg"
          >
            {/* Event Time Section */}
            <div className="w-full sm:w-[15%] flex items-center justify-center mb-4 sm:mb-0">
              <div className="text-center">
                <p className="text-[16px] md:text-[18px] font-semibold">{event.time}</p>
                <p className="text-[16px] md:text-[18px] font-semibold">Onwards</p>
              </div>
            </div>

            {/* Event Image Section */}
            <div className="w-full sm:w-[15%] flex rounded items-center justify-center mb-4 sm:mb-0">
              <img
                src={event.image_url}
                alt={event.name}
                className="h-24 md:h-full w-auto object-contain"
              />
            </div>

            {/* Event Description Section */}
            <div className="w-full sm:w-[45%] flex flex-col justify-center mb-4 sm:mb-0">
              <p className="text-[18px] md:text-[22px] mt-4 sm:mt-8 sm:ml-8 font-medium text-[#A25C43]">
                {event.name}
              </p>
              <p className="text-[16px] md:text-[18px] sm:ml-8 text-[#D49E8D] line-clamp-3">
                {event.short_description}
              </p>
            </div>

            {/* Buttons Section */}
            <div className="w-full sm:w-[30%] flex flex-col sm:flex-row items-center justify-between sm:items-center">
              <Link
                to={`/eventdetails/${event._id}`}
                className="px-6 py-2 mb-2 sm:mb-0 w-full sm:w-[150px] bg-[#FFFDFB] font-medium text-[16px] md:text-[18px] text-[#A25C43] border-2 border-[#D49E8D] rounded-full hover:bg-[#683B2B] hover:text-white hover:border-none text-center"
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

export default SocEvents;
