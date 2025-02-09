import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SocialBot() {
    const [inputData, setInputData] = useState('');
    const [messages, setMessages] = useState([]);
    const [signUpData, setSignUpData] = useState('');
    const [logInData, setLogInData] = useState('');
    const [loginresponse, setLoginResponse] = useState('')
  
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
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          signup_data: signUpData,
        });
        const aiMessage = { type: 'AI', text: response.data.result};
        setMessages([aiMessage]);
      } catch (error) {
        console.error('Error running function:', error);
      }
    };
    const handleLogIn = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/login', {
          login_data: logInData,
        });
        setLoginResponse(response.data.result)
        const aiMessage = { type: 'AI', text: response.data.socialSit};
        setMessages([aiMessage]);
      } catch (error) {
        console.error('Error running function:', error);
      }
    };

    return (
      <div className="chat-container">
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
  
          <textarea
            id="message3"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter username to login..."
            value={logInData}
            onChange={(e) => setLogInData(e.target.value)}
          ></textarea>
          <button onClick={handleLogIn}>Log in!</button>
          <p>{loginresponse}</p>
          <p className='text-red-700'>HELLOO</p>
          </div>  
      </div>
      
    );
  }

export default SocialBot
