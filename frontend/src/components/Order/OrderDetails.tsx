import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { Loader } from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

interface OrderDetailsProps {}

export const OrderDetails: React.FC<OrderDetailsProps> = ({}) => {
  const { id } = useParams();
  const { order, error, loading } = useSelector(
    (state: any) => state.orderDetails
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Order Details" />
          <div className=" grid grid-cols-3 bg-gray-100 shadow-lg rounded-lg ">
            <div className="col-span-2">
              <Typography
                component="h1"
                className="text-center text-gray-400 text-sm"
              >
                Order #{order && order._id}
              </Typography>
              <h1 className="p-6 font-bold italic text-xl uppercase">
                Shipping Info
              </h1>
              <div className="flex items-center space-x-6 p-6 border-y-2 border-b-black">
                <div>
                  <p className=" font-semibold  text-lg ">Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p className=" font-semibold  text-lg ">Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p className=" font-semibold  text-lg ">Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h1 className="p-6 font-bold italic text-xl uppercase">
                Payment
              </h1>
              <div className="flex items-center space-x-6 p-6 border-y-2 border-b-black">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-600 font-semibold text-lg"
                        : "text-red-600 font-semibold text-lg"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : " NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span className="tracking-wider font-medium">
                    ${order.totalPrice && order.totalPrice}
                  </span>
                </div>
              </div>
              <h1 className="p-6 font-bold italic text-xl uppercase">
                Order Status
              </h1>
              <div>
                <div>
                  <p className=" font-semibold  text-lg px-6 pb-2">
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-sm border-2">
              <h1 className="p-6 font-bold text-lg uppercase">Order Items:</h1>
              <div className="flex-wrap whitespace-nowrap overflow-y-scroll scrollbar-hide">
                {order.orderItems &&
                  order.orderItems.map((item: any) => (
                    <div
                      className="flex  justify-center space-x-6 "
                      key={item.product}
                    >
                      <img
                        className="h-[200px] w-[200px]  object-contain "
                        src={item.image}
                        alt=""
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-2xl italic font-semibold pb-4 uppercase"
                      >
                        {item.name}
                      </Link>
                      <span className="tracking-wider font-medium">
                        {item.quantity} x $ {item.price}={" "}
                        <b>$ {item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
