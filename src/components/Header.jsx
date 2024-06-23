import React from "react";
import { Outlet } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-solid border-b-[#283139] px-10 py-3 bg-[#15191d]">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_535)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_535">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-lg font-bold tracking-[-0.015em]">DocBot</h2>
      </div>
    </header>
  );
}

export default Header;
