"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  const [containerData, setContainerData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // Show 40 items per page

  useEffect(() => {
    // API에서 데이터 가져오기 및 이미지 URL 연결
    const fetchData = async () => {
      try {
        console.log("LOG-- Fetching data from API...");
        const response = await fetch("/api/get-table");

        if (!response.ok) {
          throw new Error(`LOG-- Error fetching data: ${response.statusText}`);
        }

        let data = await response.json();
        console.log("LOG-- Data fetched successfully:", data);

        // 날짜와 시간 기준으로 정렬
        data.sort((a: any, b: any) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB.getTime() - dateA.getTime(); // 최신순 정렬
        });

        // 이미지 URL 가져오기
        const updatedData = await Promise.all(
          data.map(async (item: any) => {
            try {
              const imgResponse = await fetch(
                `/api/get-cntr-imgs?id=${item.id}`
              );
              const imgData = await imgResponse.json();

              if (!imgResponse.ok) {
                console.error(
                  `LOG-- Error fetching image for ID ${item.id}:`,
                  imgData.error
                );
                return { ...item, image: "https://via.placeholder.com/150" }; // 기본 이미지
              }

              console.log(
                `LOG-- Image fetched for ID ${item.id}:`,
                imgData.url
              );
              return { ...item, image: imgData.url }; // 이미지 URL 추가
            } catch (error) {
              console.error(
                `LOG-- Error fetching image for ID ${item.id}:`,
                error
              );
              return { ...item, image: "https://via.placeholder.com/150" }; // 기본 이미지
            }
          })
        );

        console.log("LOG-- Data with images:", updatedData);
        setContainerData(updatedData || []);
      } catch (error) {
        console.error("LOG-- Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  // Filter containers by search term
  const filteredData = containerData.filter((container) =>
    container.cntr_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      console.log("LOG-- Navigating to next page:", currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      console.log("LOG-- Navigating to previous page:", currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (containerNumber: string) => {
    console.log("LOG-- Row clicked, container number:", containerNumber);
    router.push(`/cntr_detail/${containerNumber}`);
  };

  return (
    <div
      className="flex flex-col items-start p-2"
      style={{
        backgroundColor: "#1a1a2e",
        color: "#ffffff",
        minHeight: "100vh",
        paddingTop: "20px", // 위쪽 여백 추가
        paddingLeft: "20px", // 왼쪽 여백 추가
      }}
    >
      <div
        className="container max-w-full p-4 shadow-md rounded-lg"
        style={{
          backgroundColor: "#161625",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "calc(100% - 40px)", // 전체 화면에서 패딩만큼 축소
        }}
      >
        <h1
          className="text-xl font-bold mb-5"
          style={{ color: "#e94560", textAlign: "center", fontSize: 30 }} // 제목을 왼쪽 정렬
        >
          Container Information
        </h1>

        {/* Search input */}
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

        {/* Container table */}
        <table
          className="min-w-full text-sm border-collapse"
          style={{ backgroundColor: "#161625", border: "1px solid #444" }}
        >
          <thead style={{ backgroundColor: "#252539", color: "#e94560" }}>
            <tr>
              <th className="border px-2 py-1 text-left">Container Number</th>
              <th className="border px-2 py-1 text-left">Date</th>
              <th className="border px-2 py-1 text-left">Time</th>
              <th className="border px-2 py-1 text-left">In/Out</th>
              <th className="border px-2 py-1 text-left">Container Size</th>
              <th className="border px-2 py-1 text-left">Driver Name</th>
              <th className="border px-2 py-1 text-left">Container Image</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((container) => (
              <tr
                key={container.id}
                className="hover:bg-gray-100"
                style={{ cursor: "pointer", backgroundColor: "#252539" }}
              >
                <td
                  className="border px-2 py-1"
                  style={{ color: "#ffffff" }}
                  onClick={() => handleRowClick(container.cntr_number)}
                >
                  {container.cntr_number}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.date}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.time}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.in_out ? "In" : "Out"}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.cntr_size}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.driver_name}
                </td>
                <td className="border px-2 py-1">
                  <img
                    src={container.image || "https://via.placeholder.com/150"}
                    alt="Container"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-1 text-sm ${
              currentPage === 1
                ? "opacity-50"
                : "hover:bg-[#c0394a] hover:text-white"
            }`}
            style={{
              backgroundColor: "#e94560",
              color: "#ffffff",
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
            }}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 text-sm ${
              currentPage === totalPages
                ? "opacity-50"
                : "hover:bg-[#c0394a] hover:text-white"
            }`}
            style={{
              backgroundColor: "#e94560",
              color: "#ffffff",
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
