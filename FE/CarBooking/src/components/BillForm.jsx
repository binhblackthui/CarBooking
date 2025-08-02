import React from "react";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { PaymentContext } from "../contexts/PaymentContext";
import { userService } from "../services";
import Loader from "./Loader";
const BillForm = ({ setOpenPayment, setBookingsData, userId, payment }) => {
  const { updatePayment, loading } = useContext(PaymentContext);

  const [userData, setUserData] = useState({
    fullName: "Tran Thanh Binh",
    phone: "0987654321",
  });
  const currency = import.meta.env.VITE_CURRENCY; // Fetch currency from environment variables
  const fetchUserData = async () => {
    try {
      const user = await userService.getUserById(userId);
      setUserData(user);
      console.log("Fetched user data:", user);
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
      throw error;
    }
  };
  const handleUpdatePayment = async () => {
    try {
      const updatedPayment = await updatePayment(payment.id, {
        paymentStatus: "PAID",
        paymentMethod: payment.paymentMethod,
      });
      console.log("Payment updated successfully:", updatedPayment);
      setBookingsData((prevData) =>
        prevData.map((booking) =>
          booking.id === payment.id
            ? { ...booking, paymentStatus: "PAID" }
            : booking
        )
      );
      setOpenPayment(false);
    } catch (error) {
      console.error("Failed to update payment:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div
      onClick={() => setOpenPayment(false)}
      className="fixed top-0 bottom-0 left-0 right-0  flex items-center justify-center text-sm bg-black/50 z-100"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center   pb-2">
              <h2 className="text-lg font-semibold mr-2">Payment</h2>

              {payment.paymentStatus !== "PENDING" && (
                <>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold mr-auto ${
                      payment.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    #{payment.paymentStatus}
                  </span>

                  <button
                    className="hover:bg-red-600 hover:text-white cursor-pointer text-xl w-6 h-6 flex items-center justify-center rounded"
                    onClick={() => setOpenPayment(false)}
                  >
                    &times;
                  </button>
                </>
              )}
            </div>
            <div className="mt-4">
              <div className="flex items-center pb-2 mb-4">
                <img src={assets.users_icon} className="mr-2" alt="" />
                <span className="text-gray-600">Customer</span>
                <span className="ml-auto text-gray-500">
                  {userData.fullName}
                </span>
              </div>
              <div className="flex items-center pb-2 mb-4">
                <img src={assets.phone_icon} className="mr-2" alt="" />
                <span className="text-gray-600">Phone</span>
                <span className="ml-auto text-gray-500">{userData.phone}</span>
              </div>
              <div className="flex items-center  pb-2 mb-4">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                <span className="text-gray-600 ">Payment Method</span>
                <span
                  className={`${
                    payment.paymentMethod === "OFFLINE"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-green-100 text-green-600"
                  } px-3 py-1 rounded-full text-xs ml-auto`}
                >
                  {payment.paymentMethod === "OFFLINE" ? "offline" : "online"}
                </span>
              </div>
              <div className="flex items-center  pb-2 mb-4">
                <img src={assets.calendar_icon} className="mr-2" alt="" />
                <span className="text-gray-600">Created At</span>
                <span className="ml-auto text-gray-500">20-07-2025</span>
              </div>
              <div className="flex items-center border-t pb-2 pt-6 mb-4">
                <span className="text-gray-600 text-2xl">Total</span>
                <span className="ml-auto text-gray-600 text-2xl">
                  {currency} {payment.total}
                </span>
              </div>
              {payment.paymentStatus === "PENDING" && (
                <div className="flex items-center  mb-2 gap-4">
                  <button
                    onClick={() => setOpenPayment(false)}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdatePayment}
                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dull"
                  >
                    Pay
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillForm;
