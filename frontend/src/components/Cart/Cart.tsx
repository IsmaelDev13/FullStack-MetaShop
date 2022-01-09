import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCard, removeItemsFromCart } from "../../actions/cartAction";
import { CartItemCard } from "./CartItemCard";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const deleteCartItems = (id: string) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
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
            <div>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item: any) => (
                <div key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
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
                  <p>{`$${item.price * item.quantity}`}</p>
                </div>
              ))}

            <div>
              <div></div>
              <div>
                <p>Gross Total</p>
                <p>{`$${cartItems.reduce(
                  (acc: any, item: any) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div>
                <button onClick={checkoutHandler}>Check out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
