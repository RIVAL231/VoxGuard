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
import ProtectedRoute from './ProtectedRoute'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard/>}/>} />
        <Route path="/analyse" element={<ProtectedRoute element={<Analysis />} />} />
      </Routes>
      <Analytic />
    </Router>
  )
}