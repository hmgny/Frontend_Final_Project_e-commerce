import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";
import ShopPage from "./Pages/ShopPage";
import ProductDetail from "./Pages/ProductDetail";
import ShoppingCartTable from "./Pages/ShoppingCartTable";
import OrderPage from "./Pages/OrderPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { verifyToken } from "./store/actions/authActions";
import PastOrders from "./components/PastOrders";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
