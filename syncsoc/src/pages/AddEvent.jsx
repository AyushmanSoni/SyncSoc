import axios from 'axios';
import React, { useState } from 'react';

const AddEvent = () => {
  const [Data, setData] = useState({
    name: "",
    venue: "",
    date: "",
    short_description: "",
    fee: "0",
    startTime: "",
    endTime: "",
    remarks: "",
    image_url: "",
    form_link:""
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.name === "" ||
        Data.venue === "" ||
        Data.date === "" ||
        Data.short_description === "" ||
        Data.startTime === "" ||
        Data.endTime === "" ||
        Data.image_url === "" 
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post('http://localhost:5000/event/event_add', Data, {
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${localStorage.token}` 
            }
          });
        console.log(response);
        setData({
          name: "",
          venue: "",
          date: "",
          short_description: "",
          fee: "0",
          startTime: "",
          endTime: "",
          remarks: "",
          image_url: "",
          form_link: ""
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='h-[100%] p-0 md:p-4'>
      <h1 className='text-3xl md:text-2xl font-semibold text-[#683B2B] mb-4 ml-4 mt-4'>Add Events</h1>
      <div className='p-4'>
        
        {/* Event Name and Image URL */}
        <div className='mt-2 flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Event Name</label>
            <input 
              type="text"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              placeholder='Enter the name of event'
              name="name"
              required
              value={Data.name}
              onChange={change}
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Image URL</label>
            <input 
              type="text"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              placeholder='Enter image URL/Drive link'
              name="image_url"
              required
              value={Data.image_url}
              onChange={change}
            />
          </div>
        </div>

        {/* Date, Start Time, and End Time */}
        <div className='mt-4 flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Date</label>
            <input 
              type="date"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              name="date"
              required
              value={Data.date}
              onChange={change}
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Start Time</label>
            <input 
              type="time"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              name="startTime"
              required
              value={Data.startTime}
              onChange={change}
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>End Time</label>
            <input 
              type="time"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              name="endTime"
              required
              value={Data.endTime}
              onChange={change}
            />
          </div>
        </div>

        {/* Venue */}
        <div className='mt-4'>
          <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Venue</label>
          <input 
            type="text"
            className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
            placeholder='Enter the venue of event'
            name="venue"
            required
            value={Data.venue}
            onChange={change}
          />
        </div>

        {/* Short Description */}
        <div className='mt-4'>
          <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Short Description</label>
          <textarea
            className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
            rows="4"
            placeholder='Enter short description of the event'
            name="short_description"
            required
            value={Data.short_description}
            onChange={change}
          />
        </div>

        {/* Fee and Google Form Link */}
        <div className='mt-4 flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Fee</label>
            <input 
              type="number"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              placeholder='Enter the fee for the event'
              name="fee"
              required
              value={Data.fee}
              onChange={change}
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Google Form Link</label>
            <input 
              type="text"
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              placeholder='Enter Google form link for registration'
              name="form_link"
              required
              value={Data.form_link}
              onChange={change}
            />
          </div>
        </div>

        {/* Remarks and Submit Button */}
        <div className='mt-4 flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <label htmlFor="" className='text-[#683B2B] text-lg font-medium'>Remarks</label>
            <textarea
              className='w-full mt-2 bg-[#F3F8F9] rounded-lg border border-gray-300 text-zinc-700 p-2 outline-none'
              rows="4"
              placeholder='Optional remarks'
              name="remarks"
              value={Data.remarks}
              onChange={change}
            />
          </div>
          <div className='flex justify-end items-center'>
            <button
              className='px-6 py-3 bg-[#A25C43] text-white font-semibold rounded hover:bg-[#683B2B] transition duration-300 mt-6'
              onClick={submit}
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
