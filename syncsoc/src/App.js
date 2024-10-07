import React, { useEffect } from "react"; // Import React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from react-redux
import { authActions } from "./store/auth"; // Import authActions from the auth slice (make sure to adjust the path to where the auth slice is located)

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
import Interview from './pages/Interview';
import SocEvents from './pages/SocEvents';
import AddMemberPage from "./pages/AddMember";
import ProSocEvents from "./pages/ProSocEvents";


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);
  
  const society = localStorage.getItem('society');

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
          <Route path="/interviews" element={<Interview/>} />
          <Route path="/eventdetails/:eventId" element={<EventDetail />} /> {/* Updated route */}
          <Route path="/events/:society" element={<SocEvents/>} />
          
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
      <Route index element={<ProSocEvents society={society}/>} />
      <Route path="/pro/add-event" element={<AddEvent />} />
      <Route path="/pro/add-member" element={<AddMemberPage society={society}/>} />

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
