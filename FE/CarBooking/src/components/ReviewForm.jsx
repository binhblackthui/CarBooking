import React, { useState, useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";

const ReviewForm = ({ booking, setBooking }) => {
  const { createReview } = useContext(BookingContext);
  const [reviewData, setReviewData] = useState({
    stars: booking.review ? booking.review.stars : 0,
    comment: booking.review ? booking.review.comment : "",
  });
  const handleRatingChange = (e) => {
    console.log("Rating changed:", e.target.value);
    if (!booking.review) {
      setReviewData({ ...reviewData, stars: Number(e.target.value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      carId: booking.car.id,
      userId: booking.userId,
      stars: reviewData.stars,
      comment: reviewData.comment,
    };
    console.log("Submitting review:", formData);
    try {
      const res = await createReview(booking.id, formData);
      setBooking((prevBooking) => ({ ...prevBooking, review: res }));
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl flex font-semibold mb-5 items-center gap-2">
          Review
        </h2>
        <div className="flex justify-center gap-2 text-xl">
          <div className="flex flex-row-reverse justify-end items-center gap-2">
            {[5, 4, 3, 2, 1].map((num) => (
              <React.Fragment key={num}>
                <input
                  id={`hs-ratings-readonly-${num}`}
                  type="radio"
                  className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  name="hs-ratings-readonly"
                  value={num}
                  checked={reviewData.stars === num}
                  onChange={handleRatingChange}
                  disabled={!!booking.review}
                />
                <label
                  htmlFor={`hs-ratings-readonly-${num}`}
                  className={`peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-400 dark:text-neutral-600`}
                >
                  <svg
                    className="shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mb-4 mt-6">
          <textarea
            id="review"
            name="review"
            rows="4"
            required
            className="w-full p-4 text-sm 700 rounded-lg border border-borderColor focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            placeholder="Write your thoughts..."
            defaultValue={booking.review ? booking.review.comment : ""}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            disabled={!!booking.review}
          ></textarea>
        </div>
        {!booking.review && (
          <div className="text-center">
            <button
              type="submit"
              className="font-serif w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Submit Review
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
