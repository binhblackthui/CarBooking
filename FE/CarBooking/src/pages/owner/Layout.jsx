import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/owner/SideBar";
import NavbarOwner from "../../components/owner/NavbarOwner";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
