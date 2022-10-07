import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
// import LoginFormPage from "./components/LoginFormPage";
import React from "react";
// import SignUpForm from "./components/SignUpForm";
// import { Navigation } from "./components/Navigation";

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Switch>
        <Route path="/login">
          {/* <LoginFormPage /> */}
        </Route>
        <Route path="/signup">
          {/* <SignUpForm /> */}
        </Route>
      </Switch>
    </>
  );
}

export default App;
