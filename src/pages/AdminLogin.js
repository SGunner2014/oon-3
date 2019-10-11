import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const AdminLogin = ({username, token, loggedIn}) => {
    if (loggedIn)
        return (
            <Redirect to="/admin"></Redirect>
        );
    else {
        return (
            <div className="container mt-2">
                <h1>Admin Login</h1>
                <hr/>
                <form>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" required></input>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required></input>
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    username: state.username,
    token: state.token,
    loggedIn: state.loggedIn,
});

export default connect(mapStateToProps)(AdminLogin);