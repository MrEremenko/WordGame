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
    );
};
export default hot(App);
