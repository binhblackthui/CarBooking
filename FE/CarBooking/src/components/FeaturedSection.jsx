import React, { useEffect } from "react";
import Title from "./Title";
import CarCard from "./CarCard";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarContext } from "../contexts/CarContext";
const FeaturedSection = () => {
  const navigate = useNavigate();
  const { searchCars, cars } = useContext(CarContext);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const res = await searchCars({
          page: 0,
          size: 6,
          pickup_date: today.toISOString().split("T")[0],
          return_date: tomorrow.toISOString().split("T")[0],
        });
        console.log("Cars fetched successfully", res);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);
  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your nex adventure."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {cars.slice(0, 6).map((car) => (
          <div key={car.id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2  border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
