import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useContext } from "react";
import { CarContext } from "../../contexts/CarContext";
import { BookingContext } from "../../contexts/BookingContext";
import { motion } from "motion/react";
const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const sizePage = import.meta.env.VITE_SIZE_PAGE; // Default to 10 if not set
  const { totalCarsByStatus, numberOfCars } = useContext(CarContext);
  const { getBookings, totalBookingsByStatus, numberOfBookings, bookings } =
    useContext(BookingContext);

  const dashboardCards = {
    car: [
      {
        title: "Total Cars",
        value: numberOfCars.totalCars,
        icon: assets.carIconColored,
      },
      {
        title: "Available",
        value: numberOfCars.availableCars,
        icon: assets.carIconColored,
      },
      {
        title: "Not Available",
        value: numberOfCars.notAvailableCars,
        icon: assets.carIconColored,
      },
    ],
    booking: [
      {
        title: "Total Bookings",
        value: numberOfBookings.totalBookings,
        icon: assets.listIconColored,
      },
      {
        title: "Pending",
        value: numberOfBookings.pendingBookings,
        icon: assets.cautionIconColored,
      },
      {
        title: "Confirmed",
        value: numberOfBookings.confirmedBookings,
        icon: assets.check_icon,
      },
      {
        title: "Completed",
        value: numberOfBookings.completedBookings,
        icon: assets.check_icon,
      },
      {
        title: "Cancelled",
        value: numberOfBookings.cancelledBookings,
        icon: assets.ban_icon,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await totalCarsByStatus({ status: "AVAILABLE" });
        await totalCarsByStatus({ status: "NOT_AVAILABLE" });
        await totalCarsByStatus({ status: "" });
        await totalBookingsByStatus({ status: "PENDING" });
        await totalBookingsByStatus({ status: "CONFIRMED" });
        await totalBookingsByStatus({ status: "CANCELLED" });
        await totalBookingsByStatus({ status: "COMPLETED" });
        await totalBookingsByStatus({ status: "" });
        await getBookings({
          page: 0,
          size: sizePage,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="px-4 pt-10 md:px-10 flex-1"
    >
      <Title
        title="Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 max-w-5xl">
        {dashboardCards.car.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <img src={card.icon} alt="" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-8 max-w-5xl">
        {dashboardCards.booking.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <img src={card.icon} alt="" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* recent bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Booking</h1>
          <p className="text-gray-500">Latest customer bookings</p>
          {Array.isArray(bookings?.data) &&
            bookings?.data.map((booking, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                key={index}
                className="mt-4 grid grid-cols-1 md:grid-cols-4 items-center gap-2 justify-between"
              >
                <div className="flex items-center gap-2 col-span-2">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <img
                      src={assets.listIconColored}
                      alt=""
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    <p>
                      {booking.car.carDetail.brand}{" "}
                      {booking.car.carDetail.model}
                    </p>
                    <p className="text-sm text-gray-500 ">
                      {booking.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-medium text-right">
                  {currency}
                  {booking.payment.total}
                </div>
                <div className="flex items-center gap-2 font-medium text-right ">
                  <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm ">
                    {booking.status}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
        {/* monthly revenue */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">{currency}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
