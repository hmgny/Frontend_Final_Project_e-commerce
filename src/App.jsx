import React from "react";
import HomePage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";
import ShopPage from "./Pages/ShopPage";
import ProductDetail from "./Pages/ProductDetail";
import ShoppingCartTable from "./Pages/ShoppingCartTable";
import OrderPage from "./Pages/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/order">
          <OrderPage />
        </Route>
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
