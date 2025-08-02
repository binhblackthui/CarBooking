import React, { useEffect, useState, useContext } from "react";
import Title from "../../components/owner/Title";
import Pagination from "../../components/Pagination";
import { CarContext } from "../../contexts/CarContext.jsx";

import CarForm from "../../components/CarForm.jsx";
import { assets } from "../../assets/assets.js";
import Loader from "../../components/Loader.jsx";
const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY; // Fetch currency from environment variables
  const sizePage = import.meta.env.VITE_SIZE_PAGE; // Fetch size per page from environment variables
  const {
    getCars,
    updateCar,
    cars,
    loading,
    deleteCar,
    totalCarsByStatus,
    numberOfCars,
  } = useContext(CarContext);

  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);

  const [carForm, setCarForm] = useState({});
  const handleStatusChange = async (car, status) => {
    try {
      const carForm = {
        carDetailId: car.carDetail.id,
        licensePlate: car.licensePlate,
        pricePerDay: car.pricePerDay,
        locationId: car.location.id,
        description: car.description,
        features: car.features,
        status: status,
        image: car.image,
      };
      console.log("Updating car status:", carForm);
      await updateCar(car.id, carForm);
    } catch (error) {
      console.error("Failed to update car status:", error.message);
    }
  };
  const handleOpenEdit = (car) => {
    setCarForm(car);
    setOpenEdit(true);
  };
  const handleCloseEdit = async () => {
    setOpenEdit(false);
    fetchCars();
  };
  const handleDelete = async (carId) => {
    await deleteCar(carId);
    fetchCars();
  };
  const fetchCars = async () => {
    console.log("add car");
    try {
      const res = await getCars({ page: page - 1, size: sizePage });
      console.log("My cars fetched:", res);
    } catch (error) {
      console.error("Failed to fetch owner's cars:", error.message);
    }
  };
  const fetchTotalCars = async () => {
    try {
      await totalCarsByStatus({ status: "" });
      console.log(numberOfCars.totalCars);
    } catch (error) {
      console.error("Failed to fetch total cars:", error.message);
    }
  };
  useEffect(() => {
    fetchTotalCars();
  }, []);
  useEffect(() => {
    fetchCars();
  }, [page]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full pb-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title
            title="Manage Cars"
            subTitle="View, edit, or delete your cars listed on the platform"
          />
          {cars.length > 0 && (
            <>
              {openEdit ? (
                <div>
                  <button
                    onClick={handleCloseEdit}
                    className="flex items-center gap-2 mb-6 mt-6 text-gray-500 cursor-pointer"
                  >
                    <img
                      src={assets.arrow_icon}
                      alt=""
                      className="rotate-180 opacity-65"
                    />
                    Back to all cars
                  </button>
                  <div className="ml-10">
                    <CarForm car={carForm} />
                  </div>
                </div>
              ) : (
                <>
                  <div className=" w-full rounded-b-md overflow-hidden border border-borderColor mt-6">
                    <table className="w-full border-collapse text-left text-sm text-gray-600">
                      <thead className="text-gray-500 border-b border-borderColor">
                        <tr>
                          <th className="p-3 font-medium">Car</th>
                          <th className="p-3 font-medium">Category</th>
                          <th className="p-3 font-medium">Features</th>

                          <th className="p-3 font-medium">Price</th>
                          <th className="p-3 font-medium">Location</th>
                          <th className="p-3 font-medium">Description</th>
                          <th className="p-3 font-medium">Available</th>
                          <th className="p-3 font-medium">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cars.map((car, index) => (
                          <tr
                            key={index}
                            className="border-b border-borderColor"
                          >
                            <td className="p-3 flex items-center gap-3">
                              <img
                                src={car.image.imageURL}
                                alt=""
                                className="w-12 h-12 aspect-square object-cover rounded-md"
                              />
                              <div className="max-md:hidden">
                                <p className="font-medium">
                                  {car.carDetail.brand} {car.carDetail.model}
                                </p>
                                <p className="text-gray-500">
                                  {car.carDetail.seat} seats •{" "}
                                  {car.carDetail.transmission}
                                </p>
                                <p className="text-gray-500">
                                  {car.carDetail.year} •{" "}
                                  {car.carDetail.fuelType} • {car.licensePlate}
                                </p>
                              </div>
                            </td>
                            <td className="p-3 max-md:hidden">
                              {car.carDetail.category}
                            </td>
                            <td className="p-3 max-md:hidden">
                              <select
                                className="w-25 px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none truncate"
                                value="features"
                                onChange={(e) => e.preventDefault()}
                              >
                                <option value="features">Features</option>
                                {car.features &&
                                  car.features
                                    .split(",")
                                    .map((feature, idx) => (
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
                                  ? car.description.trim().substring(0, 30) +
                                    " ..."
                                  : car.description}
                              </div>
                            </td>
                            <td className="p-3 max-md:hidden">
                              <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                                <input
                                  type="checkbox"
                                  className="peer sr-only"
                                  checked={car.status === "AVAILABLE"}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      car,
                                      e.target.checked
                                        ? "AVAILABLE"
                                        : "NOT_AVAILABLE"
                                    )
                                  }
                                />
                                <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary-dull"></div>
                                <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                              </label>
                            </td>
                            <td className="p-3 max-md:hidden gap-2">
                              <div className="h-full flex gap-2 i">
                                <img
                                  src={assets.black_edit_icon}
                                  alt=""
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleOpenEdit(car);
                                  }}
                                />
                                <img
                                  src={assets.delete_icon}
                                  className="cursor-pointer"
                                  alt=""
                                  onClick={() => handleDelete(car.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(numberOfCars.totalCars / sizePage)}
                    onPageChange={setPage}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCars;
