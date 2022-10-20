import React, { useState } from "react";
import Navigation from "../Navigation"
import logo from '../../logo.png';
import hamburger from '../../hamburger.png';
import search from '../../search.png'
import { useHistory } from "react-router-dom";

function TopBar(){
    const history = useHistory();
    const [query, setQuery] = useState("");
    return(

      <div id="top">
        <div id="logobox">
          <img src={hamburger} alt="" id={"hamburger"}/>
          <a href="/">
            <img src={logo} alt="WeView logo" id={"logo"}></img>
          </a>
        </div>
        <form onSubmit={()=>{history.push(`/search/`)}}>
          <div id="search-box">

            <input name="q"
              type="text" 
              placeholder="Search" 
              id="search"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}>
            </input>


            <button type="submit" id="magnifying-glass">
              <img src={search} alt="" id="search-button"></img>
            </button>

          </div>

        </form>
        <Navigation />
      </div>
    )
}
export default TopBar;