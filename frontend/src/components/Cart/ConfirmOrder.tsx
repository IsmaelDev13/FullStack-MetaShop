import React, { Fragment } from "react";
import { CheckoutSteps } from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

interface ConfirmOrderProps {
  history: any;
}

export const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.user);

  const subtotal = cartItems.reduce(
    (acc: any, item: any) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.21;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <Fragment>
      <Metadata title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div>
        <div>
          <div>
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div>
            <Typography>Your Cart Items:</Typography>
            <div>
              {cartItems &&
                cartItems.map((item: any) => (
                  <div key={item.product}>
                    <img src={item.image} alt="" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X $ {item.price} ={" "}
                      <b>$ {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>$ {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>$ {shippingCharges}</span>
              </div>
              <div>
                <p>TAX:</p>
                <span>$ {tax}</span>
              </div>
            </div>
            <div>
              <p>
                <b>Total:</b>
              </p>
              <span>$ {totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
