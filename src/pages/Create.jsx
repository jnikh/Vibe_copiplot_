import React from 'react'
import Avatar from '../assets/image.png'
import { FaUpload, FaVideo } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen   bg-white px-8 py-6 font-Cardo">
    {/* Header */}
    <div className="flex justify-between items-center mb-6 mx-5">
      <h1 className="text-xl  tracking-wide font-bold">VIBECOPILOT</h1>
      <img
        src={Avatar}
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>

    {/* Welcome Message */}
    <div className=" mt-20 ml-15 mb-15">
      <h2 className="text-2xl  text-gray-900 font-bold">
        Welcome Rohit Empowering Personalized Video
      </h2>
      <p className="text-gray-500 font-medium mt-1">
        Start by uploading details or explore your templates
      </p>
    </div>

    {/* Tabs */}
    <div className="flex space-x-8 border-b border-gray-300 mb-6 ml-15 mr-11">
      <button className="pb-2 border-b-2 border-black text-black font-bold">
        My Videos
      </button>
      <button onClick={()=>navigate('/gallery')} className="pb-2 text-gray-500 font-bold">Templates</button>
      <button className="pb-2 text-gray-500 font-bold">Analytics</button>
      <button onClick={()=>{}} className="pb-2 text-gray-500 font-bold">Employees</button>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-15 mr-11 mt-18">
      {/* Card 1 */}
      <div className="border-1 border-gray-200 rounded-lg p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <FaUpload className="text-blue-700 text-xl" />
          </div>
          <h3 className="text-lg  mb-2 mt-2 font-bold">Add Doctor Details</h3>
          <p className="text-gray-500 mb-10 font-semibold">
            Add a details to generate a new video.
          </p>
          <div className="flex space-x-4">
            <button onClick={()=>navigate('/doctors')} className="bg-[#0c0b6b] text-white px-6 py-2 font-bold rounded hover:bg-[#1c1b7b]">
              Upload
            </button>
            <button onClick={()=>navigate('/create/profile')} className="border-2 border-[#0c0b6b] text-[#0c0b6b] px-6 py-2 rounded font-bold hover:bg-blue-50">

              Create
            </button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="border-1 border-gray-200 rounded-lg p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <FaVideo className="text-blue-700 text-xl" />
          </div>
          <h3 className="text-lg  mb-2 mt-2 font-bold">Browse Generated Video</h3>
          <p className="text-gray-500 mb-10 font-semibold ">Explore generate video</p>
          <button onClick={()=>navigate('/gallery')} className="bg-[#0c0b6b] text-white px-6 py-2 font-bold rounded hover:bg-[#1c1b7b]">
            View Video
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Create
