import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
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
        data: [2, 10],
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
              <p>50</p>
            </Link>
          </div>
          <div>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
          </div>
          <div>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
        <div>
          <Line data={lineState} />
        </div>
        <div>
          <Doughnut data={doughnutState} />
        </div>
      </div>{" "}
    </div>
  );
};
