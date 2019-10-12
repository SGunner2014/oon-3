import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUsername, setToken, setLoggedIn} from '../redux/actions/adminActions';
const auth = require("../auth/auth");

const AdminLogin = ({dispatch, username, token, loggedIn}) => {
    const [redirect, setRedirect] = useState(false);
    let tempUsername = "";
    let tempPassword = "";

    const onPassUpdate = (e) => {
        tempPassword = e.target.value;
    };

    const onUserUpdate = (e) => {
        tempUsername = e.target.value;
    };

    const onSubmitForm = () => {
        auth.login(tempUsername, tempPassword, (result) => {
            if (result) {
                dispatch(setUsername(tempUsername));
                dispatch(setToken(result));
                dispatch(setLoggedIn(true));
                setRedirect(true);
            }
        });
    };

    if (redirect) {
        console.log("hello!");
        return (
            <Redirect to="/admin"></Redirect>
        );
    } else {
        return (
            <div className="container mt-2">
                <h1>Admin Login</h1>
                <hr/>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" required onChange={onUserUpdate}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required onChange={onPassUpdate}></input>
                    </div>
                    <button type="button" onClick={onSubmitForm} className="btn btn-large btn-primary">Login</button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
    loggedIn: state.adminReducer.loggedIn,
});

export default connect(mapStateToProps)(AdminLogin);