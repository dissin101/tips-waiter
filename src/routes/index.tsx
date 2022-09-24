import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import {useAppSelector} from "../store/hooks";
import Cabinet from "../pages/Cabinet";
import Payment from "../pages/Payment";

const MainRouter = () => {

    const {isAuth} = useAppSelector((state) => state.auth)

    /*todo Fix Routes*/

    return (
        <Router>
            <Switch>
                <Route path={'/login'}>
                    <Login/>
                </Route>
                <Route path={'/registration'}>
                    <Registration/>
                </Route>
                <Route path={'/cabinet'}>
                    <Cabinet/>
                </Route>
                <Route path={'/payment'}>
                    <Payment/>
                </Route>
            </Switch>
        </Router>
    );
};

export default MainRouter;