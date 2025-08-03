import React, { useEffect } from "react";
import { CarContext } from "../contexts/CarContext";
import Select from "react-select";
import { assets } from "../assets/assets.js";
import { locationService, carTypeService } from "../services";
const CarForm = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY; // Fetch currency from environment variables
  const { addCar, updateCar } = React.useContext(CarContext);
  const [carForm, setCarForm] = React.useState({
    carDetailId: car?.carDetail.id || "",
    licensePlate: car?.licensePlate || "",
    pricePerDay: car?.pricePerDay || "",
    locationId: car?.location.id || "",
    description: car?.description || "",
    features: car?.features || "",
    status: car?.status || "AVAILABLE",
    imageURL: car?.imageURL || "",
  });

  const [carDetail, setCarDetail] = React.useState({
    brand: car?.carDetail.brand || "",
    model: car?.carDetail.model || "",
    category: car?.carDetail.category || "",
    transmission: car?.carDetail.transmission || "",
    fuelType: car?.carDetail.fuelType || "",
    year: car?.carDetail.year || "",
  });
  const [carDetailData, setCarDetailData] = React.useState([]);
  const [locationData, setLocationData] = React.useState([]);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCarForm((prevCar) => ({
        ...prevCar,
        imageURL: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      if (car) {
        await updateCar(car.id, carForm);
      } else {
        await addCar(carForm);
      }
    } catch (error) {
      console.error("Failed to submit car form:", error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carTypes = await carTypeService.getAllCarTypes({
          page: 0,
          size: 100,
        });
        setCarDetailData(carTypes);
        const locations = await locationService.getAllLocations({
          page: 0,
          size: 100,
        });
        setLocationData(locations);
      } catch (error) {
        console.error("Failed to fetch car types or locations:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form
        onSubmit={onSubmitHandle}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* car image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={carForm.imageURL ? carForm.imageURL : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={handleUploadImage}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        {/* car brand, model, category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <select
              required
              value={carDetail.brand}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  focus:border-primary"
              onChange={(e) =>
                setCarDetail({ ...carDetail, brand: e.target.value })
              }
            >
              <option value="">Select Brand</option>
              {carDetailData.map((carType) => (
                <option key={carType.id} value={carType.brand}>
                  {carType.brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>

            <select
              required
              value={carDetail.model}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary "
              onChange={(e) =>
                setCarDetail({ ...carDetail, model: e.target.value })
              }
            >
              <option value="">Select Model</option>
              {carDetailData
                .filter((carType) => carType.brand === carDetail.brand)
                .map((carType) => (
                  <option key={carType.id} value={carType.model}>
                    {carType.model}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              required
              value={carDetail.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) =>
                setCarDetail({ ...carDetail, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {carDetailData
                .filter(
                  (carType) =>
                    carType.brand === carDetail.brand &&
                    carType.model === carDetail.model
                )
                .map((carType) => (
                  <option key={carType.id} value={carType.category}>
                    {carType.category}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* car transmission, fuel type, seating capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              required
              value={carDetail.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) =>
                setCarDetail({ ...carDetail, transmission: e.target.value })
              }
            >
              <option value="">Select Transmission</option>
              {carDetailData
                .filter(
                  (carType) =>
                    carType.brand === carDetail.brand &&
                    carType.model === carDetail.model &&
                    carType.category === carDetail.category
                )
                .map((carType) => (
                  <option key={carType.id} value={carType.transmission}>
                    {carType.transmission}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              required
              value={carDetail.fuelType}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) =>
                setCarDetail({ ...carDetail, fuelType: e.target.value })
              }
            >
              <option value="">Select Fuel Type</option>
              {carDetailData
                .filter(
                  (carType) =>
                    carType.brand === carDetail.brand &&
                    carType.model === carDetail.model &&
                    carType.category === carDetail.category &&
                    carType.transmission === carDetail.transmission
                )
                .map((carType) => (
                  <option key={carType.id} value={carType.fuelType}>
                    {carType.fuelType}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Year</label>
            <select
              required
              value={carDetail.year}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) => {
                setCarDetail({ ...carDetail, year: e.target.value });
              }}
            >
              <option value="">Select Year</option>
              {carDetailData
                .filter(
                  (carType) =>
                    carType.brand === carDetail.brand &&
                    carType.model === carDetail.model &&
                    carType.category === carDetail.category &&
                    carType.transmission === carDetail.transmission &&
                    carType.fuelType === carDetail.fuelType
                )
                .map((carType) => (
                  <option key={carType.id} value={carType.year}>
                    {carType.year}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* car year, license plate, price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <select
              required
              value={carForm.carDetailId}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) =>
                setCarForm({ ...carForm, carDetailId: e.target.value })
              }
            >
              <option value="">Select Seating Capacity</option>
              {carDetailData
                .filter(
                  (carType) =>
                    carType.brand === carDetail.brand &&
                    carType.model === carDetail.model &&
                    carType.category === carDetail.category &&
                    carType.transmission === carDetail.transmission &&
                    carType.fuelType === carDetail.fuelType &&
                    carType.year == carDetail.year
                )
                .map((carType) => (
                  <option key={carType.id} value={carType.id}>
                    {carType.seat}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>License Plate</label>
            <input
              type="text"
              placeholder="e.g ABC1234"
              required
              value={carForm.licensePlate}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) =>
                setCarForm({ ...carForm, licensePlate: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Price ({currency})</label>
            <input
              type="number"
              placeholder="e.g 50, 100..."
              required
              value={carForm.pricePerDay}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) =>
                setCarForm({ ...carForm, pricePerDay: e.target.value })
              }
            />
          </div>
        </div>
        {/* car location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            name="location"
            id="location"
            value={carForm.locationId}
            onChange={(e) =>
              setCarForm({ ...carForm, locationId: e.target.value })
            }
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
          >
            <option value="">Select Location</option>
            {locationData.map((location) => (
              <option key={location.id} value={location.id}>
                {location.district}, {location.city}, {location.country}
              </option>
            ))}
          </select>
        </div>
        {/* features */}
        <div className="flex flex-col w-full">
          <label>Features</label>
          <input
            type="text"
            placeholder="e.g Sunroof, Leather seats..."
            required
            value={carForm.features}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
            onChange={(e) =>
              setCarForm({ ...carForm, features: e.target.value })
            }
          />
        </div>
        {/* car description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="Describe your car, its features, and any other relevant details..."
            required
            value={carForm.description}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary "
            onChange={(e) =>
              setCarForm({ ...carForm, description: e.target.value })
            }
          />
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md hover:bg-primary/90 w-max font-medium cursor-pointer"
        >
          <img src={assets.tick_icon} alt="" />
          Save car
        </button>
      </form>
    </div>
  );
};

export default CarForm;
