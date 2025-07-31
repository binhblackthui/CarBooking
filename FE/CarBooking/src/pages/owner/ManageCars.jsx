import React, { useEffect, useState, useContext } from "react";
import Title from "../../components/owner/Title";
import Pagination from "../../components/Pagination";
import { CarContext } from "../../contexts/CarContext.jsx";

import { assets } from "../../assets/assets.js";
const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY; // Fetch currency from environment variables
  const [carData, setCarData] = useState([]);

  const { getCars } = useContext(CarContext);

  useEffect(() => {
    const fetchMyCars = async () => {
      console.log("add car");
      try {
        const cars = await getCars({ page: 0, size: 10 });
        setCarData(cars);
        console.log("Fetched cars:", cars);
      } catch (error) {
        console.error("Failed to fetch owner's cars:", error.message);
      }
    };
    fetchMyCars();
  }, []);
  // Fetch cars from API or state management

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View, edit, or delete your cars listed on the platform"
      />
      <div className=" w-full rounded-b-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500 border-b border-borderColor">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Features</th>
              <th className="p-3 font-medium">License Plate</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Location</th>
              <th className="p-3 font-medium">Description</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {carData.map((car, index) => (
              <tr key={index} className="border-b border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.images[0].imageURL}
                    alt={car.brand}
                    className="w-12 h-12 aspect-square object-cover rounded-md"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.car.brand} {car.car.model}
                    </p>
                    <p className="text-gray-500">
                      {car.car.seat} seats • {car.car.transmission}
                    </p>
                    <p className="text-gray-500">
                      {car.car.year} • {car.car.fuelType}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.car.category}</td>
                <td className="p-3 max-md:hidden">
                  <select
                    className="w-25 px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none truncate"
                    value="features"
                    onChange={(e) => e.preventDefault()}
                  >
                    <option value="features">Features</option>
                    {car.features &&
                      car.features.split(",").map((feature, idx) => (
                        <option
                          key={idx}
                          value={feature.trim()}
                          title={feature.trim()}
                        >
                          {feature.trim()}
                        </option>
                      ))}
                  </select>
                </td>

                <td className="p-3 max-md:hidden">{car.licensePlate}</td>

                <td className="p-3 max-md:hidden">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="p-3 max-md:hidden">
                  {car.location.district}, {car.location.city},{" "}
                  {car.location.country}
                </td>
                <td className="p-3 max-md:hidden">
                  <div title={car.description}>
                    {car.description.length > 30
                      ? car.description.trim().substring(0, 30) + " ..."
                      : car.description}
                  </div>
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.status === "AVAILABLE"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="p-3 flex  gap-2">
                  <img src={assets.black_edit_icon} alt="" />
                  <img src={assets.delete_icon} alt="" />
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
