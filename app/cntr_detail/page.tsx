"use client"; // Mark this as a client component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ContainerDetailPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null); // selectedId 상태 추가
  const [imgURL, setImgUrl] = useState<string>(""); // imgURL 상태 (초기값을 빈 문자열로 설정)
  const [containerData, setContainerData] = useState<any | null>(null); // 컨테이너 데이터 상태 추가
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    // URL에서 selectedId 파라미터 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const selectedId = searchParams.get("selected_Id");

    console.log(
      `LOG-- URL에서 selectedId 파라미터를 가져왔습니다: ${selectedId}`
    );
    if (selectedId) {
      console.log(`LOG-- selectedId가 설정되었습니다: ${selectedId}`);
      setSelectedId(selectedId); // URL 파라미터로부터 selectedId를 추출하여 상태에 저장
      setLoading(true); // 데이터 로딩 시작
      const imgUrl = `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/${
        process.env.NEXT_PUBLIC_STORAGE_CNTR_IMG_BUCKET
      }/${selectedId.padStart(3, "0")}.jpg`;

      console.log(`LOG-- 이미지 URL을 생성했습니다: ${imgUrl}`);
      setImgUrl(imgUrl); // imgURL 상태에 URL 저장

      const fetchContainerData = async () => {
        try {
          const response = await fetch(`/api/get-row?selectedId=${selectedId}`);
          const data = await response.json();

          if (response.ok) {
            setContainerData(data); // 가져온 데이터를 상태에 저장
            setError(null); // 에러 초기화
          } else {
            throw new Error(data.error || "Error fetching data");
          }
        } catch (error) {
          console.error("LOG-- Fetch error:", error);
          setError(error.message || "Unexpected error");
        } finally {
          setLoading(false); // 로딩 끝
        }
      };

      fetchContainerData();
    }
  }, [selectedId]); // selectedId가 변경될 때마다 데이터 가져오기

  // main 버튼 클릭 시 동작
  const handleBackClick = () => {
    console.log("LOG-- Main 버튼 클릭됨");
    router.push(`/main`);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center p-2"
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
          style={{ color: "#e94560", fontSize: "40px" }}
        >
          Container Details
        </h1>

        {/* Back 버튼 우측 상단에 배치 */}
        <button
          onClick={handleBackClick}
          className="absolute top-4 right-4 px-4 py-2 rounded mb-4"
          style={{
            backgroundColor: "#e94560",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#c0394a";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#e94560";
          }}
        >
          Main
        </button>

        {/* 로딩 상태 처리 */}
        {loading ? (
          <p>Loading container details...</p>
        ) : error ? (
          <p>{error}</p>
        ) : containerData ? (
          <div className="flex items-center">
            {/* 이미지 왼쪽에 배치 */}
            <div className="mr-6">
              <p style={{ color: "#e94560", fontSize: "30px" }}>
                Container Image
              </p>
              {imgURL ? (
                <img
                  src={imgURL}
                  alt="Container"
                  style={{
                    maxWidth: "800px", // 이미지의 가로 최대 크기
                    maxHeight: "800px", // 이미지의 세로 최대 크기
                    width: "100%", // 가로 크기는 100%로 자동 조정
                    height: "auto", // 세로 크기는 비율에 맞게 자동 조정
                    objectFit: "contain", // 이미지 비율 유지, 잘리지 않도록 함
                    borderRadius: "8px",
                    border: "2px solid #444",
                  }}
                />
              ) : (
                <p>Loading image...</p> // 이미지 로딩 중에는 대체 텍스트 표시
              )}
            </div>

            {/* 컨테이너 데이터 우측에 배치 */}
            <div style={{ fontSize: "30px", paddingTop: "30px" }}>
              <p>
                <strong>Container Number:</strong> {containerData.cntr_number}
              </p>
              <p>
                <strong>Date:</strong> {containerData.date}
              </p>
              <p>
                <strong>Time:</strong> {containerData.time}
              </p>
              <p>
                <strong>In/Out:</strong> {containerData.in_out ? "In" : "Out"}
              </p>
              <p>
                <strong>Size:</strong> {containerData.cntr_size}
              </p>
              <p>
                <strong>Driver Name:</strong> {containerData.driver_name}
              </p>
            </div>
          </div>
        ) : (
          <p>No data found for this container.</p>
        )}
      </div>
    </div>
  );
}
