import React, { Fragment } from "react";
import { CheckoutSteps } from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
        <div className="h-screen flex flex-col lg:flex-row items-center justify-evenly shadow-sm border-2 p-10">
          <div className="p-5 border-x-2 rounded-lg shadow space-y-2">
            <h1 className="text-2xl font-semibold py-2 ">Shipping Info</h1>
            <div className="space-y-6">
              <div>
                <p className="text-xl italic">Name:</p>
                <span className="text-lg ">{user.name}</span>
              </div>
              <div>
                <p className="text-xl italic">Phone:</p>
                <span className="text-lg ">{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p className="text-xl italic">Address:</p>
                <span className="text-lg ">{address}</span>
              </div>
            </div>
            <button
              onClick={() => history.push("/shipping")}
              className="tracking-wider py-2 px-4 bg-black text-white rounded-lg transition transform ease-in-out duration-200 active:scale-95"
            >
              Edit
            </button>
          </div>
          <div className="border-y shadow space-y-5 p-10">
            <h1 className="text-2xl font-semibold py-2 ">Your Cart Items:</h1>
            <div>
              {cartItems &&
                cartItems.map((item: any) => (
                  <div
                    className="flex flex-col items-center"
                    key={item.product}
                  >
                    <img
                      className="h-52 w-52 object-contain"
                      src={item.image}
                      alt=""
                    />
                    <Link
                      className="cursor-pointer text-lg hover:underline p-2 font-medium transition transform ease-in duration-400 hover:uppercase"
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center space-y-5 flex-grow w-full justify-evenly rounded-b-md border-b-2 my-2">
          <h1 className="text-2xl font-semibold py-2 ">Order Summary</h1>
          <div className="flex items-center space-x-10 ">
            <div>
              <p className="font-semibold uppercase">Subtotal:</p>
              <span>$ {subtotal}</span>
            </div>
            <div>
              <p className="font-semibold uppercase">Shipping Charges:</p>
              <span>$ {shippingCharges}</span>
            </div>
            <div>
              <p className="font-semibold uppercase">TAX:</p>
              <span>$ {tax}</span>
            </div>
          </div>
          <div>
            <p>
              <b className="font-semibold uppercase text-lg">Total:</b>
            </p>
            <span className="font-semibold uppercase text-lg ">
              $ {totalPrice}
            </span>
          </div>
          <button
            className="bg-black text-white hover:bg-gray-700 px-4 py-2 rounded-md transition-transform duration-200 ease-out hover:scale-105  "
            onClick={proceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Fragment>
  );
};
