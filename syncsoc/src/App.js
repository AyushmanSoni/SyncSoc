import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home  from './pages/Home';
import Footer from './components/Footer/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AllEvents from './pages/AllEvents';
import Rangtarangini from './pages/Rangtarangini.jsx';
const App = () => {
  
  return (
    <div>
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path = "/" element={<Home/>} />
        <Route path = "/all-events" element={ <AllEvents/> } />
        <Route path = "/login" element={ <Login/> } />
        <Route path = "/signup" element={ <SignUp/> } />
        <Route path = "/drama" element={ <Rangtarangini/> } />
      </Routes>
      <Footer/>
      </Router>
      
      {/* <Routes>
      <Route path="/all-events" element={<AllEvents/>} />
      </Routes> */}
      
      
    </div>
  );
};

export default App;
