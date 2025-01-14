import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([]);
  const [signUpData, setSignUpData] = useState('');
  const [result2, setResult2] = useState('');
  const [currentPage, setCurrentPage] = useState('chat');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { type: 'user', text: inputData };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      const response = await axios.post('http://localhost:5000/members', {
        input_data: inputData,
      });
      const aiMessage = { type: 'AI', text: response.data.result };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error running function:', error);
      const errorMessage = { type: 'AI', text: 'An error occurred. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };


  // const detEmotion = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:5001/summarize', {
  //       // signup_data: signUpData,
  //     });
  //     setResult2(response.data.result);
  //   } catch (error) {
  //     console.error('Error running function:', error);
  //     setResult2('An error occurred. Please try again.');
  //   }
  // };
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
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error processing video:", error);
      alert("An error occurred. Please try again.");
    }
  };





  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        signup_data: signUpData,
      });
      setResult2(response.data.result);
    } catch (error) {
      console.error('Error running function:', error);
      setResult2('An error occurred. Please try again.');
    }
  };

  const handleFileUpload = () => {
    setCurrentPage('file-upload');
  };

  const handleGoBack = () => {
    setCurrentPage('chat');
  };

  return (
    <div className="chat-container">
      {currentPage === 'file-upload' ? (
        <div>
          <h1>File Upload Page</h1>
          <input type="file" id="vidUpload" accept="video/*"></input>
          <button type="submit" onClick={detEmotion}>Submit</button>
          <button onClick={handleGoBack}>Social Bot</button>
        </div>
      ) : (
        // Chat Page
        <div>
          <div className="chat-box">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-bubble ${message.type === 'user' ? 'user-bubble' : 'ai-bubble'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <textarea
            id="message"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter response..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>Talk With Social Bot!</button>

          <textarea
            id="message2"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter username..."
            value={signUpData}
            onChange={(e) => setSignUpData(e.target.value)}
          ></textarea>
          <button onClick={handleSignUp}>Sign up!</button>
          <button onClick={handleFileUpload}>File Upload</button>
          <p>{result2}</p>
        </div>
      )}
    </div>
  );
}

export default App;