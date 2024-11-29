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
    <div className="container">
      <h1 className="title">Yard Management System Prototype</h1>
      {/* Back 버튼 추가 */}
      <button onClick={handleMain} className="button-back">
        Main
      </button>
      <div className="video-container" style={{ justifyContent: "flex-start" }}>
        <div className="card">
          <h2 className="card-header">Available Videos</h2>
          {loading ? (
            <p className="italic text-gray-500">Loading videos...</p>
          ) : videos.length > 0 ? (
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[400px]">
              {" "}
              {/* 여기에 max-height와 overflow 적용 */}
              {videos.map((video) => {
                const videoURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sample_videos/${video.name}`;
                return (
                  <div
                    key={video.name}
                    draggable
                    onDragStart={(e) => handleDragStart(e, video)}
                    className="video-item"
                  >
                    <h4 className="text-center text-white">{video.name}</h4>
                    <video controls width="100%">
                      <source src={videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No videos found.</p>
          )}
        </div>

        <div className="card" onDrop={handleDrop} onDragOver={handleDragOver}>
          <h2 className="card-header">Selected Video</h2>
          {selectedVideo ? (
            <div className="video-item">
              <h4 className="text-white">{selectedVideo.name}</h4>
            </div>
          ) : (
            <p className="text-gray-400 italic">Drag and drop a video here</p>
          )}

          <div className="my-4">
            <input
              type="text"
              placeholder="Driver Name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex gap-4">
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <button onClick={handleExtractClick} className="button">
                Extract Container Information
              </button>
            )}
            <button onClick={handleCancelClick} className="button-cancel">
              Cancel
            </button>
          </div>

          {/* About This Project 부분을 여기로 이동 */}
          <div className="card mt-10">
            <h2 className="text-2xl font-bold text-red-500">
              About This Project
            </h2>
            <p className="text-lg">
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

      <div className="card mt-10">
        <h1 className="text-4xl font-bold text-red-500">How can you test?</h1>{" "}
        {/* 글자 크기 4xl로 수정 */}
        <p className="text-lg">
          {" "}
          {/* 기본 크기를 lg로 수정, 필요에 따라 조정 */}
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
