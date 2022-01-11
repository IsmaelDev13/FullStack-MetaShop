import React, { Fragment, useEffect, useState } from "react";
import { CheckoutSteps } from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Metadata } from "../layout/Metadata";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
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

interface ConfirmOrderProps {}

export const ProcessOrder: React.FC<ConfirmOrderProps> = ({}) => {
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
          <div>
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <Typography>Shipping Info</Typography>
                <div>
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div>
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
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
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div>
                  <div>
                    <p>{order.orderStatus && order.orderStatus}</p>
                  </div>
                </div>
              </div>
              <div>
                <Typography>Your Cart Items:</Typography>
                <div>
                  {order.orderItems &&
                    order.orderItems.map((item: any) => (
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
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                onSubmit={updateOrderSubmitHandler}
                encType="multipart/form-data"
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}
                    {order.orderStatus === "Shipped" && (
                      <option value="delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  type="submit"
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
