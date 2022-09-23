import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const MainRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/login'}>
                    <Login />
                </Route>
                <Route path={'/registration'}>
                    <Registration />
                </Route>
            </Switch>
        </Router>
    );
};

export default MainRouter;