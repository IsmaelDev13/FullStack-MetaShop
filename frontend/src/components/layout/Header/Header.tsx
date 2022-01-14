import React from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex justify-evenly top-0 sticky z-50 bg-white border-b-2 p-8  uppercase   ">
      <Link
        className="font-bold text-lg md:text-2xl  md:font-['Open_Sans'] first-letter:uppercase lowercase"
        to="/"
      >
        MetaShop
      </Link>
      <div className="flex md:space-x-10 group my-2">
        <Link
          className="transition transform duration-200 ease-in-out hover:text-gray-800 hover:scale-105 lg:border-l-2 hover:shadow-md hover:rounded-md p-2 "
          to="/"
        >
          <h1 className="hidden lg:inline cursor-pointer">Home</h1>
        </Link>
        <Link
          to="/products"
          className="hidden lg:inline cursor-pointer  transition transform duration-200 ease-in-out hover:text-gray-800 hover:scale-105 lg:border-b-2 hover:shadow-md hover:rounded-md p-2 "
        >
          Products
        </Link>
        <Link
          className=" transition transform duration-200 ease-in-out hover:text-gray-800 hover:scale-105 lg:border-b-2 hover:shadow-md hover:rounded-md p-2 "
          to="/contact"
        >
          <h1 className="hidden lg:inline cursor-pointer ">Contact</h1>
        </Link>
        <Link
          className=" transition transform duration-200 ease-in-out hover:text-gray-800 hover:scale-105 lg:border-r-2 hover:shadow-md hover:rounded-md p-2 "
          to="/contact"
        >
          <h1 className="hidden lg:inline cursor-pointer ">About</h1>
        </Link>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-2 md:space-x-5 mr-4">
        <Link to="/login">
          <UserIcon className="h-6 w-6" />
        </Link>
        <Link to="/search">
          <SearchIcon className="h-6 w-6" />
        </Link>
        <Link to="/cart">
          <ShoppingBagIcon className="h-6 w-6 hidden md:inline" />
        </Link>
      </div>
    </div>
  );
};
