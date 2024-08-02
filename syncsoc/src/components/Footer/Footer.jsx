import React from 'react';

const Footer = () => {
  return (
    <div className='px-24 py-8 bg-[#2E1A12] text-white'>
      <div className='flex flex-col md:flex-row justify-between items-start'>
        <div>
          <div className='flex items-center'>
            <img className='h-10 me-4 ' src='https://www.svgrepo.com/show/458732/group.svg' alt='logo' style={{ filter: 'invert(1)' }} />
            <h1 className='text-3xl font-semibold text-white'>
              Sync<span className='text-white'>Soc</span>
            </h1>
          </div>
          <p className="text-[16px] text-[#b7afa6] font-light tracking-normal leading-6 mt-2 sm:w-full" style={{ fontFamily: ["Open Sans Condensed Light", "sans-serif"] }}>
            Unite Innovate and Succeed Together
          </p>
          <div className='mt-20 mb-12 lg:mb-4'>
            <h2 className='font-medium mb-2 text-gray-300'>Contact Us</h2>
            <p>SyncSoc@gmail.com</p>
          </div>
        </div>
        <div className='text-center md:text-left'>
          <h2 className='font-semibold mb-2 text-gray-300'>Cultural Societies</h2>
          <ul className='text-[14px] font-light text-[#CDBFB1]'>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/rangtarangini?igsh=N2RudXJhMmljbjZt' target='_blank' rel='noopener noreferrer'>Rangtarangini</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/thegeneticxcrew?igsh=MWxicnMyMG5tamo5dw==' target='_blank' rel='noopener noreferrer'>GeneticX Crew</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/virtuosi.iiita?igsh=MXBybmtkenU2cTl4' target='_blank' rel='noopener noreferrer'>Viruosi</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/sarasva_iiita?igsh=eHExZjdyOXNzanF5' target='_blank' rel='noopener noreferrer'>Saraswa</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/nirmiti_iiita?igsh=bG90YnRrd2lsNnl0' target='_blank' rel='noopener noreferrer'>Nirmiti</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/thunderboltams?igsh=MXRvbDM4OWQ1Nzhvaw==' target='_blank' rel='noopener noreferrer'>AMS</a></li>
          </ul>
        </div>
        <div className='text-center md:text-left'>
          <h2 className='font-semibold mb-2 text-gray-300'>Technical Societies</h2>
          <ul className='text-[14px] font-light text-[#CDBFB1]'>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/geekhaven_iiita?igsh=ZzEzdGdpNXF5ZjM3' target='_blank' rel='noopener noreferrer'>Geekhaven</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/gravityiiita?igsh=MXdqOHB0Mnl5cGsyNg==' target='_blank' rel='noopener noreferrer'>Gravity</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/tesla_iiita?igsh=MXg3cXZ4YzZ0bHZ0eQ==' target='_blank' rel='noopener noreferrer'>Tesla</a></li>
          </ul>
        </div>
        <div className='text-center md:text-left'>
          <h2 className='font-semibold mb-2 text-gray-300'>Festivals</h2>
          <ul className='text-[14px] font-light text-[#CDBFB1]'>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/goeffervescence?igsh=Z2p5cDA5Z3htYWl5' target='_blank' rel='noopener noreferrer'>Effervescence</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/aparokshaiiita?igsh=MWtteXBwMjkwMjh1YQ==' target='_blank' rel='noopener noreferrer'>Aparoksha</a></li>
            <li className='mb-2 text-left'><a href='https://www.instagram.com/asmita_iiita?igsh=OW94aDRyb2VsanRs' target='_blank' rel='noopener noreferrer'>Asmita</a></li>
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
