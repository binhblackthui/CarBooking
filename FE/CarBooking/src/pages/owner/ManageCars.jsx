import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import Pagination from "../../components/Pagination";

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY; // Fetch currency from environment variables
  const [cars, setCars] = useState([]);
  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);
  // Fetch cars from API or state management

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View, edit, or delete your cars listed on the platform"
      />
      <div className="max-w-3xl w-full rounded-b-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <th className="p-3 font-medium">Car</th>
            <th className="p-3 font-medium">Category</th>
            <th className="p-3 font-medium">Price</th>
            <th className="p-3 font-medium">Status</th>
            <div className="flex  justify-center">
              <th className="p-3 font-medium ">Actions</th>
            </div>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-b border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={car.brand}
                    className="w-12 h-12 aspect-square object-cover rounded-md"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-gray-500">
                      {car.seating_capacity} {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3 max-md:hidden">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <img src={assets.eye_icon} alt="" />
                    <img src={assets.delete_icon} alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default ManageCars;
