import React from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[650px] bg-cover bg-center">
        <div className="absolute inset-0 bg-emerald-300 bg-opacity-70 flex flex-col justify-center items-center text-white">
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
                <h3 className="text-3xl font-bold mb-4 text-purple-900">INSERT INFORMATION HERE</h3>
                <p className="text-lg mb-4">
                    INSERT INFORMATION HERE
                </p>
                <p className="text-lg mb-4">
                    INSERT INFORMATION HERE
                </p>
                <p className="text-lg font-semibold text-violet-950">
                    Insert Inforamtion here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-purple-200 w-full">
          <div className="border-b border-purple-100 p-6">
            <h2 className="text-2xl font-semibold text-purple-900">Insert Information here</h2>
            <p className="text-gray-600 mt-1">Insert Information Here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
