"use client"

import { useState } from 'react'
import FileUpload from './components/FileUpload'
import ResultDisplay from './components/ResultDisplay'
import styles from './App.module.css'

export default function Analytics() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (file) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://audioforensics.tech/predict/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      // console.log('Parsed data:', data) // Debug log
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({ 
        status: 'error', 
        message: 'An error occurred while processing the file.' 
      })
    } finally {
      setLoading(false)
    }
   
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Audio Forensics Analyzer</h1>
        <FileUpload onFileUpload={handleFileUpload} isLoading={loading} />
        {loading && <div className={styles.loading}>Processing audio file...</div>}
        {result && <ResultDisplay result={result} />}
        {/* Debug output */}
     
      </main>
    </div>
  )
}