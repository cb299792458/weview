import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import logo from './logo.png';

function App() {

  return (
    <>
      <a href="/">
        <img src={logo} alt="WeView logo" height="50"></img>
      </a>
      {/* <h1>Welcome to WeView</h1> */}
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
