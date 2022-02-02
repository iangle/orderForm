import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./Home/Home";
import Success from "./Success/Success";

const Routing = () => {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Success' component={Success} />
            </Switch>
        </Router>
    )
}

export default Routing;
