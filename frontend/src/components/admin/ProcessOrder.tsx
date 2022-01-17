/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Sidebar } from "./Sidebar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderContants";


export const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const { order, loading, error } = useSelector(
    (state: any) => state.orderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state: any) => state.order
  );

  const updateOrderSubmitHandler = (e: any) => {
    e.preventDefault();

    const myForm: any = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);
  return (
    <Fragment>
      <Metadata title="Process Order" />
      <div>
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="h-screen">
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="flex flex-col space-y-5  md:flex-row justify-evenly">
                <h1 className="text-xl font-bold italic">Shipping Info</h1>
                <div className="flex  items-center justify-evenly space-x-4 p-4 lg:p-12 border-2 rounded-lg shadow-md ">
                  <div>
                    <p className="text-lg font-semibold uppercase">Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold uppercase">Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold uppercase">Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <h1 className="text-xl font-bold italic">Payment</h1>
                <div className="flex flex-col items-center justify-center px-8 rounded-md border-2 shadow-md">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "text-green-600 font-semibold text-lg"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : " NOT PAID"}
                    </p>
                  </div>
                  <div className="pl-2">
                    <p className="text-lg font-semibold uppercase">Amount:</p>
                    <span className="tracking-wider font-medium">
                      ${order.totalPrice && order.totalPrice}
                    </span>
                  </div>
                </div>
                <h1 className="text-xl font-bold italic">Order Status</h1>
                <div>
                  <div>
                    <p className="font-semibold tracking-wide">
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-2 rounded-md border-2 space-x-4 bg-gray-50">
                <h1 className="text-xl font-bold italic">Your Cart Items:</h1>
                <div className="flex overflow-x-scroll scrollbar-hide">
                  {order.orderItems &&
                    order.orderItems.map((item: any) => (
                      <div key={item.product}>
                        <img
                          className="h-40 w-40 object-cover"
                          src={item.image}
                          alt=""
                        />
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
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl "
                onSubmit={updateOrderSubmitHandler}
                encType="multipart/form-data"
              >
                <h1 className="font-semibold tracking-wider text-lg">
                  Process Order
                </h1>

                <div>
                  <AccountTreeIcon className="mx-4" />
                  <select
                    className="cursor-pointer appearance-none"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}
                    {order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  type="submit"
                  color="success"
                  size="large"
                  variant="contained"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Process Product
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
