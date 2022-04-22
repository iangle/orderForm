import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./pages/Home/Home";

const Routing = () => {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    )
}

export default Routing;
