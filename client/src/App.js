import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [inputData, setInputData] = useState("")
  const [result, setResult] = useState("")

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
  
  return (
    
    <div>
      <button onClick={handleSubmit}> Hello!!</button>
      <p>{result}</p>
    </div>
  )
}

export default App
