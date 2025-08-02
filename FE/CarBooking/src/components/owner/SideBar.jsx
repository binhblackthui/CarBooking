import React, { useState } from "react";

import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
const SideBar = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const location = useLocation();
  const [image, setImage] = useState("");
  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };
  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-12 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              user?.gender === "MALE"
                ? assets.male_profile
                : assets.female_profile
            }
            alt=""
            className="h-20 w-20 rounded-full object-cover cursor-pointer"
          />
        </label>
      </div>

      <p className="mt-2 text-base max-md:hidden">
        {user?.roleName === "ROLE_ADMIN" ? "Admin" : user?.fullName || "Owner"}
      </p>
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="car icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                link.path === location.pathname && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
