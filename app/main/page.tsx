"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createSupbaseClient } from "utils/supabase/client"; // createSupbaseClient 가져오기

const supabase = createSupbaseClient(); // 클라이언트 초기화

export default function MainPage() {
  const router = useRouter();
  const [containerData, setContainerData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newId, setNewId] = useState<string | null>(null); // newId 상태 추가
  const itemsPerPage = 40; // Show 40 items per page
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newIdParam = searchParams.get("newId");
    if (newIdParam) {
      setNewId(newIdParam); // URL 파라미터로부터 newId를 추출하여 상태에 저장
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-table");

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        let data = await response.json();
        data.sort((a: any, b: any) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB.getTime() - dateA.getTime(); // 최신순 정렬
        });

        const updatedData = await Promise.all(
          data.map(async (item: any) => {
            try {
              const imgResponse = await fetch(
                `/api/get-cntr-imgs?id=${item.id}`
              );
              const imgData = await imgResponse.json();

              return {
                ...item,
                image: imgData.url || "https://via.placeholder.com/150",
              };
            } catch (error) {
              return { ...item, image: "https://via.placeholder.com/150" }; // 기본 이미지
            }
          })
        );
        setContainerData(updatedData || []);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = containerData.filter((container) =>
    container.cntr_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (selected_id: string) => {
    router.push(`/cntr_detail?selected_Id=${encodeURIComponent(selected_id)}`);
  };

  const handleBack = () => {
    router.push("/");
  };

  const downloadSampleVideo = async () => {
    setLoading(true);
    try {
      const fileName = "067.mp4";
      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_RESULT_VIDEO_BUCKET)
        .download(`${fileName}`);

      if (error) {
        setError("Error downloading file: " + error.message);
        setLoading(false);
        return;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async () => {
    if (!newId) return;

    setLoading(true);
    try {
      const formattedId = newId.padStart(3, "0");
      const fileName = `${formattedId}.mp4`;

      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_RESULT_VIDEO_BUCKET)
        .download(`${fileName}`);

      if (error) {
        setError("Error downloading file: " + error.message);
        setLoading(false);
        return;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-start p-2"
      style={{
        backgroundColor: "#1a1a2e",
        color: "#ffffff",
        minHeight: "100vh",
        paddingTop: "20px",
        paddingLeft: "20px",
      }}
    >
      <button
        onClick={handleBack}
        className="button"
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
        }}
      >
        Back
      </button>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={downloadVideo}
          disabled={!newId}
          className={`button ${!newId ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{marginRight: "10px"}}
        >
          {newId ? "Download Result Video" : "You didn't extract video"}
        </button>
        <button onClick={downloadSampleVideo} className="button">
          Sample Result Video
        </button>
      </div>

      <div
        className="container max-w-full p-4 shadow-md rounded-lg"
        style={{
          backgroundColor: "#161625",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "calc(100% - 40px)",
        }}
      >
        <h1
          className="text-xl font-bold mb-5"
          style={{ color: "#e94560", textAlign: "center", fontSize: 30 }}
        >
          Container Information
        </h1>

        <input
          type="text"
          id="searchInput"
          placeholder="Search for container number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-lg px-4 py-2 mb-4 border rounded-md text-sm focus:outline-none"
          style={{
            backgroundColor: "#252539",
            color: "#ffffff",
            borderColor: "#444",
            outline: "none",
          }}
        />

        <table
          className="min-w-full text-sm border-collapse"
          style={{ backgroundColor: "#161625", border: "1px solid #444" }}
        >
          <thead style={{ backgroundColor: "#252539", color: "#e94560" }}>
            <tr>
              <th className="table-cell">Container Number</th>
              <th className="table-cell">Date</th>
              <th className="table-cell">Time</th>
              <th className="table-cell">In/Out</th>
              <th className="table-cell">Container Size</th>
              <th className="table-cell">Driver Name</th>
              <th className="table-cell">Container Image</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((container) => (
              <tr
                key={container.id}
                className="table-row"
                onClick={() => handleRowClick(container.id)}
              >
                <td className="table-cell">{container.cntr_number}</td>
                <td className="table-cell">{container.date}</td>
                <td className="table-cell">{container.time}</td>
                <td className="table-cell">
                  {container.in_out ? "In" : "Out"}
                </td>
                <td className="table-cell">{container.cntr_size}</td>
                <td className="table-cell">{container.driver_name}</td>
                <td className="table-cell">
                  <img
                    src={container.image || "https://via.placeholder.com/150"}
                    alt="Container"
                    className="table-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
