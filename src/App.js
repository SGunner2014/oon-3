import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Moderate from './pages/Moderate';
import ModeratePost from './pages/ModeratePost';
import jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProtectedRoute from './routing/ProtectedRoute';
import {setUsername, setToken, setLoggedIn} from './redux/actions/adminActions';

const App = ({dispatch, loggedIn}) => {
  const logout = () => {
    dispatch(setUsername(""));
    dispatch(setToken(""));
    dispatch(setLoggedIn(false));
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">OON3</a>
        <button className="navbar-toggler" type="button" data-toggler="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Area</Link>
            </li>
          </ul>
          {loggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={logout}>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <ProtectedRoute exact path="/admin" component={Admin} loggedIn={loggedIn}></ProtectedRoute>
        <ProtectedRoute exact path="/admin/moderate" component={Moderate} loggedIn={loggedIn}></ProtectedRoute>
        <ProtectedRoute exact path="/admin/moderate/*" component={ModeratePost} loggedIn={loggedIn}></ProtectedRoute>
        <Route exact path="/admin/login" component={AdminLogin}></Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.adminReducer.loggedIn,
});

export default connect(mapStateToProps)(App);