"use client"; // Mark this as a client component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupbaseClient } from "utils/supabase/client"; // createSupbaseClient 가져오기

export default function ContainerDetailPage() {
  const router = useRouter();
  const [newId, setNewId] = useState<string | null>(null); // newId 상태 추가
  const [containerData, setContainerData] = useState<any>(null); // containerData 상태

  useEffect(() => {
    // URL에서 newId 파라미터 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const newIdParam = searchParams.get("selected_Id");
    console.log(`LOG-- newId ${newIdParam}`);
    if (newIdParam) {
      setNewId(newIdParam); // URL 파라미터로부터 newId를 추출하여 상태에 저장
    }

    // newId가 설정되면 Supabase에서 데이터 가져오기
    if (newId) {
      const fetchData = async () => {
        const supabase = createSupbaseClient();
        try {
          const { data, error } = await supabase
            .from("main") // 컨테이너 테이블에서 데이터 조회
            .select("*")
            .eq("id", newId)
            .single(); // newId에 해당하는 한 개의 row만 가져옴

          if (error) {
            console.error(error.message);
          } else {
            setContainerData(data); // 컨테이너 데이터 설정
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData(); // 데이터 가져오기 호출
    }
  }, [newId]); // newId가 변경될 때마다 실행

  // Back 버튼 클릭 시 newId를 포함하여 /main 페이지로 이동
  const handleBackClick = () => {
    router.push(`/main`);
  };

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
          Back
        </button>

        {containerData ? (
          <div>
            <p>
              <strong style={{ color: "#e94560" }}>Container Number:</strong>{" "}
              {containerData.containerNumber}
            </p>
            <p>
              <strong style={{ color: "#e94560" }}>Date:</strong>{" "}
              {containerData.date}
            </p>
            <p>
              <strong style={{ color: "#e94560" }}>Time:</strong>{" "}
              {containerData.time}
            </p>
            <p>
              <strong style={{ color: "#e94560" }}>In/Out:</strong>{" "}
              {containerData.inOut}
            </p>
            <p>
              <strong style={{ color: "#e94560" }}>Container Size:</strong>{" "}
              {containerData.size}
            </p>
            <p>
              <strong style={{ color: "#e94560" }}>Driver Name:</strong>{" "}
              {containerData.driver}
            </p>

            {/* 이미지 크기를 더 크게 표시 */}
            <img
              src={`https://your-storage-bucket-url/${newId.padStart(
                3,
                "0"
              )}.jpg`} // newId에 따라 이미지 URL 생성
              alt="Container"
              className="w-96 h-96 object-cover mt-4" // 이미지 크기를 더 크게
              style={{
                border: "1px solid #444",
                borderRadius: "10px",
                backgroundColor: "#252539",
                padding: "8px",
              }}
            />
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}
