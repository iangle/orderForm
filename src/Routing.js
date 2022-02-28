import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import Success from "./pages/Success/Success";
import Order from "./pages/Order/Order";

const Routing = () => {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Success' component={Success} />
                <Route exact path='/Order' component={Order}/>
            </Switch>
        </Router>
    )
}

export default Routing;
