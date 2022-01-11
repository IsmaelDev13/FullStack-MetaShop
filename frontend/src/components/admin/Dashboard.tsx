import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.products);
  const { orders } = useSelector((state: any) => state.allOrders);
  const { users } = useSelector((state: any) => state.allUsers);
  let outOfStock = 0;

  products &&
    products.forEach((item: any) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());

    dispatch(getAllOrders());

    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState: any = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(192,72, 49)"],
        data: [0, 4000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div>
      <Sidebar />
      <div>
        <Typography component="h1">Dashboard</Typography>
        <div>
          <div>
            <p>
              Total Amount <br /> $200
            </p>
          </div>
          <div>
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
          </div>
          <div>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
          <div>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div>{/* <Line data={lineState} /> */}</div>
        <div>{/* <Doughnut data={doughnutState} /> */}</div>
      </div>{" "}
    </div>
  );
};
