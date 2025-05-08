import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllDoctors } from "../api";
import logo from "../assets/ixoralogo.png";
import doctors from "../assets/doctors.png";
import { FaVideo, FaTable } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShare } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const Gallery = () => {
  const [viewMode, setViewMode] = useState("table"); // 'gallery' or 'table'
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const response = await getAllDoctors()
        
        console.log("doctor details",response)
        setDoctorsData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching doctors data:", err);
      }
    };

    fetchDoctorsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-12 py-11 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold">Loading doctor data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white px-12 py-11 flex justify-center items-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">Error loading data</p>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-12 py-11">
      <div className="flex justify-center md:justify-end mb-5 md:mb-8">
        <img src={logo} alt="Company Logo" className="w-auto h-20" />
      </div>

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
          {viewMode === "gallery" ? "Video Template Gallery" : "Doctor Data"}
        </h1>
        <p className="text-gray-600 font-semibold text-lg">
          {viewMode === "gallery"
            ? "Choose a template to start your next video project."
            : "View and manage doctor information."}
        </p>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setViewMode("table")}
          className={`px-4 py-2 rounded-md font-bold flex items-center gap-2 ${
            viewMode === "table"
              ? "bg-blue-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaTable /> Table
        </button>
        <div className="mt-6 space-y-2">
          <button
            onClick={() => navigate("/create/profile")}
            className="w-full bg-blue-800 text-white py-2 rounded-md font-bold hover:bg-blue-900 transition"
          >
            Use Template
          </button>
          <button className="w-full border border-gray-400 py-2 bg-white rounded-md font-bold text-gray-800 hover:bg-gray-100 transition">
            Preview
          </button>
        </div>
      </div>

      {viewMode === "gallery" ? (
        /* Template Card Section */
        <div className="flex gap-6 max-w-6xl">
          {/* Left Card */}
          <div className="bg-blue-50 border border-gray-200 rounded-xl p-6 w-100 flex flex-col justify-between">
            <div className="w-[100%]">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#0A0A6433] shadow flex items-center justify-center mb-4">
                <FaVideo className="" />
              </div>

              {/* Text Content */}
              <h2 className="text-md text-gray-500 font-semibold mb-1">
                Hypertension
              </h2>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Hypertension
              </h3>
              <p className="text-md text-gray-600 font-semibold">
                Professional slides for business presentations.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-2">
              <button
                onClick={() => navigate("/create/profile")}
                className="w-full bg-blue-800 text-white py-2 rounded-md font-bold hover:bg-blue-900 transition"
              >
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital / Clinic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    WhatsApp Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctorsData.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.clinic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.mobile_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.whatsapp_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.output_video ? (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(doctor.output_video);
                            // You can add a toast notification here if you want
                            toast.success("Link copied to clipboard!");
                          }}
                          className="text-blue-600 hover:underline font-bold cursor-pointer"
                        >
                          Copy Link
                        </button>
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-900 font-semibold">
                      {doctor.output_video ? (
                        <a
                          href={doctor.output_video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Video
                        </a>
                      ) : (
                        <span className="text-gray-500">Not generated</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {doctor.whatsapp_number && (
                        <a
                          href={`https://wa.me/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-700"
                        >
                          <FaWhatsapp size={20} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
