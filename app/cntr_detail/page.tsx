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

  useEffect(() => {
    const containerNumber = params.containerNumber;

    if (containerNumber) {
      const data = generateData();
      const selectedContainer = data.find(
        (container) => container.containerNumber === containerNumber
      );
      setContainerData(selectedContainer);
    }
  }, [params.containerNumber]);

  if (!containerData) {
    return <div>Loading...</div>;
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
          Container Details
        </h1>
        <div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded mb-4"
            style={{
              backgroundColor: "#e94560",
              color: "#ffffff",
              border: "none",
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
            Back
          </button>
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
            <img
              src={containerData.picture}
              alt="Container"
              className="w-48 h-48 object-cover mt-4"
              style={{
                border: "1px solid #444",
                borderRadius: "10px",
                backgroundColor: "#252539",
                padding: "8px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
