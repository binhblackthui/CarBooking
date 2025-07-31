import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useContext } from "react";
import { CarContext } from "../../contexts/CarContext";
import { BookingContext } from "../../contexts/BookingContext";
const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { getCarOverview } = useContext(CarContext);
  const [data, setData] = useState({
    totalCars: 0,
    availableCars: 0,
    notAvailableCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBooking: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });
  const { getBookingOverview, getBookings } = useContext(BookingContext);
  const dashboardCards = {
    car: [
      {
        title: "Total Cars",
        value: data.totalCars,
        icon: assets.carIconColored,
      },
      {
        title: "Available",
        value: data.availableCars,
        icon: assets.carIconColored,
      },
      {
        title: "Not Available",
        value: data.notAvailableCars,
        icon: assets.carIconColored,
      },
    ],
    booking: [
      {
        title: "Total Bookings",
        value: data.totalBookings,
        icon: assets.listIconColored,
      },
      {
        title: "Pending",
        value: data.pendingBookings,
        icon: assets.cautionIconColored,
      },
      {
        title: "Confirmed",
        value: data.confirmedBooking,
        icon: assets.check_icon,
      },
      {
        title: "Completed",
        value: data.completedBookings,
        icon: assets.check_icon,
      },
      {
        title: "Cancelled",
        value: data.cancelledBookings,
        icon: assets.ban_icon,
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await getCarOverview();
        console.log(carData);
        setData((prevData) => ({
          ...prevData,
          totalCars: carData.totalCars,
          availableCars: carData.availableCars,
          notAvailableCars: carData.notAvailableCars,
        }));
        const bookingData = await getBookingOverview();
        setData((prevData) => ({
          ...prevData,
          totalBookings: bookingData.totalBookings,
          pendingBookings: bookingData.pendingBookings,
          completedBookings: bookingData.completedBookings,
        }));
        const recentBookings = await getBookings({
          page: 0,
          size: 5,
        });
        console.log(recentBookings);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
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
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">
                  {currency}
                  {booking.price}
                </p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* monthly revenue */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">
            {currency}
            {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
