import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import {useAppSelector} from "../store/hooks";

const MainRouter = () => {

    const {isAuth} = useAppSelector((state) => state.auth)

    /*todo Fix Routes*/
    console.log(isAuth)

    return (
        <Router>
            {!isAuth ?
                <Switch>
                    {/*<Redirect to={'/login'}/>*/}
                    <Route path={'/login'}>
                        <Login/>
                    </Route>
                    <Route path={'/registration'}>
                        <Registration/>
                    </Route>
                </Switch>
                :
                <Switch>
                    {/*<Redirect to={'/cabinet'}/>*/}
                    <Route path={'/cabinet'}>
                        Cabinet
                    </Route>
                </Switch>
            }
        </Router>
    );
};

export default MainRouter;