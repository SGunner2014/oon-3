import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}, loggedIn) => (
    <Route {...rest} render={(props) => (
        loggedIn === true
        ? <Component {...props} />
        : <Redirect to={{pathname: "/admin/login", state: {from: props.location}}}/>
    )} />
);

export default ProtectedRoute;