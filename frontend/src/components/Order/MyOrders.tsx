import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Loader } from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Metadata } from "../layout/Metadata";
import LaunchIcon from "@mui/icons-material/Launch";
import { Typography } from "@mui/material";

interface MyOrdersProps {}

export const MyOrders: React.FC<MyOrdersProps> = ({}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector(
    (state: any) => state.myOrders
  );
  const { user } = useSelector((state: any) => state.user);
  const rows: any = [];
  orders &&
    orders.forEach((item: any, index: number) => {
      rows.push({
        itemsQuantity: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params: any) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      <Metadata title={`${user.name} | Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          <Typography>{user.name} 's Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};
