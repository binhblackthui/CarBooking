import React from "react";
import { assets } from "../assets/assets";
const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="w-full  border-b border-borderColor space-y-4 p-3 text-gray-500 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: review.star }).map((_, index) => (
              <img key={index} src={assets.star_icon} alt="star" />
            ))}
          </div>
        </div>
        <p>{review.feedback}</p>
        <div>
          <p className="text-gray-800 font-medium">{review.user.fullName}</p>
          <p>{review.createdAt}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
