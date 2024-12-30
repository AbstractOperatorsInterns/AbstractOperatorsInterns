import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from 'axios'
<<<<<<< Updated upstream
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes

function FileUpload() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to the File Upload Page</h1>
    </div>
  );
}


function App() {
<<<<<<< Updated upstream
  <Router>
      <Routes>
        <Route path="/file-upload" element={<FileUpload />} />
      </Routes>
    </Router>
=======


  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([]);
  const [signUpData, setSignUpData] = useState('');
  const [result2, setResult2] = useState('');
>>>>>>> Stashed changes

  const [inputData, setInputData] = useState("")
  const [result, setResult] = useState("")
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
>>>>>>> Stashed changes
=======
  const [signUpData, setSignUpData] = useState("")
  const [result2, setResult2] = useState("")
  // const navigate = useNavigate();
>>>>>>> Stashed changes

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/members', {
        input_data: inputData
      })
      setResult(response.data.result)
    } catch (error) {
      console.error("Error running function:", error)
      setResult("An error occurred. Please try again.")
    }
  }
<<<<<<< Updated upstream
=======


  const fileUpload = async (e) => {
    e.preventDefault();
    navigate('/file-upload'); 
  }

<<<<<<< Updated upstream



>>>>>>> Stashed changes
  
=======
  const handleFileUpload = (e) => {
    // Clear the page content by setting the innerHTML of the body to an empty string
    document.body.innerHTML = 'file upload';
    const button = document.createElement('button');
    button.innerHTML = 'social bot';
    button.onclick = () =>{window.history.back()};
    document.body.appendChild(button);
  };
  

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======

  const handleFileUpload = (e) => {
    // Clear the page content by setting the innerHTML of the body to an empty string
    document.body.innerHTML = 'file upload';
    const button = document.createElement('button');
    button.innerHTML = 'social bot';
    button.onclick = () =>{window.history.back()};
    document.body.appendChild(button);
  };

>>>>>>> Stashed changes
  return (
    
    <div>
      <textarea
        id="message"
        rows={4}
        className="w-full px-3 py-2 text-gray-700 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter response..."
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}> Hello!!</button>
<<<<<<< Updated upstream
=======
      <button onClick={fileUpload}>File upload page</button>
>>>>>>> Stashed changes
      <p>{result}</p>
<<<<<<< Updated upstream
=======
      <textarea
        id="message2"
        rows={4}
        className="w-full px-3 py-2 text-gray-700 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter username..."
        value={signUpData}
        onChange={(e) => setSignUpData(e.target.value)}
      ></textarea>
      <button onClick={handleSignUp}>Sign up!</button>
      <button onClick={handleFileUpload}>Go to File Upload</button>
      <p>{result2}</p>
>>>>>>> Stashed changes
    </div>
  );
}

export default App
