import React, {useState, useEffect} from 'react'
import axios from 'axios'
<<<<<<< Updated upstream
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes

function App() {

  const [inputData, setInputData] = useState("")
  const [result, setResult] = useState("")
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
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
    </div>
  )
}

export default App
