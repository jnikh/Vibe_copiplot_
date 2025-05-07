import React ,{useState} from 'react'
import Avatar from '../assets/image.png'
import profile from '../assets/profile.png'
import { FaCamera } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();
    const [sameNumber, setSameNumber] = useState(true);

  return (
   <div>

      <div className="flex flex-col md:flex-row min-h-screen  bg-white">
      {/* Left - Form */}
      <div className="flex-1 px-10 py-10 ">
      <h1 className="text-xl tracking-wide font-bold mb-8 ">VIBECOPILOT</h1>
      <h2 className="text-2xl font-semibold mb-6 ">Basic Information</h2>

        <form className="space-y-4 max-w-2xl ml-10">
          {/* Doctor Full Name */}
          
          <div>
            <label className="block font-medium mb-1">Doctor Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Specialization & Hospital */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Specialization</label>
              <input
                type="text"
                placeholder="Enter specialization"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Hospital / Clinic Name
              </label>
              <input
                type="text"
                placeholder="Enter hospital or clinic"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              placeholder="Enter city"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Mobile & WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block font-medium mb-1">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">WhatsApp Number</label>
              <input
                type="text"
                placeholder="Enter WhatsApp number"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sameNumber}
                onChange={() => setSameNumber(!sameNumber)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="text-sm font-medium">
                WhatsApp Number Same
                <br />
                <span className="text-gray-500 text-xs">
                  Check if both numbers are same
                </span>
              </label>
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block font-medium mb-1">Designation</label>
            <input
              type="text"
              placeholder="Enter Designation"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe the person (3–4 lines)"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <button onClick={()=>navigate('/doctor-video')} className='border-2 px-5 bg-blue-900 text-white py-3 rounded font-bold'>Save & Generate</button>
        </form>
      </div>

      {/* Right - Profile and Template */}
      <div className="bg-blue-100 w-full md:w-[30%] px-6 py-10 flex flex-col items-center">
        {/* Top Avatar */}
        <img
    src={Avatar}
    alt="User"
    className="w-10 h-10 rounded-full object-cover border-4 border-blue-900 mb-8"
  />

        {/* Main Profile Image */}
        <div className="relative mb-6">
          <img
            src={profile}
            alt="Doctor"
            className="w-70 h-70 object-cover rounded-full border-8 border-blue-900"
          />
          <div className="absolute bottom-7 right-2 bg-blue-200 p-2 rounded-full">
            <FaCamera className='w-10 h-10'/>
          </div>
        </div>

        {/* Template Selector */}
        <h3 className="text-lg font-semibold mb-2">Video Templates</h3>
        <label className="text-sm font-medium mb-1">Select Video Template</label>
        <select onClick={() => navigate("/gallery")} className="w-full mb-4 border border-gray-300 rounded-md px-4 py-2">
          <option>Choose Template</option>
          <option onClick={() => navigate("/gallery")}>Hypertension</option>
          <option onClick={() => navigate("/gallery")}>Diabetes</option>
         
        </select>

        {/* Notes */}
        <div className="bg-white border border-red-300 p-3 rounded-md text-xs text-red-600 space-y-1">
          <p>1. For better quality size should be width=515px, height=515px*</p>
          <p>2. Max File Size should be 500KB for greeting and JPG*</p>
          <p>
            3. Video processing will take up to 60 minutes or more depending on video
            rendering.*
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
