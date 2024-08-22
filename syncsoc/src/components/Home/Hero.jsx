import React from 'react';
import heroimage from '../../assets/hero.svg';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='h-auto lg:h-[75vh] flex flex-col lg:flex-row bg-[#FFFDFB]'>
      <div className='w-full lg:w-1/2 flex flex-col justify-center p-4 lg:pl-[100px]'>
        <div className='pb-2 mt-20'>
          <h1 className='text-3xl lg:text-4xl font-bold text-[#2E1A12]'>
            Uniting&nbsp;
            <span className='text-[#683B2B]'>Campus Voices,</span>
          </h1>
        </div>
        <div>
          <h1 className='text-3xl mb-2 lg:text-4xl font-bold text-[#2E1A12]'>
            Connecting&nbsp;
            <span className='text-[#683B2B]'>Cultures,</span>
          </h1>
          <h1 className='text-3xl lg:text-4xl font-bold text-[#683B2B]'>
            Tech and Sports,
          </h1>
        </div>
        <div>
          <p className='text-sm lg:text-lg lg:w-[80%] text-[#b0725c] mt-8 font-medium'>
            Discover a dynamic hub where cultural, technical, and sports societies unite. Our platform promotes inclusivity, collaboration, and passion.
          </p>
        </div>
        <div className='mt-8'>
          <Link to = "/all-events" className='bg-[#683B2B] text-white text-lg font-semibold py-2 px-8 rounded hover:bg-[#2E1A12]'>
            Explore Events
          </Link>
        </div>
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-[#b0725c] font-medium'>Wide range of genres</span>
          </div>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-[#b0725c] font-medium'>Affordable prices</span>
          </div>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-[#b0725c] font-medium'>Exclusive collections</span>
          </div>
          <div className='flex items-center'>
            <span className='text-green-500 mr-2'>✔️</span>
            <span className='text-[#b0725c] font-medium'>Fast shipping</span>
          </div>
        </div>
      </div>
      <div className='relative lg:mt-16 mt-8 h-auto lg:h-full w-full lg:w-[50%]'>
        {/* Web view */}
        <div className='hidden lg:block'>
          <div className='absolute top-6 right-0 mt-16 mr-2 w-full h-[70%] bg-[#b0725c] rounded-l-[110px]' />
          <img 
            className='absolute top-16 mt-4 right w-full h-auto lg:w-[100%] lg:h-[70%] object-cover rounded-l-[100px]' 
            src={heroimage} 
            alt='Illustration' 
          />
        </div>
        {/* Mobile view */}
        <div className='block lg:hidden justify-center'>
          <div className='absolute top-16 lg:top-6 right-0 lg:mt-16 lg:mr-2 w-[90%] lg:w-full h-[70%] bg-[#b0725c] rounded-l-[110px] lg:block hidden' />
          <img 
            className='w-full lg:w-[90%] h-auto lg:h-[70%] object-cover rounded-l-[100px] border-8 border-[#8B4513]' 
            src={heroimage} 
            alt='Illustration' 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
