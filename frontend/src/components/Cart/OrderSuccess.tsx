import React, { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface OrderSuccessProps {}

export const OrderSuccess: React.FC<OrderSuccessProps> = () => {
  return (
    <Fragment>
      <div className="h-[50vh] flex flex-col text-center justify-center items-center space-y-10 pt-40 m-auto  rounded-md border-x-2 group">
        <CheckCircleIcon style={{ fontSize: "10vmax" }} />
        <h1 className="text-4xl">Your order has been Placed successfully</h1>
        <Link
          to="/orders"
          className="p-5 bg-white border-2 rounded-md transition-transform duration-200 ease-in-out group-hover:scale-110 hover:bg-gray-100 hover:border-black"
        >
          View Orders
        </Link>
      </div>
    </Fragment>
  );
};
