import axios from 'axios';
import React, { useState } from 'react';

const AddEvent = () => {
  const [Data, setData] = useState({
    name: "",
    venue: "",
    date: "",
    short_description: "",
    fee: "",
    time: "",
    remarks: "",
    image_url: "",
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
        Data.fee === "" ||
        Data.time === "" ||
        Data.image_url === ""
      ) {
        alert("All fields are required");
      } else {
        // const response = await axios.post("https://localhost:5000/event/event_add",Data,{ headers });
        const response = await axios.post('http://localhost:5000/event/event_add', Data, {
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${localStorage.token}` 
            }
          });
        console.log(response)
        setData({
          name: "",
          venue: "",
          date: "",
          short_description: "",
          fee: "",
          time: "",
          remarks: "",
          image_url: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='h-[100%] p-0 md:p-4'>
      <h1 className='text-3xl md:text-5xl font-semibold text-[#086D8A] mb-8'>Add Event</h1>
      <div className='p-4 bg-white rounded'>
        <div>
          <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Event Name</label>
          <input 
            type="text"
            className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
            placeholder='name of event'
            name="name"
            required
            value={Data.name}
            onChange={change}
          />
        </div>
        <div className='mt-6'>
          <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Venue</label>
          <input 
            type="text"
            className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
            placeholder='venue of event'
            name="venue"
            required
            value={Data.venue}
            onChange={change}
          />
        </div>
        <div className='mt-6 flex gap-4'>
          <div className='w-1/2'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Date</label>
            <input 
              type="date"
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              name="date"
              required
              value={Data.date}
              onChange={change}
            />
          </div>
          <div className='w-1/2'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Time</label>
            <input 
              type="time"
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              name="time"
              required
              value={Data.time}
              onChange={change}
            />
          </div>
        </div>
        <div className='mt-6'>
          <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Short Description</label>
          <textarea
            className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
            rows="4"
            placeholder='short description of event'
            name="short_description"
            required
            value={Data.short_description}
            onChange={change}
          />
        </div>
        <div className='mt-6'>
          <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Remarks</label>
          <textarea
            className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
            rows="4"
            placeholder='remarks (optional)'
            name="remarks"
            value={Data.remarks}
            onChange={change}
          />
        </div>
        <div className='mt-6 flex gap-4'>
          <div className='w-1/2'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Fee</label>
            <input 
              type="number"
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              placeholder='fee of event'
              name="fee"
              required
              value={Data.fee}
              onChange={change}
            />
          </div>
          <div className='w-1/2'>
            <label htmlFor="" className='text-[#086D8A] text-xl font-medium'>Image URL</label>
            <input 
              type="text"
              className='w-full mt-2 bg-[#F3F8F9] text-zinc-700 p-2 outline-none'
              placeholder='image url'
              name="image_url"
              required
              value={Data.image_url}
              onChange={change}
            />
          </div>
        </div>
        <button className='mt-6 px-3 bg-[#086D8A] text-white font-semibold py-2 rounded hover:bg-[#075A71]'
          onClick={submit}>
          Add Event
        </button>
      </div>
    </div>
  );
}

export default AddEvent;