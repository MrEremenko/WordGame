import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Captcha from "./Captcha"
import Game from "./Game"
import AboutUs from "./AboutUs"
import Home from "./Home"

const NavBar = props => {
    const [] = useState([])

    useEffect(() => {
    }, [])

    return (
    <div className="">
        <div className="header">
            <h1> Word Game </h1>
         </div>
      <div>
        <Router>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/game">Game</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/test3">Test 3</Link>
              </li>
            </ul>
            <hr />
               <Switch>
                 <Route exact path="/">
                   <Redirect to="/home"/>
                 </Route>
                 <Route exact path="/home" component={Home}/>
                 <Route exact path="/game" component={Game}/>
                 <Route exact path="/about" component={AboutUs}/>
               </Switch>
       </Router>
     </div>
    </div>
    )
}

export default NavBar