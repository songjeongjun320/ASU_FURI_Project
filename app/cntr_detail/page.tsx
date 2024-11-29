"use client"; // Mark this as a client component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContainerDetailPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgURL, setImgUrl] = useState<string>("");
  const [containerData, setContainerData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const selectedId = searchParams.get("selected_Id");

    console.log(
      `LOG-- URL에서 selectedId 파라미터를 가져왔습니다: ${selectedId}`
    );
    if (selectedId) {
      console.log(`LOG-- selectedId가 설정되었습니다: ${selectedId}`);
      setSelectedId(selectedId);
      setLoading(true);
      const imgUrl = `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/${
        process.env.NEXT_PUBLIC_STORAGE_CNTR_IMG_BUCKET
      }/${selectedId.padStart(3, "0")}.jpg`;

      console.log(`LOG-- 이미지 URL을 생성했습니다: ${imgUrl}`);
      setImgUrl(imgUrl);

      const fetchContainerData = async () => {
        try {
          const response = await fetch(`/api/get-row?selectedId=${selectedId}`);
          const data = await response.json();

          if (response.ok) {
            setContainerData(data);
            setError(null);
          } else {
            throw new Error(data.error || "Error fetching data");
          }
        } catch (error) {
          console.error("LOG-- Fetch error:", error);
          setError(error.message || "Unexpected error");
        } finally {
          setLoading(false);
        }
      };

      fetchContainerData();
    }
  }, [selectedId]);

  const handleBackClick = () => {
    console.log("LOG-- Main 버튼 클릭됨");
    router.push(`/main`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-2">
      <div className="container max-w-full p-4 shadow-md rounded-lg">
        <h1 className="font-bold text-center mb-3 text-e94560 text-4xl">
          Container Details
        </h1>

        <button onClick={handleBackClick} className="button-back">
          Main
        </button>

        {loading ? (
          <p className="text-center">Loading container details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : containerData ? (
          <div className="flex flex-row gap-6">
            {/* Container Image */}
            <div className="card flex-1">
              <p className="text-e94560 text-2xl">Container Image</p>
              {imgURL ? (
                <img src={imgURL} alt="Container" className="container-img" />
              ) : (
                <p>Loading image...</p>
              )}
            </div>

            {/* Container Data */}
            <div className="card flex-1">
              <p className="text-e94560 text-2xl">Container Details</p>
              <div className="container-data">
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
          </div>
        ) : (
          <p className="text-center">No data found for this container.</p>
        )}
      </div>
    </div>
  );
}
