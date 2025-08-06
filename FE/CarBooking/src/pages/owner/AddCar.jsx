import React from "react";
import Title from "../../components/owner/Title";
import { CarContext } from "../../contexts/CarContext.jsx";
import CarForm from "../../components/CarForm.jsx";
import Loader from "../../components/Loader.jsx";
const AddCar = () => {
  const { loading } = React.useContext(CarContext);
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title
            title="Add New Car"
            subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
          />
          <CarForm car={null} />
        </>
      )}
    </div>
  );
};

export default AddCar;
