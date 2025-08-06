import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { locationService } from "../services";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Hero = () => {
  const sizePage = import.meta.env.VITE_SIZE_PAGE || 10;
  // Default to 10 if not set
  const [filter, setFilter] = React.useState({
    location: {},
    pickup_date: "",
    return_date: "",
    page: 1,
    size: sizePage,
  });

  const [locations, setLocations] = React.useState([]);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set("page", filter.page);
    searchParams.set("size", filter.size);
    searchParams.set("location", filter.location.id);
    searchParams.set("pickup_date", filter.pickup_date);
    searchParams.set("return_date", filter.return_date);
    navigate(`/cars?${searchParams.toString()}`);
  };
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await locationService.getAllLocations();
        console.log("Locations fetched successfully:", locations);

        setLocations(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold"
      >
        Luxury cars on Rents
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col md:flex-row items-start md:items-center
         justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
         bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={filter.location.id || ""}
              onChange={(e) => {
                const selectedLocation = locations.find(
                  (loc) => loc.id.toString() === e.target.value
                );
                setFilter({ ...filter, location: selectedLocation || {} });
              }}
            >
              <option value="">Pickup Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.district}, {location.city}
                </option>
              ))}
            </select>

            <p className="px-1 text-sm text-gray-500">
              {filter.location?.district && filter.location?.city
                ? filter.location.district + ", " + filter.location.city
                : "Please select location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickupDate">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
              onChange={(e) =>
                setFilter({ ...filter, pickup_date: e.target.value })
              }
              value={filter.pickup_date}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="return-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
              onChange={(e) =>
                setFilter({ ...filter, return_date: e.target.value })
              }
              value={filter.return_date}
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 text-white rounded-full cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--color-primary-dull)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--color-primary)";
          }}
          type="submit"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </motion.button>
      </motion.form>
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="car"
        className="max-h-74"
      />
    </motion.div>
  );
};

export default Hero;
