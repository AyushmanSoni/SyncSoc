import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from storage

        const response = await axios.get(`http://localhost:5000/event/event_details/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Add token to the request headers
          }
        });

        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
      <img src={event.image_url} alt={event.name} className="w-full h-auto mb-4 rounded-lg" />
      <p className="text-lg text-gray-700">{event.full_description}</p>
      <div className="mt-4">
        <strong>Date:</strong> {event.date}
      </div>
      <div className="mt-2">
        <strong>Time:</strong> {event.time}
      </div>
    </div>
  );
};

export default EventDetails;
