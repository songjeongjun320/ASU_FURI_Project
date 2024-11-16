"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]); // 비디오 목록 상태
  const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 비디오
  const [loading, setLoading] = useState(true); // 로딩 상태

  // API를 호출해 비디오 목록 가져오기
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/get-sample-videos`);
      if (!res.ok) throw new Error(`Failed to fetch videos: ${res.statusText}`);
      const data = await res.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // 컴포넌트 마운트 시 API 호출
  }, []);

  // 드래그 시작 이벤트
  const handleDragStart = (e, video) => {
    e.dataTransfer.setData("video", JSON.stringify(video)); // 드래그 데이터에 비디오 정보를 저장
  };

  // 드롭 이벤트
  const handleDrop = (e) => {
    e.preventDefault();
    const video = JSON.parse(e.dataTransfer.getData("video")); // 드래그된 비디오 데이터 가져오기
    setSelectedVideo(video); // 선택된 비디오를 업데이트
  };

  // 드래그 오버 이벤트
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Cancel 버튼 클릭 이벤트
  const handleCancelClick = () => {
    setSelectedVideo(null); // 선택된 비디오 초기화
  };

  // Extract 버튼 클릭 이벤트
  const handleExtractClick = () => {
    console.log("Extract Container Information button clicked.");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "maroon",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        Yard Management System Prototype
      </h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* 왼쪽: 비디오 목록 */}
        <div
          style={{
            flex: 1.5,
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#333",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <h2
            style={{ marginBottom: "20px", fontSize: "18px", color: "maroon" }}
          >
            Available Videos
          </h2>
          {loading ? (
            <p style={{ fontStyle: "italic", color: "#999" }}>
              Loading videos...
            </p>
          ) : videos.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {videos.map((video) => {
                const videoURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sample_videos/${video.name}`;
                return (
                  <div
                    key={video.name}
                    draggable
                    onDragStart={(e) => handleDragStart(e, video)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      cursor: "grab",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <h4
                      style={{
                        marginBottom: "10px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      {video.name}
                    </h4>
                    <video controls width="250">
                      <source src={videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: "#bbb" }}>No videos found.</p>
          )}
        </div>

        {/* 오른쪽: 선택된 비디오 박스 */}
        <div
          style={{
            flex: 1.5,
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#333",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2
            style={{ marginBottom: "20px", fontSize: "18px", color: "maroon" }}
          >
            Selected Video
          </h2>
          {selectedVideo ? (
            <div
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ color: "#333" }}>{selectedVideo.name}</h4>
            </div>
          ) : (
            <p style={{ color: "#bbb", fontStyle: "italic" }}>
              Drag and drop a video here
            </p>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleExtractClick}
              style={{
                padding: "12px 24px",
                backgroundColor: "maroon",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#6a1b1b")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "maroon")
              }
            >
              Extract Container Information
            </button>
            <button
              onClick={handleCancelClick}
              style={{
                padding: "12px 24px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#a71d2a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc3545")
              }
            >
              Cancel
            </button>
          </div>

          {/* 설명 섹션 */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              lineHeight: "1.6",
              color: "#555",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              About This Project
            </h3>
            <p style={{ fontSize: "16px" }}>
              This prototype is part of the Yard Management System automation
              project in the transportation industry. Users can select a video
              and drop it into the designated box. The selected video will be
              processed using machine learning to extract container number
              information. The extracted data will be processed using AWS
              Textract, and the system will update the container details along
              with the timestamp automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
