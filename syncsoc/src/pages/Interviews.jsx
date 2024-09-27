import React, { useState } from 'react';

const InterviewSidebar = () => {
  const [activeTab, setActiveTab] = useState('drama');

  const tabs = [
    { name: 'Drama Interviews', id: 'drama' },
    { name: 'Dance Interviews', id: 'dance' },
    { name: 'Music Interviews', id: 'music' },
    { name: 'Art Interviews', id: 'art' }
  ];

  const interviewData = {
    drama: [
      { id: 1, title: 'Theatrical Techniques Workshop', date: '2024-09-10', time: '3:00 PM' },
      { id: 2, title: 'Stage Presence Training', date: '2024-09-15', time: '2:00 PM' }
    ],
    dance: [
      { id: 1, title: 'Contemporary Dance Auditions', date: '2024-09-12', time: '5:00 PM' },
      { id: 2, title: 'Hip-Hop Dance Workshop', date: '2024-09-20', time: '4:00 PM' }
    ],
    music: [
      { id: 1, title: 'Instrumental Music Auditions', date: '2024-09-18', time: '6:00 PM' },
      { id: 2, title: 'Vocal Performance Workshop', date: '2024-09-25', time: '7:00 PM' }
    ],
    art: [
      { id: 1, title: 'Painting Techniques Seminar', date: '2024-09-22', time: '1:00 PM' },
      { id: 2, title: 'Sculpture Workshop', date: '2024-09-28', time: '11:00 AM' }
    ]
  };

  return (
    <div className="flex bg-[#F1DFDA] min-h-screen">
      <div className="w-1/6 bg-white shadow-md  p-4">
        <div className="text-2xl font-semibold  text-[#A25C43] mb-4">Interviews</div>
        <div className="flex flex-col space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 text-lg font-medium ${activeTab === tab.id ? 'bg-[#F1DFDA] text-[#A25C43]' : ' text-gray-500 hover:bg-[#F1DFDA]'}`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4 pl-8">
        <h1 className="text-4xl font-semibold text-[#A25C43] mb-6">Interview Schedules</h1>
        <div className="space-y-4">
          {interviewData[activeTab].map(interview => (
            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md border border-[#E1C2B7]">
              <h2 className="text-xl font-semibold text-[#A25C43]">{interview.title}</h2>
              <p className="text-gray-700">Date: {interview.date}</p>
              <p className="text-gray-700">Time: {interview.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewSidebar;
