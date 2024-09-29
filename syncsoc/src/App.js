import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AllEvents from './pages/AllEvents';
import Rangtarangini from './pages/Rangtarangini';
import Saraswa from './pages/Saraswa';
import Virtuosi from './pages/Virtuosi';
import GeneticX from './pages/GeneticX';
import Ams from './pages/Ams';
import Nirmiti from './pages/Nirmiti';
import Geekhaven from './pages/Geekhaven';
import Gravity from './pages/Gravity';
import Tesla from './pages/Tesla';
import Spirit from './pages/Spirit';
import Profile from './pages/Profile';
import AddEvent from './pages/AddEvent';
import AboutUs from './pages/AboutUs';
import Interviews from './pages/Interviews';
import EventDetail from './pages/EventDetail';
import RegistrationForm from './pages/Regform';
import Settings from './components/Profile/Settings';
import Registered_events from './components/Profile/Registered_events';
import TeamPage from './pages/Teampage';


const App = () => {
  const role = localStorage.getItem('role');
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/drama" element={<Rangtarangini />} />
          <Route path="/lit" element={<Saraswa />} />
          <Route path="/band" element={<Virtuosi />} />
          <Route path="/dance" element={<GeneticX />} />
          <Route path="/pic" element={<Ams />} />
          <Route path="/art" element={<Nirmiti />} />
          <Route path="/coding" element={<Geekhaven />} />
          <Route path="/robotics" element={<Gravity />} />
          <Route path="/electronics" element={<Tesla />} />
          <Route path="/sport" element={<Spirit/>} />
          
          <Route path="/about" element={<AboutUs />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/eventdetails/:eventId" element={<EventDetail />} /> {/* Updated route */}
          
          <Route path="/settings" element={<Settings/>} />

          {/* // Profile component should include <Outlet /> to render child routes */}
<Route path="/pro" element={<Profile />}>
  {role === "member" ? (
    <>
      <Route index element={<Registered_events />} />
      <Route path="settings" element={<Settings />} />
    </>
  ) : role === "society" ? (
    <>
      <Route index element={<AllEvents />} />
      <Route path="/pro/add-event" element={<AddEvent />} />
      <Route path="settings" element={<Settings />} />
    </>
  ) : null}
</Route>


          <Route path="/team/:society" element={<TeamPage />} />
          

          <Route path="/register/:eventId" element={<RegistrationForm/>} />
        </Routes>
        {/* <AddEvent /> */}
        {/* {/* <AddEvent /> */} 
        {/* {/* <RegistrationForm/> */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
