"use client";

import { useState, useEffect } from "react";

export default function ResultVideoPage() {
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("LOG-- Extracting newId from URL parameters...");
    const params = new URLSearchParams(window.location.search);
    const newId = params.get("newId");

    console.log("LOG-- Extracted newId:", newId);

    if (newId) {
      try {
        console.log("LOG-- Formatting newId to 3 digits...");
        const formattedId = newId.padStart(3, "0");
        console.log("LOG-- Formatted newId:", formattedId);

        console.log("LOG-- Constructing video URL...");
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/result_videos/${formattedId}.mp4`;
        console.log("LOG-- Constructed video URL:", url);

        setVideoURL(url);
      } catch (err) {
        console.error("LOG-- Error constructing video URL:", err);
        setError("Failed to construct video URL.");
      }
    } else {
      console.error("LOG-- No newId provided in URL parameters.");
      setError("No newId provided in URL parameters.");
    }
  }, []);

  if (error) {
    console.error("LOG-- Error detected:", error);
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-2"
      style={{ backgroundColor: "#1a1a2e", color: "#ffffff" }}
    >
      <div
        className="container max-w-full p-4 shadow-md rounded-lg"
        style={{
          backgroundColor: "#161625",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          className="text-xl font-bold text-center mb-3"
          style={{ color: "#e94560" }}
        >
          Result Video
        </h1>
        {videoURL ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "15px",
              border: "1px solid #444",
              borderRadius: "10px",
              backgroundColor: "#252539",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h4
              style={{
                marginBottom: "10px",
                textAlign: "center",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              Video Name: {videoURL.split("/").pop()}
            </h4>
            <video
              controls
              width="100%"
              onError={() =>
                console.error(
                  `LOG-- Failed to load video from URL: ${videoURL}`
                )
              }
              style={{
                borderRadius: "8px",
                backgroundColor: "#000",
              }}
            >
              <source src={videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p>No video found</p>
        )}
      </div>
    </div>
  );
}
