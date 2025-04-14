import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/FileUpload'
import SocialBot from './pages/SocialBot'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import './input.css';


function App() {

  const [signupResponse, setSignupResponse] = useState('');

  return (
    <div className="App">
      <Navbar  setSignupResponse={setSignupResponse} signupResponse={signupResponse} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/files' element={<FileUpload />} />
          <Route path='/socialBot' element={<SocialBot signupResponse={signupResponse}/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div> 
  );
}

export default App;