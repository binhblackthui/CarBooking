import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import { BookingContext } from "../contexts/BookingContext.jsx";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";

const MyBookings = () => {
  const sizePage = import.meta.env.VITE_SIZE_PAGE;
  const navigate = useNavigate();
  const { getMyBookings, updateBooking, bookings } = useContext(BookingContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));

  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      await getMyBookings(user.userId, {
        page: page - 1,
        size: sizePage,
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleConfirm = async (booking) => {
    try {
      const bookingForm = {
        userId: user.userId,
        carId: booking.car.id,
        pickupLocationId: booking.pickupLocation.id,
        returnLocationId: booking.returnLocation.id,
        pickupTime: booking.pickupTime,
        returnTime: booking.returnTime,
        status: "CONFIRMED",
      };
      await updateBooking(booking.id, bookingForm);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };
  const handleCancel = async (booking) => {
    try {
      const bookingForm = {
        userId: user.userId,
        carId: booking.car.id,
        pickupLocationId: booking.pickupLocation.id,
        returnLocationId: booking.returnLocation.id,
        pickupTime: booking.pickupTime,
        returnTime: booking.returnTime,
        status: "CANCELLED",
      };
      await updateBooking(booking.id, bookingForm);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };
  const currency = import.meta.env.VITE_CURRENCY;
  useEffect(() => {
    fetchData();
  }, [user, page]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
    >
      <Title
        title="My Booking"
        subTitle="View and manage your all car bookings"
        align="left"
      />

      {bookings?.data?.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            {bookings?.data.map((booking, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => navigate(`/booking-details/${booking.id}`)}
                key={booking.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
              >
                {/* Car image + Info */}
                <div className="md:col-span-1">
                  <div className="rounded-md overflow-hidden mb-3">
                    <img
                      src={booking.car.imageURL}
                      alt=""
                      className="w-full h-auto aspect-video object-cover"
                    />
                  </div>
                  <p className="text-lg font-medium mt-2">
                    {booking.car.carDetail.brand} {booking.car.carDetail.model}
                  </p>
                  <p className="text-gray-500">
                    {booking.car.carDetail.year}{" "}
                    {booking.car.carDetail.category} {booking.car.licensePlate}
                  </p>
                </div>
                {/* Booking Details */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <p className="px-3 py-1.5 bg-light rounded">
                      Booking #
                      {index + 1 + sizePage * (bookings.currentPage || 0)}
                    </p>
                    <p
                      className={`px-3 py-1 text-xs rounded-full ${
                        booking.status === "CONFIRMED" ||
                        booking.status === "COMPLETED"
                          ? "bg-green-400/15 text-green-600"
                          : booking.status === "CANCELLED"
                          ? "bg-red-400/15 text-red-600"
                          : "bg-yellow-400/15 text-yellow-600"
                      }`}
                    >
                      {booking.status.toLowerCase()}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.calendar_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500">Rental Period</p>
                      <p>
                        {booking.pickupTime.split("T")[0]} To{" "}
                        {booking.returnTime.split("T")[0]}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.location_icon}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div className="space-y-0.5">
                      <div className="flex ">
                        <p className="text-gray-500 mr-2">Pick-up: </p>
                        <p>
                          {booking.car.location.district} {", "}
                          {booking.car.location.city} {", "}
                          {booking.car.location.country}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-500 mr-2">Drop-off: </p>
                        <p>
                          {booking.car.location.district}
                          {", "}
                          {booking.car.location.city}
                          {", "}
                          {booking.car.location.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* price && Action`s */}
                <div className="md:col-span-1 flex flex-col justify-between gap-6">
                  <div className="text-sm text-gray-500 text-right">
                    <p>Total Price</p>
                    <h1 className="text-2xl font-semibold text-primary">
                      {currency}
                      {booking.payment.total}
                    </h1>
                    <p>Booked on {booking.createdAt.split("T")[0]}</p>
                  </div>
                  {booking.status === "PENDING" && (
                    <div
                      className="md:col-span-4 flex justify-end items-end  "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleConfirm(booking)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-md mr-2 cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleCancel(booking)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-red-600 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {bookings?.totalPages > 1 && (
              <Pagination
                currentPage={bookings?.currentPage + 1}
                totalPages={bookings?.totalPages}
              />
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default MyBookings;
