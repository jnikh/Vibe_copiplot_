import React, { useState, useRef } from 'react';
import axios from 'axios';
import { doctorVideoGeneration } from '../api';
import logo from '../assets/ixoralogo.png';
import profile from '../assets/blank.jpg';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';

const Profile = () => {
    const navigate = useNavigate();
    const [sameNumber, setSameNumber] = useState(true);
    const [profileImage, setProfileImage] = useState(profile);
    const [originalImage, setOriginalImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const fileInputRef = useRef(null);

    const [errors, setErrors] = useState({
        doctorName: '',
        specialization: '',
        hospital: '',
        city: '',
        mobileNumber: '',
        whatsappNumber: ''
    });

    const [formData, setFormData] = useState({
        doctorName: '',
        specialization: '',
        hospital: '',
        city: '',
        mobileNumber: '',
        whatsappNumber: '',
        description: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                alert('Please select an image file (JPEG, PNG, etc.)');
                return;
            }
            
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setOriginalImage(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const getCroppedImg = async () => {
        try {
            const croppedImage = await getCroppedImage(originalImage, croppedArea);
            setProfileImage(croppedImage);
            setShowCropper(false);
        } catch (e) {
            console.error('Error cropping image', e);
        }
    };

    const getCroppedImage = (imageSrc, crop) => {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                
                canvas.width = crop.width;
                canvas.height = crop.height;
                
                ctx.drawImage(
                    image,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                );
                
                resolve(canvas.toDataURL('image/jpeg'));
            };
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            doctorName: '',
            specialization: '',
            hospital: '',
            city: '',
            mobileNumber: '',
            whatsappNumber: ''
        };

        if (!formData.doctorName.trim()) {
            newErrors.doctorName = "Doctor Name is required";
            valid = false;
        }
        if (!formData.specialization.trim()) {
            newErrors.specialization = "Specialization is required";
            valid = false;
        }
        if (!formData.hospital.trim()) {
            newErrors.hospital = "Hospital name is required";
            valid = false;
        }
        if (!formData.city.trim()) {
            newErrors.city = "City name is required";
            valid = false;
        }
        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = "Mobile number is required";
            valid = false;
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Invalid mobile number";
            valid = false;
        }
        if (!formData.whatsappNumber.trim()) {
            newErrors.whatsappNumber = "WhatsApp number is required";
            valid = false;
        } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
            newErrors.whatsappNumber = "Invalid WhatsApp number";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setApiError('');

        try {
            const formDataToSend = new FormData();
            
            // Add all required fields
            formDataToSend.append('name', formData.doctorName);
            formDataToSend.append('designation', 'Doctor');
            formDataToSend.append('clinic', formData.hospital);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('specialization', formData.specialization);
            formDataToSend.append('mobile_number', formData.mobileNumber);
            formDataToSend.append('whatsapp_number', formData.whatsappNumber);
            formDataToSend.append('description', formData.description);
            
            // Add image if changed
            if (profileImage !== profile) {
                const blob = await fetch(profileImage).then(r => r.blob());
                formDataToSend.append('image', blob, 'profile.jpg');
            }
            const response = await doctorVideoGeneration(formDataToSend)
            // const response = await axios.post(
            //     'http://13.126.205.205:8002/api/generate-video/',
            //     formDataToSend,
            //     {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     }
            // );

            navigate('/doctor-video', { state: { videoData: response } });
            
        } catch (error) {
            console.error('API Error:', error);
            setApiError(error.response?.data?.message || 'Failed to generate video. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row min-h-screen bg-white">
                {/* Left - Form */}
                <div className="flex-1 px-10 py-10">
                    <h2 className="text-2xl font-bold mb-6 mt-10">Basic Information</h2>

                    <form className="space-y-4 max-w-2xl mt-15 md:ml-10" onSubmit={handleSubmit}>
                        {/* Doctor Full Name */}
                        <div>
                            <label className="block font-bold text-xl mb-2">Doctor Full Name</label>
                            <input
                                type="text"
                                name="doctorName"
                                placeholder="Enter full name"
                                className={`w-full border ${errors.doctorName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 mb-1`}
                                value={formData.doctorName}
                                onChange={handleInputChange}
                            />
                            {errors.doctorName && <p className="text-red-500 text-sm">{errors.doctorName}</p>}
                        </div>

                        {/* Specialization & Hospital */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-bold text-xl">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    placeholder="Enter specialization"
                                    className={`w-full border ${errors.specialization ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 mb-1`}
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                />
                                {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
                            </div>
                            <div>
                                <label className="block font-bold text-xl mb-2">
                                    Hospital / Clinic Name
                                </label>
                                <input
                                    type="text"
                                    name="hospital" 
                                    placeholder="Enter hospital or clinic"
                                    className={`w-full border ${errors.hospital ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 mb-1`}
                                    value={formData.hospital}
                                    onChange={handleInputChange}
                                />
                                {errors.hospital && <p className="text-red-500 text-sm">{errors.hospital}</p>}
                            </div>
                        </div>

                        {/* City */}
                        <div>
                            <label className="block mb-2 font-bold text-xl">City</label>
                            <input
                                type="text"
                                name="city" 
                                placeholder="Enter city"
                                className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 mb-1`}
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>

                        {/* Mobile & WhatsApp */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
                            <div>
                                <label className="block mb-1 font-bold text-xl">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileNumber" 
                                    placeholder="Enter mobile number"
                                    className={`w-full border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
                                    value={formData.mobileNumber}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        if (sameNumber) {
                                            setFormData(prev => ({
                                                ...prev,
                                                whatsappNumber: e.target.value
                                            }));
                                        }
                                    }}
                                />
                                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-bold text-xl">WhatsApp Number</label>
                                <input
                                    type="text"
                                    name="whatsappNumber"
                                    placeholder="Enter WhatsApp number"
                                    className={`w-full border ${errors.whatsappNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
                                    value={formData.whatsappNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.whatsappNumber && <p className="text-red-500 text-sm">{errors.whatsappNumber}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={sameNumber}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSameNumber(checked);
                                        if (checked) {
                                            setFormData(prev => ({
                                                ...prev,
                                                whatsappNumber: prev.mobileNumber
                                            }));
                                        }
                                    }}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <label className="font-medium text-md">
                                    WhatsApp Number Same
                                    <br />
                                    <span className="text-gray-500 text-xs">
                                        Check if both numbers are same
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-bold text-xl mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                placeholder="Describe the doctor (optional)"
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className='border-2 px-5 bg-blue-900 text-white py-3 rounded font-bold hover:bg-blue-800 transition-colors'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Generating...' : 'Save & Generate'}
                        </button>

                        {apiError && (
                            <div className="text-red-500 mt-2">
                                {apiError}
                            </div>
                        )}
                    </form>
                </div>

                {/* Right - Profile and Template */}
                <div className="bg-blue-100 w-full md:w-[30%] px-6 py-10 flex flex-col items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-auto h-15 object-cover mb-8 hidden sm:block"
                    />

                    <div className="relative mb-6 w-70 h-70">
                        {showCropper ? (
                            <div className="relative w-full h-full">
                                <Cropper
                                    image={originalImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => setShowCropper(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={getCroppedImg}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={profileImage}
                                    alt="Doctor"
                                    className="w-full h-full object-cover border-8 border-blue-900"
                                />
                                <div
                                    className="absolute -bottom-2 -right-4 bg-blue-200 rounded-full p-5 cursor-pointer hover:bg-blue-300"
                                    onClick={triggerFileInput}
                                >
                                    <FaUpload className="w-11 h-11" />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Video Templates</h3>
                    <label className="text-sm font-medium mb-1">Select Video Template</label>
                    <select onClick={() => navigate("/gallery")} className="w-full mb-4 border border-gray-300 rounded-md px-4 py-2">
                        <option>Choose Template</option>
                        <option onClick={() => navigate("/gallery")}>Hypertension</option>
                        <option onClick={() => navigate("/gallery")}>Diabetes</option>
                    </select>

                    <div className="bg-white border border-red-300 p-3 rounded-md text-xs text-red-600 space-y-1">
                        <p>1. For better quality size should be width=515px, height=515px*</p>
                        <p>2. Max File Size should be 500KB for greeting and JPG*</p>
                        <p>3. Video processing will take up to 60 minutes or more depending on video rendering.*</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;