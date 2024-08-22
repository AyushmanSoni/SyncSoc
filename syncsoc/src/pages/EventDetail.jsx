import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetailsPage = () => {
  const { eventId } = useParams(); // Get eventId from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/event_details/${eventId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        setEvent(response.data);
      } catch (error) {
        setError('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event details available</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <img src={event.image_url} alt={event.name} />
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.venue}</p>
      <p>{event.short_description}</p>
      <p>{event.remarks}</p>
      <p>Fee: {event.fee}</p>
    </div>
  );
};

export default EventDetailsPage;
