import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./Home/Home";
import Submit from "./Submit/Submit";
import history from './history';

const Routing = () => {
    return(
        <Router history={history}>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/Submit' element={<Submit/>} />
            </Routes>
        </Router>
    )
}

export default Routing;
