import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home  from './pages/Home';
import Footer from './components/Footer/Footer';
import Signup from './components/Signup';
import SignUp from './pages/SignUp';
const App = () => {
  
  return (
    <div>
      <Navbar/>
      <Home/>
      <Footer/>
      <SignUp/>
      
      
    </div>
  );
};

export default App;
