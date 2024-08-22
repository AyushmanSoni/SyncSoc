


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RectangularCard = () => {
  // const [events, setEvents] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   // Fetch data from the list_of_event API using axios
  //   const fetchEvents = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Retrieve the token from storage
  //       console.log(token)
        
  //       const response = await axios.get('http://localhost:5000/event/list_of_event', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,  // Add token to the request headers
  //         }
  //       });

  //       console.log(response)

  //       const result = response.data;

  //       if (Array.isArray(result)) {
  //         setEvents(result);
  //       } else {
  //         throw new Error('Unexpected data format received');
  //       }

  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //       setError('Failed to fetch events');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  // // Handle loading and error states
  // if (loading) {
  //   return <div>Loading events...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!events || events.length === 0) {
  //   return <div>No events found</div>;
  // }

  return (
    <div>
      events for past present and future will be shown here
    </div>
    // <div className="w-full">
    //   {events.map((event) => (
    //     <div key={event._id} className="flex bg-gray-200 text-[#683B2B] p-4 shadow-md rounded-lg mb-4">
    //       <div className="w-[15%] flex items-center justify-center">
    //         <div className="text-center">
    //           <p>{event.time}</p>
    //           <p>Onwards</p>
    //         </div>
    //       </div>
    //       <div className="w-[15%] flex items-center justify-center">
    //         <img
    //           src={event.image_url}
    //           alt={event.name}
    //           className="h-auto w-full object-contain"
    //         />
    //       </div>
    //       <div className="w-[45%] flex flex-col justify-center">
    //         <div className="flex-1 flex items-center justify-center">
    //           <p>{event.name}</p>
    //         </div>
    //         <div className="flex-1 flex items-center justify-center">
    //           <p>{event.short_description}</p>
    //         </div>
    //       </div>
    //       <div className="w-[25%] flex items-center justify-center">
    //         <button className="px-4 py-2 bg-[#683B2B] text-white rounded-full">
    //           Read More
    //         </button>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default RectangularCard;
