import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home  from './pages/Home';
import Footer from './components/Footer/Footer';
import Signup from './components/Signup';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
const App = () => {
  
  return (
    <div>
      <Navbar/>
      <Home/>
      <Footer/>
      <SignUp/>
      <Login/>
      
      
    </div>
  );
};

export default App;
