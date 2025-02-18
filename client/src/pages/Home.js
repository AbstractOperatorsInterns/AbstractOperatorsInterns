import React from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div>
        <video src={"/gradient-video.mp4"} loop autoPlay muted></video>
        <div 
          className="absolute inset-0 bg-white opacity-100 h-[875px]" 
          style={{ 
            clipPath: "polygon(0% 100%, 100% 50%, 100% 100%)"
          }}
        />
        <div className="absolute top-3/4 left-10 transform -translate-y-1/2 w-5/6 flex items-center justify-between h-[650px]">
          <div className="w-3/4">
            <p className="text-4xl leading-none text-white">Welcome to</p>
            <h1 className="text-[11rem] font-bold mb-4 leading-tight bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">SocialHelp</h1>
            <p className="text-3xl font-bold">
              <span className="text-white">Your comprehensive tool for </span> <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text">training social awkwardness!</span>
            </p>
          </div>
          <div className="w-1/3 flex justify-center ml-5 ">
            <img src="/handPhone.png" alt="phone" className="max-w-full h-auto object-contain" />
          </div>
        </div>
        
      </div>
      <div className="relative w-full h-[650px] bg-cover bg-center">
        <div className="absolute inset-0  flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-2 text-center md:text-7xl">Welcome to INSERT NAME HERE</h1>
          {/* Have this text rise in the future*/}
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md mb-8 border border-purple-200 w-full">
          <div className="border-b border-purple-100 p-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="w-full">
                <img src="/old-people.png" alt="Elderly person using computer" className="rounded-lg shadow-md w-full max-w-[500px] mx-auto" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-emerald-600">INSERT INFORMATION HERE</h3>
                <p className="text-lg mb-4">
                    INSERT INFORMATION HERE
                </p>
                <p className="text-lg mb-4">
                    INSERT INFORMATION HERE
                </p>
                <p className="text-lg font-semibold text-emerald-600">
                    Insert Inforamtion here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-purple-200 w-full">
          <div className="border-b border-purple-100 p-6">
            <h2 className="text-2xl font-semibold text-emerald-600">Insert Information here</h2>
            <p className="text-gray-600 mt-1">Insert Information Here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
