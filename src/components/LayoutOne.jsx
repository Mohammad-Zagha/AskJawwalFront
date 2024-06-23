import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function LayoutOne() {
  return (
    <div className="min-h-screen bg-[#15191d]">
      
      <div className="  bg-transparent   ">
    
      </div>
      <Outlet />
    </div>
  );
}

export default LayoutOne;
