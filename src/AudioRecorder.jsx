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
        timestamp: responseData.timestamp
      });
    } catch (error) {
      console.error("Upload failed", error);
      setError(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  if(data)
  {
    return(
      <div style={{ padding: "20px",width:"90%"}}>
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
          <h3>Report this Crime at</h3>
          <h4></h4>
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
              {isRecording ? '⬛' : '🎤'}
            </div>
            
            {isRecording && (
              <div style={{
                position: 'absolute',
                top: '-64px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '4px'
              }}>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '4px',
                      backgroundColor: '#d1d5db',
                      height: `${Math.random() * 40 + 10}px`,
                      animation: 'pulse 1s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '16px' 
        }}>
          <button
            onClick={stopRecording}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: '#e5e7eb',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={startRecording}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: isRecording ? '#ef4444' : '#000',
              color: 'white',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
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