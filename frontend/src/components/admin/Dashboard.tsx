import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
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

  let totalAmount = 0;
  orders &&
    orders.forEach((item: any) => {
      totalAmount += item.totalPrice;
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
    <div className="">
      <Sidebar />
      <div className="flex-col max-w-screen-xl mx-auto">
        <h1 className="p-6 text-3xl italic font-bold">Dashboard</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-x-20">
          <div className="flex text-center  ">
            <p className="text-xl font-semibold">
              Total Amount{" "}
              <p className="my-10 bg-white border hover:border-x-black hover:border-x-2 rounded-md shadow-lg hover:bg-gray-200 px-10 py-4">
                {" "}
                ${totalAmount}{" "}
              </p>
            </p>
          </div>
          <div>
            <Link to="/admin/products">
              <p className="text-xl font-semibold border-l-2 rounded-l-md p-2 ">
                Product
              </p>
              <p className="my-10 bg-white border hover:border-l-black hover:border-l-2 rounded-md shadow-lg hover:bg-gray-200 px-10 py-4">
                {products && products.length}
              </p>
            </Link>
          </div>
          <div>
            <Link to="/admin/orders">
              <p className="text-xl font-semibold border-b-2 rounded-b-md p-2">
                Orders
              </p>
              <p className="my-10 bg-white border hover:border-b-black hover:border-b-2 rounded-md shadow-lg hover:bg-gray-200 px-10 py-4">
                {orders && orders.length}
              </p>
            </Link>
          </div>
          <div>
            <Link to="/admin/users">
              <p className="text-xl font-semibold  border-r-2 rounded-r-md p-2">
                Users
              </p>
              <p className="my-10 bg-white border hover:border-r-black hover:border-r-2 rounded-md shadow-lg hover:bg-gray-200 px-10 py-4 ">
                {users && users.length}
              </p>
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
export default Dashboard;
