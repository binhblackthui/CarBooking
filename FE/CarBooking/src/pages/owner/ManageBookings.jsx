import React, { useEffect, useState, useContext } from "react";
import { assets, dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/owner/Title";

import Pagination from "../../components/Pagination";
import { AuthContext } from "../../contexts/AuthContext";
import { CarContext } from "../../contexts/CarContext";
const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { getBookingsOfMyCars } = useContext(CarContext);
  const fetchBookings = async () => {
    setBookings(dummyMyBookingsData);
  };
  const fetchData = async () => {
    if (!user || !user.userId) {
      return;
    }
    try {
      const bookingsData = await getBookingsOfMyCars(user.userId, {
        page: 0,
        size: 10,
      });
      setBookings(bookingsData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, [user]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />
      <div>
        <div className=" w-full rounded-b-md overflow-hidden border border-borderColor mt-6">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium">Date Range</th>
                <th className="p-3 font-medium">Location</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Payment</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  value={booking.id}
                  className="border-b border-borderColor text-gray-500"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={booking.car.image}
                      alt=""
                      className="w-12 h-12 aspect-square object-cover rounded-md"
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium">
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 max-md:hidden space-y-0.5">
                    <div className="flex items-center gap-2">
                      <img src={assets.car_up} alt="" className="h-5 w-5" />
                      {booking.pickupDate.split("T")[0]}{" "}
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={assets.car_down} alt="" className="h-5 w-5" />{" "}
                      {booking.returnDate.split("T")[0]}{" "}
                    </div>
                  </td>
                  <td className="p-3 max-md:hidden space-y-0.5">
                    <div className="flex items-center gap-2 ">
                      <img src={assets.car_up} alt="" className="h-5 w-5" /> Da
                      Nang
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={assets.car_down} alt="" className="h-5 w-5" />
                      Quan 1, Ho Chi Minh, Vietnam
                    </div>
                  </td>
                  <td className="p-3 max-md:hidden">
                    {currency}
                    {booking.price}
                  </td>
                  <td className="p-3 max-md:hidden flex items-center ">
                    <img src={assets.eye_icon} alt="" />
                    {/* <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      offline
                    </span> */}
                  </td>
                  <td className="p-3">
                    <div className="flex ">
                      {booking.status === "pending" ? (
                        <select className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none">
                          <option value="pending" selected>
                            Pending
                          </option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-sem' ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }})`}
                        >
                          {booking.status}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default ManageBookings;
