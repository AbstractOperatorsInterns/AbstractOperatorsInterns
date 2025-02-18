import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/FileUpload';
import SocialBot from './pages/SocialBot'
import axios from 'axios';
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/files' element={<FileUpload />} />
          <Route path='/socialBot' element={<SocialBot />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;