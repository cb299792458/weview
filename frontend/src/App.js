import React from "react";
import { Route, Switch } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
import VideoPage from "./components/VideoPage";
import VideoForm from "./components/VideoForm";
import DevelopmentIndex from "./components/DevelopmentIndex";
import SearchResults from "./components/SearchResults";
import './App.css'
import TopBar from "./components/TopBar";

function App() {


  return (
    <div className="everything">
      <TopBar />
      <div id="content">
        <Switch>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route> */}
          <Route path="/videos/new">
            <VideoForm />
          </Route>
          <Route path="/videos/:videoId">
            <VideoPage />
          </Route>
          <Route exact path='/'>
            <DevelopmentIndex />
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
  );
}

export default App;
