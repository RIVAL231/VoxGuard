import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import AnalyticsPage from './Analytics'
import { Analytics } from '@vercel/analytics/react'
import Analytic from './Analytics'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './dashboard'
import AudioUpload from './UploadAnalyse'
import AudioRecorder from './AudioRecorder'
import Analysis from './Analysis'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/analytics" element={<Analytic />} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/analyse" element={<Analysis />} />
        {/* <Route path='/live' element={<AudioRecorder/>}/> */}
      </Routes>
      <Analytics />
    </Router>
  )
}