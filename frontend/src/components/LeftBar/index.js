import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import home from '../../home.png'
function LeftBar() {


    return(
        <ul>
            <li><Link to="/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={home} alt=""></img>
                    </div>
                    <h3>Home</h3>
                </div>
            </Link></li>
            <li className="left-link"><a href="https://github.com/cb299792458/weview"><h3>GitHub</h3></a></li>
            <li className="left-link"><Link to=""><h3>LinkedIn</h3></Link></li>
            <li className="left-link"><Link to=""><h3>Snacke</h3></Link></li>
            <li className="left-link"><Link to=""><h3>Besty</h3></Link></li>
            <li className="left-link"><Link to=""><h3>Besty</h3></Link></li>
            <li className="left-link"><Link to=""><h3>Besty</h3></Link></li>
            <li className="left-link"><Link to=""><h3>HipPark</h3></Link></li>
        </ul>
    )
}

export default LeftBar;