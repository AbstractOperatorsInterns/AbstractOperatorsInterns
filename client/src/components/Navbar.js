import React, { useState } from 'react';
import axios from 'axios';

function Navbar({ setSignupResponse, signupResponse }) {
    const [logInData, setLogInData] = useState('');
    const [loginResponse, setLoginResponse] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [signUpData, setSignUpData] = useState('');

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                login_data: logInData,
            });
            setLoginResponse(response.data.result);
        } catch (error) {
            console.error('Error running function:', error);
            setLoginResponse('Login failed. Please try again.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                signup_data: signUpData,
            });
            setSignupResponse(response.data.result);  // from props
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <header className="z-50 bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-500 text-white p-4">
            <div className="container mx-auto flex items-center justify-between relative">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">SocialHelp</h1>
                </div>
                <nav className="flex-grow flex justify-center">
                    <ul className="flex space-x-8">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/socialbot" className="hover:underline">Social Situation Chatbot</a></li>
                        <li><a href="/files" className="hover:underline">Video Analyzer</a></li>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                    </ul>
                </nav>
                <ul className="flex-grow flex space-x-8 justify-end">
                    <li><div className="relative">
                    <button 
                        className="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-teal-500 duration-300"
                        onClick={() => {
                            setShowDropdown(!showDropdown);
                            setShowDropdown2(false);
                        }}
                    >
                        Log In →
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-700 shadow-lg rounded-lg p-4 border z-50">
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md mb-2"
                                placeholder="Enter username!"
                                value={logInData}
                                onChange={(e) => setLogInData(e.target.value)}
                            />
                            <button 
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleLogIn}
                            >
                                Log in!
                            </button>
                            <p className="text-sm text-gray-600 mt-2">{loginResponse}</p>
                        </div>
                    )}
                </div></li>
                    <li><div className="relative">
                    <button 
                        className="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-teal-500 duration-300"
                        onClick={() => {
                            setShowDropdown2(!showDropdown2);
                            setShowDropdown(false);
                        }}
                       
                    >Sign Up →</button>
                    {showDropdown2 && (
                        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-700 shadow-lg rounded-lg p-4 border z-50">
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md mb-2"
                                placeholder="Enter new username!"
                                value={signUpData}
                                onChange={(e) => setSignUpData(e.target.value)}
                            />
                            <button 
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleSignUp}
                            >
                                Sign up!
                            </button>
                            <p className="text-sm text-gray-600 mt-2">{loginResponse}</p>
                        </div>
                    )}
                </div></li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;