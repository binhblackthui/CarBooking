import React, { useEffect, useContext } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { carTypeService } from "../../services/carTypeService.js";
import { locationService } from "../../services/locationService.js";
import Select from "react-select";
import { CarContext } from "../../contexts/CarContext.jsx";
const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [locationData, setLocationData] = React.useState([]);
  const [carTypeData, setCarTypeData] = React.useState([]);
  const { addCar } = useContext(CarContext);

  const [carDetail, setCarDetail] = React.useState({
    brand: "",
    model: "",
    category: "",
    seat: "",
    fuelType: "",
    transmission: "",
    year: "",
  });
  const [car, setCar] = React.useState({
    carDetailId: "",

    licensePlate: "",
    pricePerDay: "",
    locationId: "",
    description: "",
    features: "",
    images: [],
  });
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Base64 image:", reader.result);
      setCar((prevCar) => ({
        ...prevCar,
        images: [{ imageURL: reader.result }],
      }));
    };
    reader.readAsDataURL(file);
  };
  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      console.log("Car details before adding:", car);
      await addCar(car);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  useEffect(() => {
    const fetchApiData = async () => {
      const locations = await locationService.getAllLocations();
      console.log(locations);
      setLocationData(locations);
      const carTypes = await carTypeService.getAllCarTypes({
        page: 0,
        size: 100,
      });
      console.log(carTypes);
      setCarTypeData(carTypes);
    };

    fetchApiData();
  }, []);
  useEffect(() => {
    console.log(carDetail);
    console.log(carTypeData);
  }, [carDetail]);
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />
      <form
        onSubmit={onSubmitHandle}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* car image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={
                car.images.length > 0
                  ? car.images[0].imageURL
                  : assets.upload_icon
              }
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              required
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
              {carTypeData.map((carType) => (
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
              {carTypeData
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
              {carTypeData
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
              {carTypeData
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
              {carTypeData
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
              {carTypeData
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
              value={car.carDetailId}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) => setCar({ ...car, carDetailId: e.target.value })}
            >
              <option value="">Select Seating Capacity</option>
              {carTypeData
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
              value={car.licensePlate}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) => setCar({ ...car, licensePlate: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Price ({currency})</label>
            <input
              type="number"
              placeholder="e.g 50, 100..."
              required
              value={car.pricePerDay}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
        </div>
        {/* car location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <Select
            options={locationData.map((location) => ({
              value: location.id,
              label: `${location.district}, ${location.city}, ${location.country}`,
            }))}
            className="mt-1"
            placeholder="Select Location"
            required
            autoFocus={false}
            openMenuOnFocus={false}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: state.isHovered ? base.primary : base.borderColor,
                boxShadow: "none",

                borderWidth: "1px",
                borderRadius: "6px",
                padding: "2px",
                color: "while",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "gray" : "white",
                color: state.isSelected ? "white" : "#6B7280",
                "&:hover": {
                  backgroundColor: !state.isSelected && "#d1d5db",
                  color: "white",
                },
              }),
              singleValue: (base) => ({
                ...base,
                color: "#6B7280", // gray-500
              }),
            }}
            onChange={(selectedOption) =>
              setCar({ ...car, locationId: selectedOption.value })
            }
          />
        </div>
        {/* features */}
        <div className="flex flex-col w-full">
          <label>Features</label>
          <input
            type="text"
            placeholder="e.g Sunroof, Leather seats..."
            required
            value={car.features}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary"
            onChange={(e) => setCar({ ...car, features: e.target.value })}
          />
        </div>
        {/* car description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="Describe your car, its features, and any other relevant details..."
            required
            value={car.description}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary "
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          />
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md hover:bg-primary/90 w-max font-medium cursor-pointer"
        >
          <img src={assets.tick_icon} alt="" />
          List your car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
