import React, { useEffect, useState, useContext } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import Pagination from "../../components/Pagination";
import { BookingContext } from "../../contexts/BookingContext.jsx";
import BillForm from "../../components/BillForm.jsx";
import Loader from "../../components/Loader.jsx";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { b } from "motion/react-client";

const ManageBookings = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1; // Default to page 1 if not set
  const sizePage = import.meta.env.VITE_SIZE_PAGE; // Default to 10 if not set
  const [openPayment, setOpenPayment] = useState(false);
  const { getBookings, bookings, setBookings, loading, updateBooking } =
    useContext(BookingContext);

  const fetchData = async () => {
    try {
      const bookingsData = await getBookings({
        page: page - 1, // Adjust for zero-based index
        size: sizePage,
      });
      console.log("Bookings data fetched:", bookingsData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
    }
  };

  const handleUpdateBookingStatus = async (booking, status) => {
    try {
      const bookingForm = {
        userId: booking.userId,
        carId: booking.car.id,
        pickupLocationId: booking.pickupLocation.id,
        returnLocationId: booking.returnLocation.id,
        pickupTime: booking.pickupTime,
        returnTime: booking.returnTime,
        status: status,
      };
      await updateBooking(booking.id, bookingForm);
    } catch (error) {
      console.error("Failed to update booking status:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="px-4 pt-10 md:px-10 w-full"
    >
      {openPayment && (
        <div>
          <BillForm
            setOpenPayment={setOpenPayment}
            setBookingsData={setBookings}
            payment={bookings.data[0].payment}
            userId={bookings.data[0].userId}
          />
        </div>
      )}
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />
      {bookings?.data?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className=" w-full rounded-b-md overflow-hidden border border-borderColor mt-6">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="text-gray-500 border-b border-borderColor">
                <tr>
                  <th className="p-3 font-medium">Car</th>
                  <th className="p-3 font-medium">Date Range</th>
                  <th className="p-3 font-medium">Location</th>
                  <th className="p-3 font-medium text-center">Payment</th>
                  <th className="p-3 font-medium">Review</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings.data) &&
                  bookings.data.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      value={booking.id}
                      className="border-b border-borderColor text-gray-500"
                    >
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={booking.car.imageURL}
                          alt=""
                          className="w-12 h-12 aspect-square object-cover rounded-md"
                        />
                        <div className="max-md:hidden">
                          <p className="font-medium">
                            {booking.car.carDetail.brand}{" "}
                            {booking.car.carDetail.model}
                          </p>
                          <p className="text-gray-500">
                            {booking.car.licensePlate}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 max-md:hidden space-y-0.5">
                        <div className="flex items-center gap-2">
                          <img src={assets.car_up} alt="" className="h-5 w-5" />
                          {booking.pickupTime.split("T")[0]}{" "}
                        </div>

                        <div className="flex items-center gap-2">
                          <img
                            src={assets.car_down}
                            alt=""
                            className="h-5 w-5"
                          />{" "}
                          {booking.returnTime.split("T")[0]}{" "}
                        </div>
                      </td>
                      <td className="p-3 max-md:hidden space-y-0.5">
                        <div className="flex items-center gap-2 ">
                          <img src={assets.car_up} alt="" className="h-5 w-5" />
                          {booking.pickupLocation.district},{" "}
                          {booking.pickupLocation.city},{" "}
                          {booking.pickupLocation.country}
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src={assets.car_down}
                            alt=""
                            className="h-5 w-5"
                          />
                          {booking.returnLocation.district},{" "}
                          {booking.returnLocation.city},{" "}
                          {booking.returnLocation.country}
                        </div>
                      </td>

                      <td className="p-3 max-md:hidden">
                        <div className="h-full flex justify-center items-center">
                          <img
                            onClick={() => setOpenPayment(true)}
                            src={assets.eye_icon}
                            alt=""
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="p-3 max-md:hidden ">
                        <div className="flex items-center gap-2">
                          <p>4</p>
                          <img src={assets.star_icon} alt="" />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex">
                          {booking.status === "PENDING" ||
                          booking.status === "CONFIRMED" ? (
                            <select
                              className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                              defaultValue={booking.status}
                              onChange={(e) =>
                                handleUpdateBookingStatus(
                                  booking,
                                  e.target.value
                                )
                              }
                            >
                              {booking.status === "PENDING" && (
                                <option value="PENDING">Pending</option>
                              )}
                              <option value="CONFIRMED">Confirmed</option>
                              {booking.status === "CONFIRMED" && (
                                <option value="COMPLETED">Completed</option>
                              )}
                              {booking.status === "PENDING" && (
                                <option value="CANCELLED">Cancelled</option>
                              )}
                            </select>
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === "COMPLETED"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {booking.status === "COMPLETED"
                                ? "Completed"
                                : "Cancelled"}
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
          {bookings.totalPages > 1 && (
            <Pagination
              currentPage={bookings?.currentPage + 1}
              totalPages={bookings?.totalPages}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManageBookings;
