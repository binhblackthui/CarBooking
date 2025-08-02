import React, { useEffect } from "react";
import { getVisiblePageNumbers } from "../utils/pageUtils";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = getVisiblePageNumbers(currentPage, totalPages);

  useEffect(() => {
    // Scroll to top when page changes
    console.log("Current page changed:", totalPages);
  }, []);
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2 text-gray-500">
        {/* Nút Previous */}
        <button
          type="button"
          aria-label="previous"
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={`mr-3 flex items-center gap-1 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg className="mt-px" width="18" height="18" viewBox="0 0 23 23">
            <path
              d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Các số trang */}
        <div className="flex gap-1 text-sm">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-8 h-8 aspect-square rounded-md transition-all ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "hover:bg-gray-300/10"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Nút Next */}
        <button
          type="button"
          aria-label="next"
          disabled={currentPage === totalPages}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className={`ml-3 flex items-center gap-1 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg className="mt-px" width="18" height="18" viewBox="0 0 23 23">
            <path
              d="M17.25 11.5H5.75m11.5 0-4.792-4.79m4.792 4.79-4.792 4.792"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
