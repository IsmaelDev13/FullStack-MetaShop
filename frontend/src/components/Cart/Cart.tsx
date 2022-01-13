import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCard } from "../../actions/cartAction";
import { CartItemCard } from "./CartItemCard";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface CartProps {
  history: any;
}

export const Cart: React.FC<CartProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: any) => state.cart);

  const increaseQuantity = (id: string, quantity: number, stock: number) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCard(id, newQty));
  };

  const decreaseQuantity = (id: string, quantity: number) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCard(id, newQty));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div>
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div>
            {cartItems &&
              cartItems.map((item: any) => (
                <div
                  className="flex items-center justify-evenly shadow-sm border-2 p-10"
                  key={item.product}
                >
                  <CartItemCard item={item} />
                  <div>
                    <button
                      className="bg-black text-white px-3 hover:scale-105 transition-transform duration-150 ease-in hover:bg-gray-800"
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input
                      className="text-center border"
                      type="number"
                      readOnly
                      value={item.quantity}
                    />
                    <button
                      className="bg-black text-white px-3 hover:scale-105 transition-transform duration-150 ease-in hover:bg-gray-800"
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="font-sans italic font-medium text-lg">{`$${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div>
              <div></div>
              <div className="flex items-center p-2 space-x-6">
                <p className="font-bold">Gross Total</p>
                <p className="font-sans italic font-medium text-lg">{`$${cartItems.reduce(
                  (acc: any, item: any) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div>
                <button
                  className="bg-black text-white w-1/2 p-3 m-4 border border-white  hover:bg-gray-700 cursor-pointer "
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
