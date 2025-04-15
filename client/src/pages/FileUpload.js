import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload() {
    const [currentPage, setCurrentPage] = useState('chat');
  
    const handleFileUpload = () => {
      setCurrentPage('file-upload'); 
    };
  
    const handleGoBack = () => {
      setCurrentPage('chat');
    };
  
    return (
      <div className="chat-container">
          <div>
            <h1>File Upload Page</h1>
            <button onClick={handleGoBack}>Social Bot</button>
          </div>
      </div>
      
    );
  }

export default FileUpload
