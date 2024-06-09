import React from 'react'
import background from '../assets/college.png'

const Signup = () => {
  return (
    <div
    className="relative w-full h-screen bg-cover bg-center"
    style={{ background: `url(${background})` }}
  >
    {/* Optional: Dark overlay for better readability */}
    {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

    {/* Centered signup form container */}
    {/* <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div> */}
    {/* {<div>

    </div>
    } */}
     <div className="absolute inset-y-0 right-0 w-5/6 bg-gradient-to-l from-[#F7F5F1] via-[#F7F5F1] to-transparent"></div>
     
     <div className="absolute inset-0 flex items-center justify-center z-10" style={{ marginLeft: '55%' }}>
  <div className="p-8  max-w-md w-full">
    <h2 className="text-[36px] font-bold text-[#683B2B]">Sign In to SyncSoc</h2>
    <p className='font-semibold text-[#D49E8D] text-[14px]'>Unite Innovate Succeed Together</p>
    <form>
      <div className="mb-6">
        <label htmlFor="email" className="block text-[#D49E8D] text-sm font-medium mb-3">Email Address</label>
        <input
          type="email"
          id="email"
          className=" block w-full px-3 py-2 border border-[#D49E8D] rounded-md focus:outline-none focus:ring-[#683B2B] focus:border-indigo-500 sm:text-sm text-[#683B2B]"
        />
      </div>
      <div className="mb-24">
        <label htmlFor="password" className="block text-[#D49E8D] text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-[#D49E8D]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#D49E8D] text-white py-2 px-4 rounded-md hover:bg-[#9F7D68] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D49E8D]"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>


  </div>
  )
}

export default Signup