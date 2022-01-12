import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
  return (
    <div>
      <ErrorIcon />
      <Typography>Page Not Found</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};
