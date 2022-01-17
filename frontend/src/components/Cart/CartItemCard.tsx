import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemsFromCart } from "../../actions/cartAction";

interface CartItemCardProps {
  item: {
    product: string;
    price: number;
    name: string;
    image: string;
  };
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const deleteCartItems = (id: string) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <div className="flex border rounded-sm p-4 relative">
      <img className="h-52 w-52 object-contain" src={item.image} alt="" />
      <div>
        <Link to={`/product/${item.product}`} className="uppercase overline ">
          {item.name}
        </Link>
        <span className="font-sans italic font-medium text-lg px-2">{` $ ${item.price}`}</span>
        <h2
          className="text-sm text-gray-400 cursor-pointer bottom-4 absolute "
          onClick={() => deleteCartItems(item.product)}
        >
          Remove from Cart
        </h2>
      </div>
    </div>
  );
};
