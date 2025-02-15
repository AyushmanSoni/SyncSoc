import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';

const RectangularCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ongoing'); // State for active tab

  const role = useSelector((state) => state.auth.role); // Get the role of the logged-in user

  // Function to fetch events based on the active tab
  const fetchEvents = async (tab) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const token = localStorage.getItem('token');
      let url;

      // Determine the URL based on the active tab
      switch (tab) {
        case 'past':
          url = `${process.env.REACT_APP_API_URL}/front_page/events/recent-past`;
          break;
        case 'ongoing':
          url = `${process.env.REACT_APP_API_URL}/front_page/events/recent-present`;
          break;
        case 'upcoming':
          url = `${process.env.REACT_APP_API_URL}/front_page/events/recent-future`;
          break;
        default:
          throw new Error('Invalid tab selected');
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  // Fetch events when the component mounts or when the active tab changes
  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab]);

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
      <div className='text-2xl font-medium text-[#D49E8D] mt-8'>
        Our Timeline
      </div>
      <div className='text-3xl font-semibold text-[#683B2B] mt-2 '>
        At What Time?
      </div>
      <p className='text-lg  text-[#D49E8D] mt-2 '>
      Effortlessly organize your time and stay
      </p>
      <p className='text-lg  text-[#D49E8D]  '>
      on track with our timetable feature.
      </p>

      

      <div class="mb-4 border-b border-gray-300 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-600 dark:text-gray-400" id="event-tab" data-tabs-toggle="#event-tab-content" role="tablist">
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg border-transparent hover:text-gray-900 hover:border-gray-400 dark:hover:text-gray-300" id="past-tab" data-tabs-target="#past-events" type="button" role="tab" aria-controls="past-events" aria-selected="true">Past Events</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg border-transparent hover:text-gray-900 hover:border-gray-400 dark:hover:text-gray-300" id="present-tab" data-tabs-target="#present-events" type="button" role="tab" aria-controls="present-events" aria-selected="false">Ongoing Events</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg border-transparent hover:text-gray-900 hover:border-gray-400 dark:hover:text-gray-300" id="future-tab" data-tabs-target="#future-events" type="button" role="tab" aria-controls="future-events" aria-selected="false">Upcoming Events</button>
        </li>
    </ul>
</div>

<div id="event-tab-content">
    <div class="hidden p-4 rounded-lg bg-white dark:bg-gray-800" id="past-events" role="tabpanel" aria-labelledby="past-tab">
        <p class="text-sm text-gray-500 dark:text-gray-400">Here is the list of <strong class="font-medium text-gray-800 dark:text-white">Past Events</strong>. Add the content and event details here.</p>
    </div>
    <div class="hidden p-4 rounded-lg bg-white dark:bg-gray-800" id="present-events" role="tabpanel" aria-labelledby="present-tab">
        <p class="text-sm text-gray-500 dark:text-gray-400">Here is the list of <strong class="font-medium text-gray-800 dark:text-white">Ongoing Events</strong>. Add the content and event details here.</p>
    </div>
    <div class="hidden p-4 rounded-lg bg-white dark:bg-gray-800" id="future-events" role="tabpanel" aria-labelledby="future-tab">
        <p class="text-sm text-gray-500 dark:text-gray-400">Here is the list of <strong class="font-medium text-gray-800 dark:text-white">Upcoming Events</strong>. Add the content and event details here.</p>
    </div>
</div>


      {/* Tabs Navigation */}
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => setActiveTab('past')} 
          className={`py-2 px-4 rounded ${activeTab === 'past' ? 'bg-[#A25C43] text-white' : 'bg-[#F1DFDA] text-[#A25C43]'}`}
        >
          Past Events
        </button>
        <button 
          onClick={() => setActiveTab('ongoing')} 
          className={`py-2 px-4 rounded ${activeTab === 'ongoing' ? 'bg-[#A25C43] text-white' : 'bg-[#F1DFDA] text-[#A25C43]'}`}
        >
          Ongoing Events
        </button>
        <button 
          onClick={() => setActiveTab('upcoming')} 
          className={`py-2 px-4 rounded ${activeTab === 'upcoming' ? 'bg-[#A25C43] text-white' : 'bg-[#F1DFDA] text-[#A25C43]'}`}
        >
          Upcoming Events
        </button>
      </div>
      <div className="w-3/4 mx-auto">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="flex bg-[#F1DFDA] text-[#A25C43] p-4 rounded-lg mb-4 h-44 border-b-2 border-[#E1C2B7] transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="w-[15%] flex items-center justify-center">
              <div className="text-center">
                <p className='text-[18px] font-semibold'>{event.startTime}</p>
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

export default RectangularCard;
