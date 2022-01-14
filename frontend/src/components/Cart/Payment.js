import React, { Fragment, useEffect, useRef, useState } from "react";
import { CheckoutSteps } from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useLocation, useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";

export const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "{}");
  const [showPayment, setShowPayment] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payButton = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    payButton.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payButton.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          history.push("/success");
        } else {
          alert.error("There's some issue while processing the payment");
        }
      }
    } catch (err) {
      payButton.current.disabled = false;
      alert.error(err);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <Metadata title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="flex flex-col items-center mx-auto ">
        <form
          className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl "
          onSubmit={(e) => submitHandler(e)}
        >
          <h1 className="font-bold text-3xl italic uppercase">Card Info</h1>
          <div className="flex flex-col border-2 space-y-2 border-gray-500  hover:border-black p-4 hover:shadow-md">
            <CreditCardIcon />
            <CardNumberElement />
          </div>
          <div className="flex flex-col border-2 space-y-2 border-gray-500  hover:border-black p-4 hover:shadow-md">
            <EventIcon />
            <CardExpiryElement />
          </div>
          <div className="flex flex-col border-2 space-y-2 border-gray-500  hover:border-black p-4 hover:shadow-md">
            <VpnKeyIcon />
            <CardCvcElement />
          </div>
          <input
            className="bg-white text-center rounded-md hover:scale-105 transition-transform duration-300 ease-out border border-x-4 w-full p-3 font-sans font-semibold hover:bg-gray-200 cursor-pointer "
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payButton}
          />
        </form>
      </div>
    </Fragment>
  );
};
