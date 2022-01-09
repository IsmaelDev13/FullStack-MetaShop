import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  item: {
    product: string;
    price: number;
    name: string;
    image: string;
  };
  deleteCartItems: any;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  deleteCartItems,
}) => {
  return (
    <div className="flex ">
      <img src={item.image} alt="" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
        <p
          className="text-3xl font-bold"
          onClick={() => deleteCartItems(item.product)}
        >
          Remove
        </p>
      </div>
    </div>
  );
};
