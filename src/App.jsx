import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";
import ShopPage from "./Pages/ShopPage";
import ProductDetail from "./Pages/ProductDetail";
import ShoppingCartTable from "./Pages/ShoppingCartTable";
import OrderPage from "./Pages/OrderPage";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./store/actions/authActions";
import PastOrders from "./components/PastOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/pastOrders">
          <PastOrders />
        </ProtectedRoute>
        <ProtectedRoute path="/order">
          <OrderPage />
        </ProtectedRoute>
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetail />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/shoppingCart">
          <ShoppingCartTable />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
