import React from "react";
import HomePage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";


function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/signup">
          <SignupForm/>
        </Route>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
