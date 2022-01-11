import "./App.css";
import { Header } from "./components/layout/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Footer } from "./components/layout/Footer/Footer";
import { Home } from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import { Search } from "./components/Product/Search";
import { LoginSignIn } from "./components/User/LoginSignIn";
import store from "./store";
import React, { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import { UserOptions } from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import { Profile } from "./components/User/Profile";
import { UpdateProfile } from "./components/User/UpdateProfile";
import { UpdatePassword } from "./components/User/UpdatePassword";
import { Cart } from "./components/Cart/Cart";
import { Shipping } from "./components/Cart/Shipping";
import { ConfirmOrder } from "./components/Cart/ConfirmOrder";
import axios from "axios";
import { Payment } from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { OrderSuccess } from "./components/Cart/OrderSuccess";
import { MyOrders } from "./components/Order/MyOrders";
import { OrderDetails } from "./components/Order/OrderDetails";
import { Dashboard } from "./components/admin/Dashboard";
import { ProductList } from "./components/admin/ProductList";
import { NewProduct } from "./components/admin/NewProduct";
import { UpdateProduct } from "./components/admin/UpdateProduct";
import { OrdersList } from "./components/admin/OrdersList";
import { ProcessOrder } from "./components/admin/ProcessOrder";
import { UsersList } from "./components/admin/UserList";
import { UpdateUser } from "./components/admin/UpdateUser";
import { ProductReviews } from "./components/admin/ProductReviews";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const location = useLocation();
  const paymentLocation = location.pathname === "/process/payment";
  console.log(paymentLocation);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/account"
          element={isAuthenticated && !loading && <Profile />}
        />
        <Route
          path="/me/update"
          element={isAuthenticated && <UpdateProfile />}
        />
        <Route
          path="/password/update"
          element={isAuthenticated && <UpdatePassword />}
        />
        <Route path="/login" element={<LoginSignIn />} />
        <Route path="/cart" element={isAuthenticated && <Cart />} />
        <Route path="/shipping" element={isAuthenticated && <Shipping />} />
        <Route
          path="/order/confirm"
          element={isAuthenticated && !loading && <ConfirmOrder />}
        />
        <Route path="/success" element={isAuthenticated && <OrderSuccess />} />
        <Route path="/orders" element={isAuthenticated && <MyOrders />} />
        <Route
          path="/order/:id"
          element={isAuthenticated && <OrderDetails />}
        />
        <Route
          path="/admin/dashboard"
          element={isAuthenticated && <Dashboard />}
        />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/admin/order/:id" element={<ProcessOrder />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
        {stripeApiKey && paymentLocation && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment />
            <Link to="/process/payment" />
          </Elements>
        )}
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
