import "./App.css";
import { Header } from "./components/layout/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { NotFound } from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

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

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/login" component={LoginSignIn} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <Route exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/admin/dashboard" omponent={Dashboard} />
        <ProtectedRoute exact path="/admin/products" component={ProductList} />
        <ProtectedRoute exact path="/admin/product" component={NewProduct} />
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <ProtectedRoute exact path="/admin/orders" component={OrdersList} />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute exact path="/admin/users" component={UsersList} />
        <ProtectedRoute exact path="/admin/user/:id" component={UpdateUser} />
        <ProtectedRoute
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
