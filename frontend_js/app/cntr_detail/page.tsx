"use client"; // Mark this as a client component
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Assuming you have the same data structure as in the MainPage
const generateData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      containerNumber: `C${i.toString().padStart(3, "0")}`,
      date: `2023-09-${(i % 30).toString().padStart(2, "0")}`,
      time: `${12 + (i % 12)}:00`,
      inOut: i % 2 === 0 ? "In" : "Out",
      size: i % 3 === 0 ? "Large" : i % 2 === 0 ? "Medium" : "Small",
      driver: `Driver ${i}`,
      picture: "image_placeholder.jpg",
    });
  }
  return data;
};

export default function ContainerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [containerData, setContainerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const containerNumber = params.containerNumber;

    if (containerNumber) {
      const data = generateData();
      const selectedContainer = data.find(
        (container) => container.containerNumber === containerNumber
      );
      setContainerData(selectedContainer || null);
    }
    setIsLoading(false);
  }, [params.containerNumber]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!containerData) {
    return <div>Container not found</div>;
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-2">
      <div className="container max-w-full bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-center mb-3">
          Container Details
        </h1>
        <div className="container-details">
          <button
            onClick={() => router.back()}
            className="bg-[#FFD700] text-[#800000] px-4 py-2 rounded mb-4"
          >
            Back
          </button>
          <div className="container-info">
            <p>
              <strong>Container Number:</strong> {containerData.containerNumber}
            </p>
            <p>
              <strong>Date:</strong> {containerData.date}
            </p>
            <p>
              <strong>Time:</strong> {containerData.time}
            </p>
            <p>
              <strong>In/Out:</strong> {containerData.inOut}
            </p>
            <p>
              <strong>Container Size:</strong> {containerData.size}
            </p>
            <p>
              <strong>Driver Name:</strong> {containerData.driver}
            </p>
            <img
              src={containerData.picture}
              alt="Container"
              className="w-48 h-48 object-cover mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
