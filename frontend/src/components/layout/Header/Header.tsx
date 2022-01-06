import React from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex justify-evenly top-0 sticky bg-neutral-400 p-8 ">
      <div>MetaShop</div>
      <div className="flex space-x-10">
        <h1 className="cursor-pointer font-">Home</h1>
        <Link to="/products" className="cursor-pointer">
          Products
        </Link>
        <h1 className="cursor-pointer">Contact</h1>
        <h1 className="cursor-pointer">About</h1>
      </div>

      {/* Icons */}
      <div className="flex space-x-5">
        <UserIcon className="h-6 w-6" />
        <SearchIcon className="h-6 w-6" />
        <ShoppingBagIcon className="h-6 w-6" />
      </div>
    </div>
  );
};
