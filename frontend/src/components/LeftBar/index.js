import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import home from '../../home.png'
import game from '../../game.png'
import music from '../../music.png'
import pokeball from '../../pokeball.png'
import tent from '../../tent.png'
import github from '../../github.png'
import linkedin from '../../linkedin.png'
import kelp from '../../kelp.png'
import camera from '../../camera.png'
import paint from '../../paint.png'
import amazon from '../../amazon.png'
import stack from '../../stack.png'
import angel from '../../angel.png'
import t from '../../t.png'
import table from '../../table.png'
import facebook from '../../facebook.jpg'
import discord from '../../discord.png'

function LeftBar() {

    return(
        <ul>
        <li><Link to="/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={home} alt="" class="icon"></img>
                    </div>
                    <h3>Home</h3>
                </div>
            </Link></li>
            <li><a href="https://www.linkedin.com/in/brian-lam-962ba833/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={linkedin} alt=""></img>
                    </div>
                    <h3>My LinkedIn</h3>
                </div>
            </a></li>
            <li><a href="https://github.com/cb299792458">
                <div className="left-link">
                    <div id="left-img">
                        <img src={github} alt=""></img>
                    </div>
                    <h3>My GitHub</h3>
                </div>
            </a></li>
            <li><a href="https://angel.co/u/brian-lam-29">
                <div className="left-link">
                    <div id="left-img">
                        <img src={angel} alt=""></img>
                    </div>
                    <h3>My AngelList</h3>
                </div>
            </a></li>
            <li><a href="https://github.com/cb299792458/weview">
                <div className="left-link">
                    <div id="left-img">
                        <img src={github} alt=""></img>
                    </div>
                    <h3>This Repo</h3>
                </div>
            </a></li>
            <li><a href="https://spotifreeaa22.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={music} alt=""></img>
                    </div>
                    <h3>Spotifree</h3>
                </div>
            </a></li>
            <li><a href="https://besty-2022.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={pokeball} alt=""></img>
                    </div>
                    <h3>Besty</h3>
                </div>
            </a></li>
            <li><a href="https://heroku-hippark.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={tent} alt=""></img>
                    </div>
                    <h3>Hip Park</h3>
                </div>
            </a></li>
            <li><a href="https://wavesense.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={music} alt=""></img>
                    </div>
                    <h3>Wavesense</h3>
                </div>
            </a></li>
            <li><a href="https://heroku-kelp-1.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={kelp} alt=""></img>
                    </div>
                    <h3>Kelp</h3>
                </div>
            </a></li>
            <li><a href="https://paintbunny.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={paint} alt=""></img>
                    </div>
                    <h3>Paint Bunny</h3>
                </div>
            </a></li>
            <li><a href="https://momentcaptur.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={camera} alt=""></img>
                    </div>
                    <h3>Moment Captur</h3>
                </div>
            </a></li>
            <li><a href="https://paymazone.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={amazon} alt=""></img>
                    </div>
                    <h3>Paymazone</h3>
                </div>
            </a></li>
            <li><a href="https://syntax-error-fs.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={stack} alt=""></img>
                    </div>
                    <h3>Syntax Error</h3>
                </div>
            </a></li>
            <li><a href="https://fishcord.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={discord} alt=""></img>
                    </div>
                    <h3>Fishcord</h3>
                </div>
            </a></li>
            <li><a href="https://onlyfriends24.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={facebook} alt=""></img>
                    </div>
                    <h3>OnlyFriends</h3>
                </div>
            </a></li>
            <li><a href="https://trnkt-2022.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={t} alt=""></img>
                    </div>
                    <h3>Trnkt</h3>
                </div>
            </a></li>
            <li><a href="https://eatingeasy.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={table} alt=""></img>
                    </div>
                    <h3>Eating Easy</h3>
                </div>
            </a></li>
            <li><a href="https://ryamazon.herokuapp.com/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={amazon} alt=""></img>
                    </div>
                    <h3>Ryamazon</h3>
                </div>
            </a></li>
            <li><a href="https://cb299792458.github.io/snacke/">
                <div className="left-link">
                    <div id="left-img">
                        <img src={game} alt=""></img>
                    </div>
                    <h3>Snacke</h3>
                </div>
            </a></li>

        </ul>
    )
}

export default LeftBar;