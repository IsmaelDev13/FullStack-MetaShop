import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

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
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link
      className="w-44 flex flex-col border border-red-200 "
      to={`/product/${product._id}`}
    >
      <img className="h-40" src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};
