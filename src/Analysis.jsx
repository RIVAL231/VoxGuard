import React, { useState } from "react";
import AudioUpload from "./UploadAnalyse";
import AudioRecorder from "./AudioRecorder";
import SideBar from "./sideBar";

const Analysis = () => {
    const [selectedMethod, setSelectedMethod] = useState("upload");

    const containerStyle = {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
    };

    const sideBarContainerStyle = {
        width: "250px",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    };

    const contentStyle = {
        flex: 1,
        padding: "20px",
    };

    const sliderContainerStyle = {
        display: "flex",
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "25px",
        overflow: "hidden",
        width: "300px",
        margin: "20px auto"
    };

    const sliderButtonStyle = (active) => ({
        flex: 1,
        padding: "10px 0",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: active ? "#000" : "#e5e7eb",
        color: active ? "#fff" : "#000",
        transition: "background-color 0.3s"
    });

    return (
        <div style={containerStyle}>
            <div style={sideBarContainerStyle}>
                <SideBar />
            </div>
            <div style={contentStyle}>
                <div style={sliderContainerStyle}>
                    <div
                        style={sliderButtonStyle(selectedMethod === "upload")}
                        onClick={() => setSelectedMethod("upload")}
                    >
                        Upload Audio
                    </div>
                    <div
                        style={sliderButtonStyle(selectedMethod === "live")}
                        onClick={() => setSelectedMethod("live")}
                    >
                        Live Recorder
                    </div>
                </div>
                {selectedMethod === "upload" && <AudioUpload />}
                {selectedMethod === "live" && <AudioRecorder />}
            </div>
        </div>
    );
};

export default Analysis;