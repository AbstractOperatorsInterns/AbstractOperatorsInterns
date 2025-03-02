import React from 'react';

function Home() {
  return (
    <div className="relative bg-white">
      <div className="absolute inset-0 w-full h-screen overflow-hidden">
        <video 
          className="w-full h-full object-cover" 
          src="/gradient-video.mp4" 
          loop 
          autoPlay 
          muted
        />
        <div 
          className="absolute inset-0 bg-white" 
          style={{ 
            clipPath: "polygon(0% 100%, 100% 50%, 100% 100%)"
          }}
        />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-screen px-6 z-10">
        <div className="w-full md:w-3/4 text-center md:text-left">
          <p className="text-lg md:text-2xl text-white">Welcome to</p>
          <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold mb-4 leading-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            SocialHelp
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">
            <span className="text-white">Your comprehensive tool for </span> 
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text">
              training social awkwardness!
            </span>
          </p>
        </div>
        <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
          <img src="/handPhone.png" alt="phone" className="max-w-full h-auto object-contain" />
        </div>
      </div>

      <div className="relative w-full min-h-[650px] bg-cover bg-center flex flex-col justify-center items-center text-white px-6 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center">
          Welcome to INSERT NAME HERE
        </h1>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md mb-8 border border-purple-200 w-full">
          <div className="border-b border-purple-100 p-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="w-full">
                <img src="/old-people.png" alt="Elderly person using computer" className="rounded-lg shadow-md w-full max-w-[500px] mx-auto" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-emerald-600">INSERT INFORMATION HERE</h3>
                <p className="text-base sm:text-lg mb-4">INSERT INFORMATION HERE</p>
                <p className="text-base sm:text-lg mb-4">INSERT INFORMATION HERE</p>
                <p className="text-lg font-semibold text-emerald-600">Insert Information Here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-purple-200 w-full">
          <div className="border-b border-purple-100 p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-600">Insert Information here</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Insert Information Here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;