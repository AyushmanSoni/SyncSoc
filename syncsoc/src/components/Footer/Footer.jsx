import React from 'react';

const Footer = () => {
  return (
    <div className='px-24 py-8 bg-[#2E1A12] text-white'>
      <div className='flex flex-col md:flex-row justify-between items-start'>
        <div>
          <div className='flex items-center'>
            <img className='h-10 me-4' src='https://www.svgrepo.com/show/458732/group.svg' alt='logo' style={{ filter: 'invert(1)' }} />
            <h1 className='text-3xl font-semibold text-white'>
              Sync<span className='text-white'>Soc</span>
            </h1>
          </div>
          <p className="text-[16px] text-[#b7afa6] font-light tracking-normal leading-6 mt-2 sm:w-full" style={{ fontFamily: ["Open Sans Condensed Light", "sans-serif"] }}>
            Unite Innovate and Succeed Together
          </p>
          <div className='mt-20'>
            <h2 className='font-medium mb-2 text-gray-300'>Contact Us</h2>
            <p>SyncSoc@gmail.com</p>
          </div>
        </div>
        <div className='text-center md:text-left'>
          <h2 className='font-semibold mb-2 text-gray-300'>Cultural Societies</h2>
          <ul className='text-[14px] font-light text-[#CDBFB1]'>
            <li className='mb-2'><a href='https://www.instagram.com/cultural_soc1' target='_blank' rel='noopener noreferrer'>Rangtarangini</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/cultural_soc2' target='_blank' rel='noopener noreferrer'>GeneticX Crew</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/cultural_soc3' target='_blank' rel='noopener noreferrer'>Viruosi</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/cultural_soc4' target='_blank' rel='noopener noreferrer'>Saraswa</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/cultural_soc5' target='_blank' rel='noopener noreferrer'>Nirmiti</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/cultural_soc6' target='_blank' rel='noopener noreferrer'>AMS</a></li>
          </ul>
        </div>
        <div className='text-center md:text-left'>
          <h2 className='font-semibold mb-2 text-gray-300'>Technical Societies</h2>
          <ul className='text-[14px] font-light text-[#CDBFB1]'>
            <li className='mb-2'><a href='https://www.instagram.com/technical_soc1' target='_blank' rel='noopener noreferrer'>Geekhaven</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/technical_soc2' target='_blank' rel='noopener noreferrer'>Gravity</a></li>
            <li className='mb-2'><a href='https://www.instagram.com/technical_soc3' target='_blank' rel='noopener noreferrer'>Tesla</a></li>
          </ul>
        </div>
        <div className='text-center md:text-left'>
          <h2 className='font-semibold mb-2 text-gray-300'>Sports Society</h2>
          <ul className='text-[14px] font-light text-[#CDBFB1]'>
            <li><a href='https://www.instagram.com/sports_soc' target='_blank' rel='noopener noreferrer'>Spirit</a></li>
          </ul>
        </div>
      </div>
      <div className='mt-8 text-center'>
        <h1 className='text-0.5xl font-medium'>
          &copy; 2024, Made with love in IIITA
        </h1>
      </div>
    </div>
  );
}

export default Footer;
