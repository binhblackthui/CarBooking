import React from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [image, setImage] = React.useState(null);
  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    year: "",
    category: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    location: "",
    pricePerDay: "",
    description: "",
  });
  const onSubmitHandle = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
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
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        {/* car brand & model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g BMW, Mercedes, Audi..."
              required
              value={car.brand}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g X5, A4, C-Class..."
              required
              value={car.model}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>
        {/* car year, price, category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="e.g 2020, 2021..."
              required
              value={car.year}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Price ({currency})</label>
            <input
              type="number"
              placeholder="e.g 50, 100..."
              required
              value={car.pricePerDay}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              required
              value={car.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>
        </div>
        {/* car transmission, fuel type, seating capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              required
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              required
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="e.g 4, 5, 7..."
              required
              value={car.seating_capacity}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>
        {/* car location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g New York, Los Angeles..."
            required
            value={car.location}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            onChange={(e) => setCar({ ...car, location: e.target.value })}
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
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none "
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          />
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md hover:bg-primary/90 w-max font-medium cursor-pointer"
          onClick={onSubmitHandle}
        >
          <img src={assets.tick_icon} alt="" />
          List your car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
