import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import VideoPage from "./components/VideoPage";
import VideoForm from "./components/VideoForm";
import logo from './logo.png';
import VideoIndex from "./components/VideoIndex";
// import favicon from './favicon.ico'

function App() {

  return (
    <>
      <div id="top">
        <a href="/">
          <img src={logo} alt="WeView logo" height="50"></img>
        </a>
        <div><h1>Search Bar Goes Here</h1></div>
        <Navigation />
      </div>
      
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/videos/new">
          <VideoForm />
        </Route>
        <Route path="/videos/:videoId">
          <VideoPage />
        </Route>
        <Route exact path='/'>
          <h1>Home</h1>
          <VideoIndex/>
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
