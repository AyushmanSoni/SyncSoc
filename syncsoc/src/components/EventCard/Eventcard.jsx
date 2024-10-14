// import React, { useEffect, useState } from 'react';

// const RectangularCard = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch data from the list_of_event API
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/event/list_of_event', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add authentication header if needed
//             'Authorization': 'Bearer token'
//           }
//         });
//         const result = await response.json();
//         setEvents(result);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (!events || events.length === 0) {
//     return <div>No events found</div>;
//   }

//   return (
//     <div className="w-full">
//       {events.map((event) => (
//         <div key={event._id} className="flex bg-gray-200 text-[#683B2B] p-4 shadow-md rounded-lg mb-4">
//           {/* First Div */}
//           <div className="w-[15%] flex items-center justify-center">
//             <div className="text-center">
//               <p>{event.time}</p>
//               <p>Onwards</p>
//             </div>
//           </div>

//           {/* Second Div */}
//           <div className="w-[15%] flex items-center justify-center">
//             <img
//               src={event.image_url} // Dynamically set the image source
//               alt={event.name}
//               className="h-auto w-full object-contain"
//             />
//           </div>

//           {/* Third Div */}
//           <div className="w-[45%] flex flex-col justify-center">
//             <div className="flex-1 flex items-center justify-center">
//               <p>{event.name}</p>
//             </div>
//             <div className="flex-1 flex items-center justify-center">
//               <p>{event.short_description}</p>
//             </div>
//           </div>

//           {/* Fourth Div */}
//           <div className="w-[25%] flex items-center justify-center">
//             <button className="px-4 py-2 bg-[#683B2B] text-white rounded-full">
//               Read More
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RectangularCard;
