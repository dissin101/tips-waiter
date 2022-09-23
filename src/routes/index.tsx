import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import {useAppSelector} from "../store/hooks";

const MainRouter = () => {

    const {isAuth} = useAppSelector((state) => state.auth)

    return (
        <Router>
            {!isAuth ?
                <Switch>
                  <Route path={'/login'}>
                    <Login/>
                  </Route>
                  <Route path={'/registration'}>
                    <Registration/>
                  </Route>
                </Switch>
                :
                <Switch>

                </Switch>
            }
        </Router>
    );
};

export default MainRouter;