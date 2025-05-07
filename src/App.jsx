import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import Create from './pages/Create'
import VideoProcessing from './pages/VideoProcessing'
import Gallery from './pages/Gallery'
import Profile from './pages/Profile'
import Doctors from './pages/Doctors'
import Bulkvideo from './pages/Bulkvideo'
import DoctorVideoprocessing from './pages/DoctorVideoprocessing'
import GenerateBulkVideos from './pages/generateBulkVideos'
import VideoComplete from './pages/VideoComplete'
import Terminate from './pages/Terminate'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      
      <Route 
       path='/create' 
       element={<Create/>}
      />
      <Route 
       path='/video-processing' 
       element={<VideoProcessing/>}
      />
<Route 
       path='/gallery' 
       element={<Gallery/>}
      />
      <Route 
       path='/create/profile' 
       element={<Profile/>}
      />
      <Route 
       path='/doctors' 
       element={<Doctors/>}
      />
      <Route
       path='/bulk-videos'
       element={<Bulkvideo/>}
      />
      <Route
      path='/doctor-video'
      element={<DoctorVideoprocessing/>}
      />
     <Route
      path='/generate-bulk-videos'
      element={<GenerateBulkVideos/>}
      />
      <Route
      path='/video-complete'
      element={<VideoComplete/>}
      />
      <Route
      path='/terminate'
      element={<Terminate/>}
      />
      </Routes>
       
    </Router>
  )
}

export default App
