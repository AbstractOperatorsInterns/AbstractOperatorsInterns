import React from 'react';

function Navbar() {
    return (
    <header className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 ">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">Company Name here</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/socialbot" className="hover:underline">Social Situation Chatbot</a></li>
                    <li><a href="/files" className="hover:underline">Video Analyzer</a></li>
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                </ul>
            </nav>
        </div>
    </header>
    );
}

export default Navbar;