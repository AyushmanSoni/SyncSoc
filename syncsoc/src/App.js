import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home  from './pages/Home';
import Footer from './components/Footer/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AllEvents from './pages/AllEvents';
import Rangtarangini from './pages/Rangtarangini.jsx';
import Saraswa from './pages/Saraswa.jsx'
import Virtuosi from './pages/Virtuosi.jsx'
import GeneticX from './pages/GeneticX.jsx'
import Ams from './pages/Ams.jsx'
import Nirmiti from './pages/Nirmiti.jsx'
import Geekhaven from './pages/Geekhaven.jsx'
import Gravity from './pages/Gravity.jsx'
import Tesla from './pages/Tesla.jsx'



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
        <Route path = "/lit" element={ <Saraswa/> } />
        <Route path = "/band" element={ <Virtuosi/> } />
        <Route path = "/dance" element={ <GeneticX/> } />
        <Route path = "/pic" element={ <Ams/> } />
        <Route path = "/art" element={ <Nirmiti/> } />
        <Route path = "/coding" element={ <Geekhaven/> } />
        <Route path = "/robotics" element={ <Gravity/> } />
        <Route path = "/electronics" element={ <Tesla/> } />
        

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
