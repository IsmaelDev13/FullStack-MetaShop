import React, { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface OrderSuccessProps {}

export const OrderSuccess: React.FC<OrderSuccessProps> = () => {
  return (
    <Fragment>
      <CheckCircleIcon />
      <Typography>Your order has been Placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </Fragment>
  );
};
