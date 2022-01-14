import React, { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { useHistory } from "react-router-dom";

interface BannerProps {}

export const Banner: React.FC<BannerProps> = ({}) => {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  return (
    <div className="relative">
      {open && (
        <div className="flex relative mx-auto justify-center text-center items-center  p-4 bg-gradient-to-b from-transparent to-neutral-200 drop-shadow-lg shadow-gray-400 border-b border-black ">
          <h1 className="flex break-words underline -px-10 justify-center text-sm md:text-base  tracking-wider font-sans">
            Cheap Prices: Look here for the Best Products.
          </h1>
          <CloseIcon
            onClick={() => setOpen(false)}
            className="absolute right-2 md:right-10 cursor-pointer transition transform duration-150 ease-in hover:scale-125 "
          />
        </div>
      )}
      <div className="relative">
        <img
          className="h-full drop-shadow-lg"
          loading="lazy"
          src="/cart.jpg"
          alt=""
        />
        <div className="absolute left-5 bottom-10 md:bottom-30 lg:bottom-40 lg:left-10 flex flex-col space-y-3 md:space-y-20 items-start z-20 opacity-90">
          <h1 className="font-bold tracking-wide uppercase text-4xl md:text-8xl text-white">
            Original
          </h1>
          <p className="font-medium tracking-normal text-gray-50 shadow-current md:text-white text-lg md:text-3xl ">
            "There are some things money can't buy. <br /> For everything else,
            there's MetaShop."
          </p>
          <div onClick={() => history.push("/products")}>
            <div className="relative p-4 text-black bg-white space-x-2 z-20 hover:text-red-400 ">
              <button className="font-medium tracking-wider uppercase cursor-pointer ">
                Purchase
              </button>
              <ArrowIcon />
              <div className="absolute text-transparent flex -bottom-1 -left-1 p-4 z-10  bg-transparent border-white border space-x-2 ">
                <button className="font-medium tracking-wider uppercase">
                  Purchase
                </button>
                <ArrowIcon />
              </div>
            </div>
            \
          </div>
        </div>
      </div>
      {/* <div className="border-t  border-gray-800 ">
        <img
          className="h-40 w-full md:h-96 object-cover drop-shadow-lg"
          loading="lazy"
          src="/man.jpg"
          alt=""
        />
      </div> */}
      {/* <div className="relative flex items-center  w-full border-y border-black bg-gray-900">
        <img className="w-1/2 object-cover" src="/bg.jpg" alt="" />
        <div className="w-1/2">
          <img src="/laptop.jpg" alt="" />
          <img src="/manlaptop.jpg" />
        </div>
        <div className="hidden md:inline absolute left-5 lg: bottom-5 flex-start md:space-y-2 border-2 border-white p-4 bg-transparent rounded-sm  ">
          <h1 className="font-bold text-xl lg:text-3xl tracking-tight uppercase text-white">
            Discounts
          </h1>
          <p className="font-medium text-medium lg:text-xl tracking-normal whitespace-wrap text-white">
            More discounts. More styles.
          </p>
          <p className=" font-bold text-xs md:text-sm uppercase text-white underline hover:text-black cursor-pointer">
            Laptops
          </p>
          <p className="font-bold text-xs md:text-sm uppercase text-white underline hover:text-black cursor-pointer">
            Clothes
          </p>
          <p className="font-bold text-xs md:text-sm uppercase text-white underline hover:text-black cursor-pointer">
            Toys
          </p>
        </div>
      </div> */}
    </div>
  );
};
