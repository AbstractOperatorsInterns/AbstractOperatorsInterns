import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [inputData, setInputData] = useState("")
  const [result, setResult] = useState("")
  const [signUpData, setSignUpData] = useState("")
  const [result2, setResult2] = useState("")

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
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        signup_data: signUpData
      })
      setResult2(response.data.result)
    } catch (error) {
      console.error("Error running function:", error)
      setResult("An error occurred. Please try again.")
    }
  }

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
      <button onClick={handleSubmit}> Talk With Social Bot!</button>
      <p>{result}</p>
      <textarea
        id="message2"
        rows={4}
        className="w-full px-3 py-2 text-gray-700 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter username..."
        value={signUpData}
        onChange={(e) => setSignUpData(e.target.value)}
      ></textarea>
      <button onClick={handleSignUp}>Sign up!</button>
      <p>{result2}</p>
    </div>
  )
}

export default App
