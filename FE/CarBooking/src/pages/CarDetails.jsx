import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { CarContext } from "../contexts/CarContext";
import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import { AuthContext } from "../contexts/AuthContext";
import { locationService } from "../services";
import { motion } from "motion/react";
const CarDetails = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const sizePage = import.meta.env.VITE_SIZE_PAGE; // Default to 10 if not set
  const { id } = useParams();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [car, setCar] = useState(null);
  const { getCarById, getCarReviews, reviews, loading } =
    useContext(CarContext);
  const { createBooking, loading: bookingLoading } = useContext(BookingContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState({
    pickup_date: "",
    return_date: "",
  });
  const handleSubmit = async () => {
    const formData = {
      userId: user.userId,
      carId: car.id,
      pickupLocationId: car.location.id,
      returnLocationId: locationId,
      pickupTime: date.pickup_date,
      returnTime: date.return_date,
      status: "PENDING",
    };

    try {
      const res = await createBooking(formData);
      navigate("/booking-details/" + res.id);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

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
  useEffect(() => {
    const fetchCarLocation = async () => {
      try {
        const locationsData = await locationService.getAllLocations();
        setLocations(locationsData);
        console.log("Locations fetched successfully:", locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchCarLocation();
  }, []);
  useEffect(() => {
    const fetchCarReviews = async () => {
      try {
        console.log("Fetching reviews for car ID:", id);
        const reviewsData = await getCarReviews(id, {
          page: page - 1,
          size: sizePage,
        });
        console.log("Reviews fetched:", reviewsData);
      } catch (error) {
        console.error("Failed to fetch car reviews:", error.message);
      }
    };
    fetchCarReviews();
  }, [id, page]);
  return car === null ? (
    <Loader />
  ) : (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:col-span-2">
          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={car?.imageURL}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold">
              {car.carDetail.brand} {car.carDetail.model}
            </h1>
            <p className="text-gray-500 text-lg">
              {car.carDetail.category} {car.carDetail.year}
            </p>

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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg "
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </motion.div>
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
              {reviews.totalElements > 0 ? (
                <>
                  <div className="space-y-4">
                    {reviews.content.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={reviews.totalPages}
                    onPageChange={setPage}
                  />
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
        {/* Booking Form */}

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
              onChange={(e) =>
                setDate({
                  ...date,
                  pickup_date: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              className="border border-borderColor px-4 py-2 rounded-lg"
              required
              id="return-date"
              min={new Date().toDateString().split("T")[0]}
              onChange={(e) =>
                setDate({
                  ...date,
                  return_date: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Location</label>
            <select
              name=""
              id=""
              required
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="border border-borderColor px-3 py-2 rounded-lg"
            >
              <option value="">Select Return Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.district}, {location.city}, {location.country}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>
          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CarDetails;
