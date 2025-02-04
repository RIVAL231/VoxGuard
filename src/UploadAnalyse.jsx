import { useState } from "react"

const AudioUpload = () => {
  const [file, setFile] = useState(null)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const uploadedFile = event.dataTransfer.files[0]
    setFile(uploadedFile)
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      setData({
        forgeryType: responseData.forgeryType,
        forgeryProbability: responseData.forgeryProbability,
        result: responseData.result,
        timestamp: responseData.timestamp,
        maxSimilarity: responseData.impersonatedPerson,
      })
      console.log("Data:", responseData)
    } catch (error) {
      console.error("Upload failed", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            marginBottom: "20px",
            animation: "spin 1s linear infinite",
          }}
        >
          <svg style={{position:"relative",bottom:"1rem",right:"0rem",width:"100%",height:"100%"}} width="186" height="198" viewBox="0 0 186 198" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.179688 49.8256L92.6663 85.6478L185.153 49.8256L118.719 0.325684L140.864 38.1019L92.6663 56.3387L44.469 38.1019L66.6137 0.325684L0.179688 49.8256ZM62.0563 140.358L92.6681 160.549L123.28 140.358L99.8325 105.188L183.852 66.76L136.957 113.003L163.01 151.431L92.6681 197.674L22.3262 151.431L48.3787 113.003L1.4841 66.76L85.5036 105.188L62.0563 140.358Z" fill="#EE2644"/>
</svg>

        </div>
        <div
          style={{
            width: "200px",
            height: "4px",
            backgroundColor: "#e0e0e0",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "50%",
              backgroundColor: "#007bff",
              borderRadius: "2px",
              animation: "progress 1s ease-in-out infinite",
            }}
          ></div>
        </div>
        <p
          style={{
            marginTop: "20px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Processing your audio file...
        </p>
        <style>
          {`
            
            @keyframes progress {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}
        </style>
      </div>
    )
  }

  if (data) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div style={{ padding: "20px", width: "90%" }}>
          <h2>Record Audio File</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              style={{
                background: "#e0f2ff",
                padding: "20px",
                borderRadius: "10px",
                flex: 1,
              }}
            >
              <strong>Authenticity</strong>
              <h1>{data?.forgeryProbability}%</h1>
            </div>
            <div
              style={{
                background: "#ffe0e0",
                padding: "20px",
                borderRadius: "10px",
                flex: 1,
              }}
            >
              <strong>Forgery Type</strong>
              <h1>{ data?.forgeryType}</h1>
            </div>
          </div>
          {data?.forgeryType !== "Audio is real" && 
          <div
          style={{
            background: "#f0f0ff",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >

          <h3>This sample matched with:</h3>
          <h4>{data?.maxSimilarity}</h4>
        </div>
  }
          <div
            style={{
              background: "#f0f0ff",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
          
            <h2>What does this mean?</h2>
            <h4>{data?.result}</h4>
          </div>

          <div
            style={{
              background: "#f0f0ff",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h2>Report Cyber Crime</h2>
            <h4>
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              NCRP (National Cyber Crime Reporting Portal)
            </a>{" "}
            – Report financial fraud, identity theft, and cybercrimes online or call
            1930 for immediate help.
            <br />
            <br />
            <a
              href="https://sancharsaathi.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Sanchar Saathi (CEIR)
            </a>{" "}
            – Track and block lost or stolen mobile phones to prevent misuse.
            <br />
            <br />
            <a
              href="https://www.cert-in.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              CERT-In
            </a>{" "}
            – India’s cybersecurity agency handling cyber threats; report incidents at{" "}
            <a
              href="mailto:incident@cert-in.org.in"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              incident@cert-in.org.in
            </a>
            .
          </h4>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2>Upload Audio File</h2>
      <div style={{ padding: "20px", flex: "1", maxWidth: "40%", position: "relative", top: "10rem", left: "12rem" }}>
        <div
          style={{
            width: "100%",
            height: "200px",
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            position: "relative",
            flexDirection: "column",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div>
            <svg width="62" height="52" viewBox="0 0 62 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M42.015 36.6601L31.3483 25.9934L20.6816 36.6601"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M31.3486 25.9934V49.9934"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M53.7219 43.0334C56.3228 41.6155 58.3774 39.3718 59.5615 36.6564C60.7456 33.9411 60.9918 30.9087 60.2611 28.038C59.5304 25.1672 57.8645 22.6215 55.5263 20.8026C53.1881 18.9838 50.3108 17.9954 47.3485 17.9934H43.9885C43.1814 14.8714 41.677 11.973 39.5884 9.5161C37.4998 7.05918 34.8814 5.10771 31.9301 3.8084C28.9788 2.50909 25.7713 1.89574 22.5488 2.01447C19.3263 2.1332 16.1727 2.98091 13.325 4.49389C10.4773 6.00686 8.00962 8.14572 6.10752 10.7497C4.20541 13.3536 2.91837 16.3549 2.34314 19.5278C1.76791 22.7008 1.91947 25.9629 2.78643 29.0688C3.65338 32.1748 5.21317 35.0438 7.34853 37.4601"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {file ? <p>{file.name}</p> : <p>Select a file or drag and drop here (WAV, MP3, OGG, FLAC)</p>}
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              opacity: 0,
              cursor: "pointer",
            }}
            accept=".wav,.mp3,.ogg,.flac"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file}
          style={{position:"relative",
            left:"30%",
            top:"2rem",
          backgroundColor: "black",
          color: "white",
          fontSize: "16px",
          width: "200px",
          // padding: "10px 15px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          padding:"15px",
          // borderRadius: "16px",
    background: "rgba(0, 0, 0, 0.85)",
    
    /* Button */
    boxShadow: "0px 10px 22px 0px rgba(0, 0, 0, 0.40), 0px 2.289px 5.035px 0px rgba(0, 0, 0, 0.05), 0px 0.602px 1.325px 0px rgba(0, 0, 0, 0.01)"
          }}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default AudioUpload

