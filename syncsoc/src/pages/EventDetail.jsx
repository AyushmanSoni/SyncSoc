import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Mockup function for checking login status
const check_login = () => {
  const token = localStorage.getItem("token");
  return !!token; // returns true if token exists, otherwise false
};

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/event_details/${eventId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvent(response.data);
      } catch (error) {
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegisterClick = () => {
    if (event) {
      console.log("Navigating to registration for event:", event.name); // Log the event name
      navigate(`/register/${eventId}`, { state: { eventName: event.name } });
      console.log(eventId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event details available</div>;

  return (
    <div className="w-full h-full p-4 md:p-8 bg-[#F1DFDA] flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Image section */}
        <div className="md:w-1/3 flex flex-col">
          <img
            src={event.image_url}
            alt={event.name}
            className="rounded-lg w-full object-cover h-64 md:h-auto"
          />
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={handleRegisterClick}
              className="bg-[#A25C43] text-white py-2 px-8 md:py-4 md:px-32 text-lg md:text-[20px] rounded-lg hover:bg-[#683B2B] transition duration-300"
            >
              Register
            </button>
          </div>
        </div>

        {/* Event details section */}
        <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#A25C43] mb-4">
            {event.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FFFDFB] p-4 rounded-lg">
              <p className="text-lg font-semibold text-[#A25C43]">Date:</p>
              <p className="text-xl text-[#683B2B]">
                {new Date(event.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bg-[#FFFDFB] p-4 rounded-lg">
              <p className="text-lg font-semibold text-[#A25C43]">Venue:</p>
              <p className="text-xl text-[#683B2B]">{event.venue}</p>
            </div>
            <div className="bg-[#FFFDFB] p-4 rounded-lg">
              <p className="text-lg font-semibold text-[#A25C43]">StartTime:</p>
              <p className="text-xl text-[#683B2B]">{event.startTime}</p>
            </div>
            <div className="bg-[#FFFDFB] p-4 rounded-lg">
              <p className="text-lg font-semibold text-[#A25C43]">EndTime:</p>
              <p className="text-xl text-[#683B2B]">{event.endTime}</p>
            </div>
            <div className="bg-[#FFFDFB] p-4 rounded-lg">
              <p className="text-lg font-semibold text-[#A25C43]">Fee:</p>
              <p className="text-xl text-[#683B2B]">{event.fee}</p>
            </div>
            <div className="bg-[#FFFDFB] p-4 rounded-lg md:col-span-2">
              <p className="text-lg font-semibold text-[#A25C43]">
                Description:
              </p>
              <p className="text-xl text-[#683B2B]">
                {event.short_description}
              </p>
            </div>
            <div className="bg-[#FFFDFB] p-4 rounded-lg md:col-span-2">
              <p className="text-lg font-semibold text-[#A25C43]">Remarks:</p>
              <p className="text-xl text-[#683B2B]">{event.remarks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
