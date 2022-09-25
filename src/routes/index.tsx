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

    return (
        <Router>
            <Switch>
                <Route path={'/login'}>
                    <Login/>
                </Route>
                <Route path={'/registration'}>
                    <Registration/>
                </Route>
                {isAuth &&
                <Route path={'/cabinet'}>
                  <Cabinet/>
                </Route>
                }
                <Route path={'/payment'}>
                    <Payment/>
                </Route>
                <Redirect from={"/"} to={isAuth ? '/cabinet' : '/login'}/>
            </Switch>
        </Router>
    );
};

export default MainRouter;