import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './FileUpload.module.css'

export default function FileUpload({ onFileUpload, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.uploadHeader}>
        <h2>Upload Audio File</h2>
        <p>Upload your audio file to check its authenticity using our AI model</p>
      </div>

      <div className={styles.uploadInfo}>
        <p>Supported formats: .wav, .mp3, .ogg, .flac</p>
        <p>Maximum file size: 10MB</p>
      </div>

      <label htmlFor="file-input" className={styles.fileLabel}>
        <span className={styles.uploadIcon}>📁</span>
        <span>Choose Audio File</span>
        <span className={styles.dragText}>or drag and drop here</span>
      </label>

      <input
        id="file-input"
        type="file"
        accept=".wav,.mp3,.ogg, .flac"
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      {selectedFile && (
        <div className={styles.fileName}>
          <span>Selected: {selectedFile.name}</span>
          <span className={styles.fileSize}>
            ({Math.round(selectedFile.size / 1024)} KB)
          </span>
        </div>
      )}

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Audio'}
      </button>
    </form>
    </>
  )
}

FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

FileUpload.defaultProps = {
  isLoading: false
}
