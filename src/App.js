import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setIsOnion, setTitle, setRedditLink, setLink} from './redux/actions/postActions';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require("axios");
const REQUEST_URL = "http://localhost:3000/api?mode=FETCH_ARTICLE";

const App = ({dispatch, title, redditLink, link, isOnion}) => {
  const getPost = () => {
    axios.get(REQUEST_URL)
    .then((response) => {
        if (response.data) {
            if (response.data.succ) {
                let data = response.data.contents[0];
                dispatch(setIsOnion(data.isOnion));
                dispatch(setTitle(data.title));
                dispatch(setRedditLink(data.redditLink));
                dispatch(setLink(data.link));
            } else {
                console.log(response.data);
            }
        }
    })
    .catch((error) => {
        console.log(error);
    });
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
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route exact path="/admin/login" component={AdminLogin}></Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  title: state.postReducer.title,
  redditLink: state.postReducer.redditLink,
  link: state.postReducer.link,
  isOnion: state.postReducer.isOnion,
});

export default connect(mapStateToProps)(App);
