import React from "react";
import playstore from "./playstore1.png";
import appstore from "./appstore1.png";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex justify-evenly items-center bg-slate-400 bottom-0 w-full fixed h-40">
      {/* Left */}
      <div className="flex items-center space-x-5">
        <h4>Download our App</h4>
        <p>Download App for Android and IOS phones</p>
        <img className="h-14 object-cover" src={playstore} alt="" />
        <img className="h-14" src={appstore} alt="" />
      </div>
      {/* Mid */}
      <div className="flex flex-col text-xs ">
        <h1>MetaShop</h1>
        <p>High Quality Is Our Priority</p>

        <p>Copyrights 2022 &copy;IsmaelDiaz</p>
      </div>
      {/* Right */}
      <div>
        <h4>Follow Us</h4>
        <a>Instagram</a>
        <a>Facebook</a>
        <a>LinkedIn</a>
      </div>
    </footer>
  );
};
