import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
import VideoPage from "./components/VideoPage";
import VideoForm from "./components/VideoForm";
// import DevelopmentIndex from "./components/DevelopmentIndex";
import SearchResults from "./components/SearchResults";
import './App.css'
import TopBar from "./components/TopBar";
import HomePage from "./components/HomePage";
import LeftBar from "./components/LeftBar";

function App() {

  const [leftBar, toggleLeftBar] = useState(false);
  const toggle = () => {
    toggleLeftBar(!leftBar);
  }



  return (
    <div className="everything">
      <TopBar toggle={toggle}/>
      <div id="content">
        <div id={ leftBar ? "left" : "hide"}>
          <LeftBar />
        </div>
        <div id="right">
          <Switch>
            <Route path="/videos/new">
              <VideoForm />
            </Route>
            <Route path="/videos/:videoId">
              <VideoPage />
            </Route>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path="/search/">
              <SearchResults />
            </Route>
            <Route>
              <h1>Page Not Found</h1>
            </Route>
          </Switch>

        </div>
      </div>
      <div><h6 id="footer">WeView © 2022 Brian Lam (Click the hamburger icon in the top left for more information and affiliate links.) Thanks for visiting my site! I worked pretty hard, and I hope you enjoyed it. </h6></div>
    </div>
  );
}

export default App;
