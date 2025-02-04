

import { useState } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'
import FileUpload from './components/FileUpload'
import ResultDisplay from './components/ResultDisplay'
import { saveAs } from 'file-saver'
import styles from './App.module.css'


export default function Analytics() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)

  const handleFileUpload = async (file) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
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

  const handleAudioStop = async (blobUrl, blob) => {
    const file = new File([blob], 'recording.wav', { type: 'audio/wav' })
    setRecordedBlob(file)
    saveAs(blob, 'recording.wav')
    await handleSendRecordedAudio(file)
  }

  const handleSendRecordedAudio = async (file) => {
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      console.log('Sending file to backend:', file)
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
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
   <></>
  )
}