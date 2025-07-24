import React, { useState } from "react";

import Loader from "../components/Loader.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/owner/Title";

import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
const Login = () => {
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 ">
      <div className="flex bg-white border border-borderColor rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="w-full hidden md:flex md:w-1/2 relative ">
          <img
            src={assets.car_image2}
            alt=""
            className="h-full w-full inset-0 absolute object-cover object-center"
          />
          <div className="absolute bottom-8 left-8 text-white z-10">
            <Title
              title="Welcome to CarBooking"
              subTitle="Experience the best car rental service with premium vehicles and
              excellent customer support."
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col  justify-center overflow-y-auto ">
          {loading ? (
            <Loader />
          ) : state === "login" ? (
            <LoginForm setState={setState} />
          ) : (
            <RegisterForm setState={setState} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
