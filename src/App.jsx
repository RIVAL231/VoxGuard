import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import AnalyticsPage from './Analytics'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
      <Analytics />
    </Router>
  )
}