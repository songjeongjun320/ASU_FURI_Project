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
        <video controls width="100%">
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}
