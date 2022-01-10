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

export const Payment = ({}) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "{}");
  const [showPayment, setShowPayment] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payButton = useRef(null);

  useEffect(() => {
    if (location.pathname !== "/process/payment") {
      setShowPayment(false);
    } else if (location.pathname === "/process/payment") {
      setShowPayment(true);
    }
  }, [location]);

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
          navigate("/success");
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
      {showPayment && (
        <>
          <CheckoutSteps activeStep={2} />
          <div>
            <form onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement />
              </div>
              <input
                type="submit"
                value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
                ref={payButton}
              />
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
};
