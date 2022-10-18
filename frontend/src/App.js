import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import VideoPage from "./components/VideoPage";
import VideoForm from "./components/VideoForm";
import logo from './logo.png';
import hamburger from './hamburger.png';
import search from './search.png'
import DevelopmentIndex from "./components/DevelopmentIndex";
import SearchResults from "./components/SearchResults";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  let query;

  return (
    <div className="everything">
      <div id="top">
        <div id="logobox">
          <img src={hamburger} alt="" id={"hamburger"}/>
          <a href="/">
            <img src={logo} alt="WeView logo" id={"logo"}></img>
          </a>
        </div>
        <form onSubmit={()=>{history.push(`/search/query/${query}`)}}>
          <div id="search-box">

            <input name="q"
              type="search" 
              placeholder="Search" 
              id="search"
              value={query}>
            </input>

            <input type="image" className="search" src={search} alt="" height="42">
            </input>
          </div>

        </form>
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
          <DevelopmentIndex />
        </Route>
        <Route path="/search/query/:query">
          <SearchResults />
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
