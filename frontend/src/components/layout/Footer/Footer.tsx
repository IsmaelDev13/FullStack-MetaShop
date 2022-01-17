import React from "react";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Facebook from "@mui/icons-material/Facebook";
import GitHub from "@mui/icons-material/GitHub";

export const Footer = () => {
  return (
    <footer className="flex justify-evenly items-center bg-gray-700 text-gray-400 bottom-0 p-7">
      {/* Left */}

      {/* Mid */}
      <div className="flex flex-col items-start md:items-center md:flex-row space-x-4 text-xs space-y-2 ">
        <h1 className="text-sm hover:text-white">MetaShop</h1>
        <p className="hover:text-white">High Quality Is Our Priority</p>

        <p>Copyrights 2022 &copy;IsmaelDiaz</p>
      </div>
      {/* Right */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-x-10 space-y-2">
        <h4>Follow Us</h4>
        <a
          target="_blank"
          href="https://github.com/IsmaelDev13"
          className="px-2 flex"
          rel="noreferrer"
        >
          <GitHub className="transition transform ease-in-out duration-150 hover:scale-105 hover:text-white" />
          GitHub
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com/people/Ismael-Diaz/100070763821353/"
          className="px-2 flex"
          rel="noreferrer"
        >
          <Facebook className="transition transform ease-in-out duration-150 hover:scale-105 hover:text-white" />
          Facebook
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/ismaeldev13/"
          className="px-2 flex"
          rel="noreferrer"
        >
          <LinkedIn className="transition transform ease-in-out duration-150 hover:scale-105 hover:text-white" />
          LinkedIn
        </a>
      </div>
    </footer>
  );
};
