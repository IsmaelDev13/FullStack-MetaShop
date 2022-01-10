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
  };
}

export const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const options: any = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link
      className="w-44 flex flex-col border border-red-200 "
      to={`/product/${product._id}`}
    >
      <img className="h-40" src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};
