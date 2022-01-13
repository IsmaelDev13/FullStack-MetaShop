import React from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex justify-evenly top-0 sticky z-50 bg-white border-b-2 p-8 font-sans uppercase   ">
      <Link className="font-bold text-sm md:text-base md:font-semibold" to="/">
        MetaShop
      </Link>
      <div className="flex md:space-x-10">
        <Link to="/">
          <h1 className="hidden lg:inline cursor-pointer transition transform duration-200 ease-in-out hover:text-gray-800 ">
            Home
          </h1>
        </Link>
        <Link to="/products" className="hidden lg:inline cursor-pointer">
          Products
        </Link>
        <h1 className="hidden lg:inline cursor-pointer ">Contact</h1>
        <h1 className="hidden lg:inline cursor-pointer ">About</h1>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-2 md:space-x-5 mr-4">
        <Link to="/login">
          <UserIcon className="h-6 w-6" />
        </Link>
        <Link to="/search">
          <SearchIcon className="h-6 w-6" />
        </Link>
        <ShoppingBagIcon className="h-6 w-6 hidden md:inline" />
      </div>
    </div>
  );
};
