import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <>
      {window.location.pathname === "/process/payment" ? null : (
        <div className="h-screen flex flex-col items-center justify-center mx-auto">
          <ErrorIcon style={{ fontSize: "200px" }} />
          <h1 className="text-2xl lg:text-8xl m-10 ">Page Not Found</h1>
          <Link
            className="px-10 py-6 bg-black text-white rounded-sm shadow-md text-xl"
            to="/"
          >
            Home
          </Link>
        </div>
      )}
    </>
  );
};
