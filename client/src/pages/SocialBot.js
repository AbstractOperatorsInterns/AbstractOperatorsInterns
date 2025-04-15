import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SocialBot({ signupResponse }) {
    const [inputData, setInputData] = useState('');
    const [messages, setMessages] = useState([]);
    const [signUpData, setSignUpData] = useState('');
    const [logInData, setLogInData] = useState('');
    const [loginResponse, setLoginResponse] = useState('')

    useEffect(() => {
      if (signupResponse) {
        const socialSit = { type: 'AI', text: signupResponse };
        setMessages([socialSit]);
      }
    }, [signupResponse]);
  
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

    return (
      <div className="flex flex-col h-screen w-screen bg-gray-100">
      <div className="flex-grow flex flex-col w-full p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">SocialBot Chat</h2>
          <div className="flex-grow overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {messages.map((message, index) => (
                  <div
                      key={index}
                      className={`p-3 my-2 max-w-[60rem] rounded-lg text-sm ${message.type === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-700 mr-auto'}`}
                  >
                      {message.text}
                  </div>
              ))}
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                  type="text"
                  className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit">Send</button>
          </form>
      </div>
  </div>
    );
  }

export default SocialBot
