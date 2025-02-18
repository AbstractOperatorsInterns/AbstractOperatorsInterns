import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './pages.css';

function FileUpload() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('chat');
  const [videoResponse, setVideoResponse] = useState(null);


  const handleFileUpload = () => {
    navigate('/files')
  };

  const handleGoBack = () => {
    navigate('/socialBot');
  };

  const detEmotion = async () => {
    const fileInput = document.getElementById('vidUpload');
    const file = fileInput.files[0];

    console.log("found file!");
    const data = new FormData();
    data.append("video", file);
    console.log("File details:", file);
    console.log("FormData:", [...data.entries()]);


    try {
      const response = await axios.post('http://localhost:5001/process_video', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Video processed successfully:", response.data);
      console.log("Video processed successfully:", response.data);
      setVideoResponse(response.data);
    } catch (error) {
      console.error("Error processing video:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="chat-container">
      <div>
        <h1>File Upload Page</h1>
        <input type="file" id="vidUpload" accept="video/*"></input>
        <button type="submit" onClick={detEmotion}>Submit</button>
        <button onClick={handleGoBack}>Social Bot</button>

        {videoResponse && (
          <div class="vidResponse">{videoResponse}</div>
        )}

      </div>
    </div>

  );
}

export default FileUpload