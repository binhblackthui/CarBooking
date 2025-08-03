import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { locationService } from "../services";
import { CarContext } from "../contexts/CarContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const { filter, setFilter } = React.useContext(CarContext);
  const [locations, setLocations] = React.useState([]);
  const navigate = useNavigate();
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
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury cars on Rents
      </h1>
      <form
        className="flex flex-col md:flex-row items-start md:items-center
         justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
         bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
            >
              <option value="">Pickup Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.district}
                  {", "}
                  {location.city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {filter.location ? filter.location : "Please select location"}
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
        <button
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 text-white rounded-full cursor-pointer "
          style={{
            backgroundColor: "var(--color-primary)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--color-primary-dull)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--color-primary)";
          }}
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
            onClick={() => {
              navigate("/cars");
            }}
          />
          Search
        </button>
      </form>
      <img src={assets.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;
