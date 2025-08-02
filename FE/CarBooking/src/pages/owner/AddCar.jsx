import React from "react";
import Title from "../../components/owner/Title";

import Select from "react-select";
import { CarContext } from "../../contexts/CarContext.jsx";
import CarForm from "../../components/CarForm.jsx";
const AddCar = () => {
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />
      <CarForm car={null} />
    </div>
  );
};

export default AddCar;
