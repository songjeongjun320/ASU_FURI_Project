"use client"; // Mark this as a client component

import { use, useState } from "react";
import { useRouter } from "next/navigation"; // Update this import

// Mock data generation (100 items)
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

export default function MainPage() {
  const router = useRouter(); // Add this line
  const containerData = generateData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // Show 40 items per page

  // Filter containers by search term
  const filteredData = containerData.filter((container) =>
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
  // Handle row click to navigate to details page
  const handleRowClick = (containerNumber: string) => {
    router.push(`/cntr_detail/${containerNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-2">
      <div className="container max-w-full bg-[#800000] p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-center mb-3 text-white">
          Container Information
        </h1>

        {/* Search input */}
        <input
          type="text"
          id="searchInput"
          placeholder="Search for container number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-lg mx-auto px-4 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
        />

        {/* Container table */}
        <table className="min-w-full text-sm bg-white border-collapse border border-gray-300">
          <thead className="bg-[#800000]">
            <tr>
              <th className="border px-2 py-1 text-white">Container Number</th>
              <th className="border px-2 py-1 text-white">Date</th>
              <th className="border px-2 py-1 text-white">Time</th>
              <th className="border px-2 py-1 text-white">In/Out</th>
              <th className="border px-2 py-1 text-white">Container Size</th>
              <th className="border px-2 py-1 text-white">Driver Name</th>
              <th className="border px-2 py-1 text-white">Picture</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((container, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td
                  className="border px-2 py-1"
                  onClick={() => handleRowClick(container.containerNumber)}
                >
                  {container.containerNumber}
                </td>
                <td className="border px-2 py-1">{container.date}</td>
                <td className="border px-2 py-1">{container.time}</td>
                <td className="border px-2 py-1">{container.inOut}</td>
                <td className="border px-2 py-1">{container.size}</td>
                <td className="border px-2 py-1">{container.driver}</td>
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
            className={`px-4 py-1 bg-[#FFD700] text-[#800000] rounded text-sm ${
              currentPage === 1 ? "opacity-50" : "hover:bg-[#E6C200]"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 bg-[#FFD700] text-[#800000] rounded text-sm ${
              currentPage === totalPages ? "opacity-50" : "hover:bg-[#E6C200]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
