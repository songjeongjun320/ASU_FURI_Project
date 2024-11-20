"use client"; // Mark this as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";

const generateRandomAlphabets = (length: number) => {
  return Array(length)
    .fill(0)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    .join("");
};

const generateRandomNumbers = (length: number) => {
  return Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10)) // 랜덤 숫자 0~9
    .join("");
};

const generateData = () => {
  const data = Array.from({ length: 100 }, (_, i) => ({
    containerNumber: `${generateRandomAlphabets(4)}${generateRandomNumbers(7)}`, // 4자리 알파벳 + 7자리 숫자
    date: `2023-09-${((i % 30) + 1).toString().padStart(2, "0")}`, // Format: YYYY-MM-DD
    time: `${12 + (i % 12)}:00`,
    inOut: i % 2 === 0 ? "In" : "Out",
    size: i % 3 === 0 ? "Large" : i % 2 === 0 ? "Medium" : "Small",
    driver: `Driver ${i + 1}`,
    picture: "image_placeholder.jpg",
  }));
  return data;
};

export default function MainPage() {
  const router = useRouter();
  const containerData = generateData();

  // Sort the data by date in descending order
  const sortedContainerData = containerData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // Show 40 items per page

  // Filter containers by search term
  const filteredData = sortedContainerData.filter((container) =>
    container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowClick = (containerNumber: string) => {
    router.push(`/cntr_detail/${containerNumber}`);
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
          Container Information
        </h1>

        {/* Search input */}
        <input
          type="text"
          id="searchInput"
          placeholder="Search for container number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-lg mx-auto px-4 py-2 mb-4 border rounded-md text-sm focus:outline-none"
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
              <th className="border px-2 py-1">Container Number</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Time</th>
              <th className="border px-2 py-1">In/Out</th>
              <th className="border px-2 py-1">Container Size</th>
              <th className="border px-2 py-1">Driver Name</th>
              <th className="border px-2 py-1">Picture</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((container, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100"
                style={{ cursor: "pointer", backgroundColor: "#252539" }}
              >
                <td
                  className="border px-2 py-1"
                  style={{ color: "#ffffff" }}
                  onClick={() => handleRowClick(container.containerNumber)}
                >
                  {container.containerNumber}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.date}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.time}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.inOut}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.size}
                </td>
                <td className="border px-2 py-1" style={{ color: "#ffffff" }}>
                  {container.driver}
                </td>
                <td className="border px-2 py-1">
                  <img
                    src={container.picture}
                    alt="Container"
                    className="w-12 h-12 object-cover"
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
