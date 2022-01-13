import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

interface ProductProps {
  product: {
    name: string;
    images: { url: string }[];
    price: string;
    _id: string;
    ratings: number;
    numOfReviews: number;
    category: string;
  };
}

export const ProductCard: React.FC<ProductProps> = ({ product }) => {
  // const options: any = {
  //   size: "large",
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  return (
    <div className="flex flex-col  m-10   bg-white border hover:border-black ">
      <Link to={`/product/${product._id}`}>
        <div className="relative  group">
          <img
            className="h-full w-full object-cover"
            src={product.images[0].url}
            alt={product.name}
          />

          <div className="w-1/4  bg-white transform duration-200 ease-in group-hover:-translate-y-10 hover: border">
            <h4 className="font-mono">{`$${product.price}`}</h4>
          </div>
          <div>
            {/* <Rating {...options} /> */}
            <span className="absolute bottom-3 right-3 text-xs text-gray-600">
              {product.numOfReviews > 0 ? product.numOfReviews : "No"} Reviews
            </span>
          </div>
          <p className="text-lg">{product.name}</p>
          <p className=" text-xs italic text-gray-400">{product.category}</p>
        </div>
      </Link>
    </div>
  );
};
