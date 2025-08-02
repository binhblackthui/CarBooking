import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../contexts/AuthContext";
const NavbarOwner = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  useEffect(() => {
    console.log("User data in NavbarOwner:", user);
  }, [user]);
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="" className="h-7" />
      </Link>
      <p>
        Welcome,{" "}
        {user?.roleName === "ROLE_ADMIN" ? "Admin" : user?.fullName || "Owner"}
      </p>
    </div>
  );
};

export default NavbarOwner;
