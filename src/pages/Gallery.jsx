import React, { useState } from 'react';
import doctors from '../assets/doctors.png';
import { FaVideo, FaTable } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaShare } from 'react-icons/fa6';

const Gallery = () => {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'table'
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-12 py-11">
      {/* Breadcrumbs */}
      <nav className="text-lg text-gray-500 mb-4 space-x-1 font-bold">
        <span>My Videos</span>
        <span>&gt;</span>
        <span>Templates</span>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">Analytics</span>
      </nav>

      {/* Title and Subtitle */}
      <div className="mt-15 mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {viewMode === 'gallery' ? 'Video Template Gallery' : 'Employee Data'}
        </h1>
        <p className="text-gray-600 font-semibold text-lg">
          {viewMode === 'gallery' 
            ? 'Choose a template to start your next video project.' 
            : 'View and manage employee information.'}
        </p>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setViewMode('gallery')}
          className={`px-4 py-2 rounded-md font-bold flex items-center gap-2 ${
            viewMode === 'gallery'
              ? 'bg-blue-800 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <FaVideo /> Gallery
        </button>
        <button
          onClick={() => setViewMode('table')}
          className={`px-4 py-2 rounded-md font-bold flex items-center gap-2 ${
            viewMode === 'table'
              ? 'bg-blue-800 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <FaTable /> Table
        </button>
      </div>

      {viewMode === 'gallery' ? (
        /* Template Card Section */
        <div className="flex gap-6 max-w-6xl">
          {/* Left Card */}
          <div className="bg-blue-50 border border-gray-200 rounded-xl p-6 w-100 flex flex-col justify-between">
            <div className='w-[100%]'>
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#0A0A6433] shadow flex items-center justify-center mb-4">
                <FaVideo className=''/>
              </div>

              {/* Text Content */}
              <h2 className="text-md text-gray-500 font-semibold mb-1">Hypertension</h2>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hypertension</h3>
              <p className="text-md text-gray-600 font-semibold">
                Professional slides for business presentations.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-2">
              <button onClick={()=>navigate('/create/profile')} className="w-full bg-blue-800 text-white py-2 rounded-md font-bold hover:bg-blue-900 transition">
                Use Template
              </button>
              <button className="w-full border border-gray-400 py-2 bg-white rounded-md font-bold text-gray-800 hover:bg-gray-100 transition">
                Preview
              </button>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="bg-blue-50 rounded-xl p-4 flex-1 flex items-center justify-center">
            <img
              src={doctors}
              alt="Medical Team"
              className="rounded-lg object-cover max-h-[300px]"
            />
          </div>
        </div>
      ) : (
        /* Table Section */
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital / Clinic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Url</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">P1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Anish Mehta</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cardiologist</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">K.J. Somaya</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mumbai</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8446524897</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9321368748</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Consultant</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">—</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-900 font-semibold">Link</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold"><FaShare/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">P2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Karan Roy</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dermatologist</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Satyam</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mumbai</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9456389739</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7445788935</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Physician</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">—</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-900 font-semibold">Link</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold"><FaShare/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">P3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sunil Jagtap</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Oncologist</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">J.J Hospital</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mumbai</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7468659735</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9834527869</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Physician</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">—</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-900 font-semibold">Link</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold"><FaShare/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between">
              {/* <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-800 hover:bg-blue-900">
                Start Importing
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;