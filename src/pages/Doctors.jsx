import React, { useState } from 'react';
import Avatar from '../assets/image.png';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(1); // 1: Add File, 2: Check Records, 3: Errors, 4: Completed
  const navigate = useNavigate();
  const [importData, setImportData] = useState([
    {
      DoctorId: "P1",
      DoctorName: "Anish Mehta",
      specialization: "Cardiologist",
      hospitalClinic: "K.J. Somaya",
      city: "Mumbai",
      mobileNumber: "8446524897",
      whatsappNumber: "9321368748",
      designation: "Consultant",
      description: "—",
      status: "success"
    },
    {
      DoctorId: "P2",
      DoctorName: "Karan Roy",
      specialization: "Dermatologist",
      hospitalClinic: "Satyam",
      city: "Mumbai",
      mobileNumber: "9456389739",
      whatsappNumber: "7445788935",
      designation: "Physician",
      description: "—",
      status: "success"
    },
    {
      DoctorId: "P3",
      DoctorName: "Sunil Jagtap",
      specialization: "Oncologist",
      hospitalClinic: "J-J. Hospital",
      city: "Mumbai",
      mobileNumber: "7468659735",
      whatsappNumber: "9834527869",
      designation: "Physician",
      description: "—",
      status: "error"
    },
    {
      DoctorId: "P3",
      DoctorName: "Sunil Jagtap",
      specialization: "Oncologist",
      hospitalClinic: "J-J. Hospital",
      city: "Mumbai",
      mobileNumber: "7468659735",
      whatsappNumber: "9834527869",
      designation: "Physician",
      description: "Duplicate entry",
      status: "error"
    },
    {
      DoctorId: "P3",
      DoctorName: "Sunil Jagtap",
      specialization: "Oncologist",
      hospitalClinic: "J-J. Hospital",
      city: "Mumbai",
      mobileNumber: "7468659735",
      whatsappNumber: "9834527869",
      designation: "Physician",
      description: "Invalid hospital format",
      status: "error"
    }
  ]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  // Calculate import statistics
  const totalRecords = importData.length;
  const successRecords = importData.filter(item => item.status === "success").length;
  const errorRecords = importData.filter(item => item.status === "error").length;

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-black ">VIBECOPILOT</h1>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={Avatar}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="text-md text-gray-500 mb-4">
        <span className="font-bold">Module</span> &gt; <span className="font-bold">Page</span> &gt; <span className="font-bold text-black">Import</span>
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="flex space-x-8 mr-4">
          {[
            "Add File",
            "Check Records",
            "Errors",
            "Completed",
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleStepClick(index + 1)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${activeStep > index ? "bg-blue-400" : "bg-gray-200 text-black"}`}>
                {index + 1}
              </div>
              <span className={`mt-1 text-xs ${activeStep === index + 1 ? "text-blue-600 font-bold" : "text-gray-600"}`}>{step}</span>
            </div>
          ))}
          
          
        </div>
        <div className=''>
        <input 
            type="text"
            className='border border-gray-300 rounded px-3 py-2'
            placeholder='Search for the articles'
          />
        </div>
      </div>

      {activeStep === 1 && (
        <div className='flex gap-3 mt-5'>
        <div className='border border-[#CCE4FF] px-10 bg-[#CCE4FF] rounded-xl shadow-xl '></div>
        <div className=" mx-auto border w-[100%] border-gray-200 p-8 rounded-md shadow-xl px-20 ">

          <p className="text-center font-bold my-5">
            To Bulk import this Data submit excel file or Templates CsV File
          </p>

          <div className="flex items-center space-x-4 my-8 border-b-2 border-gray-200 py-3">
            <label className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer">
              Choose file
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-gray-600 font-bold pl-10">
              {fileName ? fileName : "No file chosen"}
            </span>
          </div>

          <button className="border-2 border-blue-900 text-blue-900 px-6 py-2 rounded font-bold hover:bg-blue-50">
            Download CSV
          </button>

          <div className="flex justify-center mt-15 space-x-4">
            <button className="border-2 border-blue-900 text-blue-900 px-6 py-2 rounded font-bold hover:bg-blue-50">
              Cancel
            </button>
            <button 
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
              onClick={() => setActiveStep(2)}
            >
              Next
            </button>
          </div>
        </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className='flex gap-3 mt-5'>
             <div className='border border-[#CCE4FF] px-10 bg-[#CCE4FF] rounded-xl shadow-xl '></div>
        <div className="w-full overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Import Status</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-200 text-left">Employee ID</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Employee Name</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Specialization</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Hospital / Clinic</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">City</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Mobile Number</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">WhatsApp Number</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Designation</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {importData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-4 border-b border-gray-200">{row.employeeId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.employeeName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.specialization}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.hospitalClinic}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.city}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.mobileNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.whatsappNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.designation}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4 space-x-4">
            <button className="border-2 border-blue-900 text-blue-900 px-6 py-2 rounded font-bold hover:bg-blue-50">
              Cancel
            </button>
            <button 
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
              onClick={() => setActiveStep(3)}
            >
              Start Importing
            </button>
          </div>
        </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className='flex gap-3 mt-5'> 
            <div className='border border-[#CCE4FF] px-10 bg-[#CCE4FF] rounded-xl shadow-xl '></div>
        <div className="w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Import Status</h2>
            <div className="text-gray-600">
              <span className="font-bold">{successRecords}/{totalRecords}</span> records successfully imported
              <span className="mx-4">|</span>
              <span>12 min</span>
            </div>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-200 text-left">Employee ID</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Employee Name</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Specialization</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Hospital / Clinic</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">City</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Mobile Number</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">WhatsApp Number</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Designation</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {importData.map((row, index) => (
                <tr key={index} className={row.status === "error" ? "bg-red-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-4 border-b border-gray-200">{row.employeeId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.employeeName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.specialization}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.hospitalClinic}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.city}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.mobileNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.whatsappNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.designation}</td>
                  <td className={`py-2 px-4 border-b border-gray-200 ${row.status === "error" ? "text-red-600" : ""}`}>
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-5 space-x-4">
            <button className="border-2 border-blue-900 text-blue-900 px-6 py-2 rounded font-bold hover:bg-blue-50">
              Cancel
            </button>
            <button 
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
              onClick={() => setActiveStep(4)}
            >
              Skip & Finish Importing
            </button>
          </div>
        </div>
        </div>
      )}

      {activeStep === 4 && (
        <div className="max-w-xl mx-auto border w-[60%] border-gray-200 p-8 rounded-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Import Completed</h2>
          <p className="text-gray-600 mb-6">
            {successRecords} records imported successfully. {errorRecords} records had errors.
          </p>
          <div className='flex gap-3 justify-center'>
          <button className='border-2 border-blue-900 px-6 py-2 rounded font-bold '>  
            Done
          </button>
          <button 
            className="bg-blue-900 text-white px-6 py-2 rounded font-bold hover:bg-blue-800"
            onClick={() => navigate('/bulk-videos')}
          >
            Generate Bulk Video 
          </button>
          </div>
         
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <button className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12H8m0 0l4-4m-4 4l4 4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Doctors;