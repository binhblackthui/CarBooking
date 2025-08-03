import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import Pagination from "../components/Pagination";
import { CarContext } from "../contexts/CarContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Cars = () => {
  const sizePage = import.meta.env.VITE_SIZE_PAGE || 10; // Default to 10 if not set
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const { cars, filter, searchCars, totalPages, numberOfCars } =
    useContext(CarContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const res = await searchCars({
          page: page - 1,
          size: sizePage,
          location: filter.location || "",
          pickup_date: filter.pickup_date || today.toISOString().split("T")[0],
          return_date:
            filter.return_date || tomorrow.toISOString().split("T")[0],
        });
        console.log("Cars fetched successfully", res);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [page]);
  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for yur next adventure"
        />
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max max-w-7xl mx-auto">
          Showing {numberOfCars.totalCars} Cars
        </p>
        <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {cars.map((car, index) => (
            <div key={index} onClick={() => navigate(`/car-details/${car.id}`)}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Cars;
