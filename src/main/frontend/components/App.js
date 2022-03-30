import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import "foundation-sites";
import $ from "jquery";
import { Route, BrowserRouter as Router } from "react-router-dom"

import NavBar from "./NavBar"

const App = (props) => {
    useEffect(() => {
        $(document).foundation();
    }, []);
    return (
              <Router>
                <Route path="/" component={NavBar} />
              </Router>
//        <div>
//            <noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being
//                enabled. Please enable
//                Javascript and reload this page!</h2></noscript>
//            <div id="main-content" className="container">
//                <div className="pt-2 d-flex justify-content-center gap-2">
//                    <div id="player-amount" className="btn-group" role="group" aria-label="Basic radio toggle button group">
//                        <input id="2-players-button" type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"></input>
//                        <label value="2" className="btn btn-outline-primary" htmlFor="btnradio1">2 Players</label>
//
//                        <input id="3-players-button" type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"></input>
//                        <label value="3" className="btn btn-outline-primary" htmlFor ="btnradio2">3 Players</label>
//
//                        <input id="4-players-button" type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"></input>
//                        <label value="4" className="btn btn-outline-primary" htmlFor ="btnradio3">4 Players</label>
//
//                    </div>
//                    <button id="go-button" type="button" className="btn btn-success" disabled>Go</button>
//                </div>
//                <div className="d-flex justify-content-center mt-2">
//                    <input style="width: 15vw;" type="text" id="name" className="form-control" value="" onKeyUp="storeUser()" placeholder="Your name here..."></input>
//                </div>
//                <div id="banner-area" className="pt-2 d-flex justify-content-center gap-2">
////              <div id="captcha" className="h-captcha" data-sitekey="10000000-ffff-ffff-ffff-000000000001" style="display: none"></div>
//                    <div id="captcha" className="h-captcha" data-sitekey="7965b0cd-82f8-47da-a7a6-dbd48a47f201"></div>
//                    <div id="countdown"></div>
//                </div>
//                <div id="play-area" className="container d-flex flex-column justify-content-center w-50">
//                    <div id="playerNames" className="row d-flex justify-content-around align-items-center">
//                    </div>
//                    <div id="playerGuesses" className="container d-flex">
//                    </div>
//                </div>
//                <div className="row">
//                    <div className="col-md-6">
//                        <form className="form-inline">
//                            <div className="form-group">
//                                <input type="text" id="userGuess" className="form-control" placeholder="What is your guess?"></input>
//                            </div>
//                            <button id="submitGuess" className="btn btn-default" type="submit">Send Guess</button>
//                        </form>
//                    </div>
//                </div>
//            </div>
//        </div>
    );
};
export default hot(App);
