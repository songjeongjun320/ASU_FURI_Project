"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // next/navigation에서 useRouter를 가져옵니다.

export default function ResultVideoPage() {
  const searchParams = useSearchParams();
  const [newId, setNewId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  // newId 가져오기
  useEffect(() => {
    const newId = searchParams.get("newId");

    if (newId) {
      setNewId(newId);
    } else {
      setError("No newId provided in URL parameters.");
    }
  }, [searchParams]);

  // videoURL 직접 생성
  useEffect(() => {
    if (newId) {
      // newId에 맞는 형식으로 비디오 파일 URL 생성 (예: 003.mp4)
      const formattedId = newId.padStart(3, "0"); // 3자리로 패딩
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_RESULT_VIDEO_BUCKET}/${formattedId}.mp4`;
      setVideoURL(url);
    }
  }, [newId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {videoURL ? (
        <div>
          {/* 비디오 다운로드 링크 추가 */}
          <div>
            <a href={videoURL} download={`${newId}.mp4`}>
              <button
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#e94560", // 기존 페이지의 색상과 일치
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  width: "100%", // 버튼이 화면 너비에 맞게 확장
                }}
                onMouseOver={
                  (e) => (e.currentTarget.style.backgroundColor = "#c0394a") // 마우스 오버시 색상 변경
                }
                onMouseOut={
                  (e) => (e.currentTarget.style.backgroundColor = "#e94560") // 마우스 오버 해제시 색상 원상복귀
                }
              >
                Download Video
              </button>
            </a>
          </div>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}
