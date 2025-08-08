import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { motion } from "motion/react";
import ReviewForm from "../components/ReviewForm";

const BookingDetails = () => {
  const { id } = useParams();
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [booking, setBooking] = React.useState(null);
  const { getBookingByUser, getBookingById } = useContext(BookingContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!user) {
        return;
      }
      try {
        if (user.roleName === "ROLE_USER") {
          const bookingData = await getBookingByUser(user.userId, id);
          setBooking(bookingData);
          console.log("Fetched booking by user:", bookingData);
        } else {
          const bookingData = await getBookingById(id);
          setBooking(bookingData);
        }
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      }
    };
    fetchBooking();
  }, [id, user]);

  return booking == null ? (
    <Loader />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 max-w-7xl w-full px-4 md:px-6 mx-auto"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back
      </button>

      <div className="flex flex-col md:flex-row  gap-10">
        {/* Cart Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="flex-1"
        >
          <h1 className="text-3xl font-semibold mb-8 flex items-center gap-2">
            Booking Details{" "}
            <p
              className={`px-3 py-1 text-xs rounded-full ${
                booking.status === "CONFIRMED" || booking.status === "COMPLETED"
                  ? "bg-green-400/15 text-green-600"
                  : booking.status === "CANCELLED"
                  ? "bg-red-400/15 text-red-600"
                  : "bg-yellow-500/15 text-yellow-600"
              }`}
            >
              #{booking.status}
            </p>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-300 rounded-xl shadow-sm bg-white">
            {/* Car image */}
            <div className="md:col-span-1 flex justify-center items-center">
              <img
                src={booking.car.imageURL}
                alt=""
                className="rounded-lg w-full h-auto aspect-video object-cover"
              />
            </div>

            {/* Car info */}
            <div className="md:col-span-2 space-y-2">
              <h2 className="text-xl font-semibold">
                {booking.car.carDetail.brand} {booking.car.carDetail.model}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm mt-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.license_plate_icon}
                      alt=""
                      className="h-5"
                    />
                    <span>{booking.car.licensePlate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.users_icon}
                      alt=""
                      className="h-4 pl-0.5 mr-0.5"
                    />
                    <span>{booking.car.seats} seats</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={assets.calendar_icon} alt="" className="h-4" />
                    <span>{booking.car.carDetail.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.location_icon}
                      alt=""
                      className="h-4 mr-1 pl-1"
                    />
                    <span>
                      {booking.car.location.city},{" "}
                      {booking.car.location.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col justify-between text-right">
              <div>
                <p className="text-sm text-gray-500 mb-1">Price per day</p>
                <p className="text-2xl font-bold text-primary">
                  {currency}
                  {booking.car.pricePerDay}
                </p>
              </div>
            </div>
          </div>

          {/* Time & Location Info */}
          <div className="mt-8 space-y-3  text-base mr-2">
            {[
              {
                label: "Time pick-up",
                value: booking.pickupTime.split("T")[0],
              },
              {
                label: "Time return",
                value: booking.returnTime.split("T")[0],
              },
              {
                label: "Location pick-up",
                value:
                  booking.pickupLocation.district +
                  ", " +
                  booking.pickupLocation.city +
                  ", " +
                  booking.pickupLocation.country,
              },
              {
                label: "Location return",
                value:
                  booking.returnLocation.district +
                  ", " +
                  booking.returnLocation.city +
                  ", " +
                  booking.returnLocation.country,
              },
              {
                label: "Booked on",
                value: booking.createdAt.split("T")[0],
              },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between  pb-2">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm "
        >
          <div className=" border border-gray-300 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl flex font-semibold mb-5  items-center gap-2">
              Order Summary{" "}
              <p
                className={`px-3 py-1 text-xs rounded-full font-bold ${
                  booking.payment.paymentStatus === "PAID"
                    ? "bg-green-400/15 text-green-600"
                    : booking.payment.paymentStatus === "FAILED"
                    ? "bg-red-400/15 text-red-600"
                    : "bg-yellow-400/15 text-yellow-600"
                }`}
              >
                {" "}
                #{booking.payment.paymentStatus}
              </p>
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Customer</span>
                <span>{booking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone</span>
                <span className="">{booking.phone}</span>
              </div>

              <div className="flex justify-between">
                <span>Created at</span>
                <span className="">{booking.createdAt.split("T")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment time</span>
                <span className="">
                  {booking.payment.paymentTime
                    ? booking.payment.paymentTime.split("T")[0]
                    : ""}
                </span>
              </div>

              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between font-semibold text-base mt-2">
                <span className="text-2xl">Total</span>
                <span className="text-primary text-2xl  font-bold">
                  {currency}
                  {booking.payment.total}
                </span>
              </div>
            </div>
          </div>
          {booking.review ? (
            <ReviewForm booking={booking} />
          ) : (
            user.roleName === "ROLE_USER" &&
            booking.status === "COMPLETED" && (
              <ReviewForm booking={booking} setBooking={setBooking} />
            )
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookingDetails;
