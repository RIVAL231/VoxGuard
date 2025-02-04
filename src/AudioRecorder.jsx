import React, { useState } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let audioChunks = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        await handleUpload(file);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Microphone access denied or not available');
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setData({
        forgeryType: responseData.forgeryType,
        forgeryProbability: responseData.forgeryProbability,
        result: responseData.result,
        timestamp: responseData.timestamp,
        maxSimilarity: responseData.impersonatedPerson,
      });
    } catch (error) {
      console.error("Upload failed", error);
      setError(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const styles = {
    backButton: {
      position: "absolute",
      top: "50px",
      left: "300px",
      backgroundColor: "black",
      color: "white",
      // padding: "10px 15px",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      padding:"15px",
      // borderRadius: "16px",
background: "rgba(0, 0, 0, 0.85)",

/* Button */
boxShadow: "0px 10px 22px 0px rgba(0, 0, 0, 0.40), 0px 2.289px 5.035px 0px rgba(0, 0, 0, 0.05), 0px 0.602px 1.325px 0px rgba(0, 0, 0, 0.01)"
      

    },
  }
  function clearData(){
    setData(null);
  }
  if(data)
  {
    return (
      <div style={{ padding: "20px", width: "90%" }}>
        <button style={styles.backButton} onClick={clearData}>
          ← Analyse Again
        </button>
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
            <h1>
              {data?.forgeryType === "Real"
                ? "The audio is real"
                : data?.forgeryType}
            </h1>
          </div>
        </div>
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
        <div
          style={{
            background: "#f0f0ff",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>What does this mean?</h3>
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
          <h3>Report Cyber Crime</h3>
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
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '32px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600',
            marginBottom: '8px' 
          }}>Record Audio File</h2>
          <p style={{ 
            color: '#666', 
            fontSize: '14px' 
          }}>
            {isRecording ? 'Capturing your voice...' : 'Create a recording for comparison with the uploaded audio track.'}
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '24px' 
        }}>
          <div 
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              border: `4px solid ${isRecording ? '#ef4444' : '#e5e7eb'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{ 
              fontSize: '48px', 
              color: isRecording ? '#ef4444' : '#9ca3af'
            }}>
              {!isRecording && <svg style={{position:"relative",top:"10px"}} width="46" height="65" viewBox="0 0 46 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.86719 12.0666C9.86719 5.43923 15.2398 0.0666504 21.8672 0.0666504H23.4672C30.0946 0.0666504 35.4672 5.43923 35.4672 12.0666V34.4001C35.4672 38.2836 32.8747 41.9907 28.763 42.7426C24.5682 43.5097 20.9774 43.4946 16.6587 42.7177C12.5268 41.9743 9.86719 38.2673 9.86719 34.3289V12.0666ZM21.8672 4.86665C17.8907 4.86665 14.6672 8.0902 14.6672 12.0666V34.3289C14.6672 36.2089 15.9141 37.7066 17.5086 37.9935C21.2865 38.6732 24.2963 38.6798 27.8995 38.0209C29.4458 37.7381 30.6672 36.2684 30.6672 34.4001V12.0666C30.6672 8.0902 27.4436 4.86665 23.4672 4.86665H21.8672Z" fill="black" fill-opacity="0.4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M22.6676 48.8667C17.1201 48.8667 10.8548 47.723 6.51036 45.6248C5.69342 45.2303 5.06758 44.2443 5.06758 42.8813V36.2871C5.06758 34.9616 3.99306 33.8871 2.66758 33.8871C1.34209 33.8871 0.267578 34.9616 0.267578 36.2871V42.8813C0.267578 45.6084 1.55668 48.5629 4.42288 49.9471C9.59328 52.4442 16.6206 53.6667 22.6676 53.6667C28.7146 53.6667 35.7419 52.4442 40.9123 49.9471C43.7785 48.5629 45.0676 45.6084 45.0676 42.8813V36.2871C45.0676 34.9616 43.9931 33.8871 42.6676 33.8871C41.3421 33.8871 40.2676 34.9616 40.2676 36.2871V42.8813C40.2676 44.2443 39.6417 45.2303 38.8248 45.6248C34.4804 47.723 28.2151 48.8667 22.6676 48.8667Z" fill="black" fill-opacity="0.6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M22.6676 49.6667C23.9931 49.6667 25.0676 50.7413 25.0676 52.0667L25.0676 61.6667C25.0676 62.9922 23.9931 64.0667 22.6676 64.0667C21.3421 64.0667 20.2676 62.9922 20.2676 61.6667L20.2676 52.0667C20.2676 50.7413 21.3421 49.6667 22.6676 49.6667Z" fill="black" fill-opacity="0.4"/>
</svg>
}
            </div>
            
            {isRecording && (
  <>
    {/* Define the keyframes in a <style> tag */}
    <style>
      {`
        @keyframes pulse {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.5);
          }
        }
      `}
    </style>

    {/* Sound wave animation */}
    <div style={{
      position: 'absolute',
      top: '',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            width: '4px',
            backgroundColor: '#3b82f6',
            height: `${Math.random() * 40 + 10}px`,
            borderRadius: '2px',
            animation: 'pulse 1s ease-in-out infinite',
            animationDelay: `${i * 0.05}s`,
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  </>
)}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '16px' 
        }}>
          {isRecording && <button
            onClick={stopRecording}
            style={{position:"relative",
              left:"5px",
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
            {isRecording && 'Upload'}
          </button>}
          {!isRecording && <button
            onClick={startRecording}
            style={{position:"relative",
              left:"0px",
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
            disabled={loading}
          >
            {!isRecording && 'Start Recording'}
          </button>}
        </div>

        {loading && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '16px',
            color: '#666' 
          }}>
            Processing audio...
          </div>
        )}

        {error && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '16px',
            color: '#ef4444' 
          }}>
            {error}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default AudioRecorder;