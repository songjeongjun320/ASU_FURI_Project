"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter import

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
    fetchVideos();
  }, []);

  const handleDragStart = (e, video) => {
    e.dataTransfer.setData("video", JSON.stringify(video));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const video = JSON.parse(e.dataTransfer.getData("video"));
    setSelectedVideo(video);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCancelClick = () => {
    setSelectedVideo(null);
    setDriverName("");
  };
  // Back 버튼 핸들러
  const handleMain = () => {
    router.push("/main"); // 루트 페이지로 이동
  };

  const processYOLO = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL!}/process_yolo`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process the video");
      }

      const result = await response.text();
      return result;
    } catch (error) {
      console.error("Error processing YOLO:", error);
      throw error;
    }
  };

  const handleExtractClick = async () => {
    try {
      setIsLoading(true);
      if (selectedVideo && selectedVideo.name) {
        console.log("Selected video name: ", selectedVideo.name);
        console.log("Driver name: ", driverName);

        const formData = new FormData();
        formData.append("video_name", selectedVideo.name);
        formData.append("driver_name", driverName);
        try {
          const result = await processYOLO(formData); // processYOLO 함수 호출
          const jsonResult = JSON.parse(result); // Parse the string result to JSON
          console.log("Extracted Result:", jsonResult.extracted_result); // Container number 출력
          console.log("New ID:", jsonResult.new_id); // New ID 출력

          // new_id를 변수로 저장하거나 다른 로직에서 사용
          const newId = jsonResult.new_id;
          router.push(`/main?newId=${encodeURIComponent(newId)}`);

          console.log("Using newId for further processing:", newId);
        } catch (error) {
          console.error("Error while processing YOLO:", error.message);
        }
      } else {
        console.log("No video selected.");
      }
    } catch (error) {
      console.error("Error during handleExtractClick: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#1a1a2e",
        minHeight: "100vh",
        color: "#ffffff",
        lineHeight: "1.6",
      }}
    >
      {/* Back 버튼 추가 */}
      <button
        onClick={handleMain}
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          backgroundColor: "#e94560",
          color: "#ffffff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Main
      </button>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "32px",
          fontWeight: "700",
          color: "#e94560",
        }}
      >
        Yard Management System Prototype
      </h1>
      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1.5,
            padding: "20px",
            border: "1px solid #333",
            borderRadius: "12px",
            backgroundColor: "#161625",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            maxHeight: "520px",
            overflowY: "auto",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "600",
              color: "#e94560",
            }}
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
                gap: "20px",
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
                      padding: "15px",
                      border: "1px solid #444",
                      borderRadius: "10px",
                      backgroundColor: "#252539",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      cursor: "grab",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <h4
                      style={{
                        marginBottom: "10px",
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#fff",
                      }}
                    >
                      {video.name}
                    </h4>
                    <video controls width="100%">
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

        <div
          style={{
            flex: 1.5,
            padding: "20px",
            border: "1px solid #333",
            borderRadius: "12px",
            backgroundColor: "#161625",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2
            style={{
              marginBottom: "30px",
              fontSize: "20px",
              fontWeight: "600",
              color: "#e94560",
            }}
          >
            Selected Video
          </h2>
          {selectedVideo ? (
            <div
              style={{
                padding: "20px",
                border: "1px solid #444",
                borderRadius: "10px",
                backgroundColor: "#252539",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ color: "#fff" }}>{selectedVideo.name}</h4>
            </div>
          ) : (
            <p
              style={{
                color: "#bbb",
                fontStyle: "italic",
                marginBottom: "20px",
              }}
            >
              Drag and drop a video here
            </p>
          )}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Driver Name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#252539",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  border: "5px solid #555",
                  borderTop: "5px solid #e94560",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            ) : (
              <>
                <button
                  onClick={handleExtractClick}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#e94560",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c0394a")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e94560")
                  }
                >
                  Extract Container Information
                </button>
              </>
            )}
            <button
              onClick={handleCancelClick}
              style={{
                padding: "12px 20px",
                backgroundColor: "#f15a24",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#d14927")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f15a24")
              }
            >
              Cancel
            </button>
          </div>
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #333",
              borderRadius: "12px",
              backgroundColor: "#161625",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              color: "#ddd",
              lineHeight: "1.6",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                fontWeight: "700",
                color: "#e94560",
              }}
            >
              About This Project
            </h2>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              This prototype is part of the <b>Yard Management System</b>{" "}
              automation project in the transportation industry. Users can
              select a video and drop it into the designated box. The selected
              video will be processed using machine learning to extract{" "}
              <b>container number</b> information. The extracted data will be
              processed using <b>AWS Textract</b>, and the system will update
              the container details along with the <b>timestamp</b>{" "}
              automatically.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #333",
          borderRadius: "12px",
          backgroundColor: "#161625",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          color: "#ddd",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "10px",
            fontWeight: "700",
            color: "#e94560",
          }}
        >
          How can you test?
        </h2>
        <p>
          <b>1.</b> Choose a sample video showing a truck's movement with a
          container.
          <br />
          <b>2.</b> Drag it to <b>Selected Video</b> and click{" "}
          <b>Extract Container Information</b>.<br />
          <b>3.</b> The <b>YOLO</b> model will process and crop the container
          image.
          <br />
          <b>4.</b> Extracted data will be sent to <b>AWS Textract</b> for OCR.
        </p>
      </div>
    </div>
  );
}
