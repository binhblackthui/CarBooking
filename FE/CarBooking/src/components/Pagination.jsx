import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2 text-gray-500">
        <button
          type="button"
          aria-label="previous"
          className="mr-3 flex items-center gap-1"
        >
          <svg
            className="mt-px"
            width="18"
            height="18"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex gap-1 text-sm">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 aspect-square rounded-md hover:bg-gray-300/10 transition-all"
          >
            1
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 aspect-square bg-primary text-white rounded-md transition-all"
          >
            2
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 aspect-square rounded-md hover:bg-gray-300/10 transition-all"
          >
            3
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 aspect-square rounded-md hover:bg-gray-300/10 transition-all"
          >
            4
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 aspect-square rounded-md hover:bg-gray-300/10 transition-all"
          >
            5
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 aspect-square rounded-md hover:bg-gray-300/10 transition-all"
          >
            6
          </button>
        </div>

        <button
          type="button"
          aria-label="next"
          className="ml-3 flex items-center gap-1"
        >
          <svg
            className="mt-px"
            width="18"
            height="18"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
