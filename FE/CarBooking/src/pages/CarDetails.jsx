import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { CarContext } from "../contexts/CarContext";
import { useContext } from "react";
const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const { getCarById, loading } = useContext(CarContext);
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log("Fetching car details for ID:", id);
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        console.error("Failed to fetch car details:", error.message);
      }
    };

    fetchCarDetails();
  }, [id]);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <img
            src={car.imageURL}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">
              {car.carDetail.brand} {car.carDetail.model}
            </h1>
            <p className="text-gray-500 text-lg">
              {car.carDetail.category} {car.carDetail.year}
            </p>
            <p className="text-gray-500 text-lg">{car.licensePlate}</p>

            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { icon: assets.license_plate_icon, text: car.licensePlate },
                {
                  icon: assets.users_icon,
                  text: `${car.carDetail.seat} Seats`,
                },
                { icon: assets.fuel_icon, text: car.carDetail.fuelType },
                { icon: assets.car_icon, text: car.carDetail.transmission },
                {
                  icon: assets.location_icon,
                  text: car.location.district + ", " + car.location.city,
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg "
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
            {/* features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.split(",").map((feature, idx) => (
                  <li
                    key={idx}
                    value={feature.trim()}
                    title={feature.trim()}
                    className="flex items-center text-gray-500"
                  >
                    <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className="text-xl font-medium mb-3">Review Car</h1>
              <div className="w-full  border-b border-borderColor space-y-4 p-3 text-gray-500 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <img
                      className="h-8 w-8 mr-2 rounded-full"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                      alt="userImage1"
                    />
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                        fill="#FF532E"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                        fill="#FF532E"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                        fill="#FF532E"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                        fill="#FF532E"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                        fill="#FF532E"
                      />
                    </svg>
                  </div>
                </div>
                <p>
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna”
                </p>
                <div>
                  <p className="text-gray-800 font-medium">Donald Jackman</p>
                  <p>22 Jan 2025</p>
                </div>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>
          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="pickup-date"
              min={new Date().toDateString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Pickup Date</label>
            <input
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="return-date"
              min={new Date().toDateString().split("T")[0]}
            />
          </div>
          <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer">
            Book Now
          </button>
          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
