import React from 'react';

function Navbar() {
    return (
    <header className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-500 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">Company Name here</h1>
            </div>
            <nav className="flex-grow flex justify-center">
                <ul className="flex space-x-8">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/socialbot" className="hover:underline">Social Situation Chatbot</a></li>
                    <li><a href="/files" className="hover:underline">Video Analyzer</a></li>
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                </ul>
            </nav>
            <button className="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-teal-500 duration-300">
                <span>Sign In →</span>
            </button>
        </div>
    </header>
    );
}

export default Navbar;