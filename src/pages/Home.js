import React from 'react';
import {setIsOnion, setTitle, setRedditLink, setLink} from '../redux/actions/postActions';
import { connect } from 'react-redux';
const axios = require("axios");
const REQUEST_URL = "http://localhost:3000/api/posts?mode=FETCH_ARTICLE";

const Home = ({dispatch, title, redditLink, link, isOnion}) => {
    const getPost = () => {
        axios.get(REQUEST_URL)
        .then((response) => {
            if (response.data) {
                if (response.data.succ) {
                    console.log(response.data);
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
    }

    if (title === "") // make sure we start with a title!
        getPost();

    return (
        <div>
            <p>Home.</p>
            <p>{title}</p>
            <p>{redditLink}</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    title: state.postReducer.title,
    redditLink: state.postReducer.redditLink,
    link: state.postReducer.link,
    isOnion: state.postReducer.isOnion,
});

export default connect(mapStateToProps)(Home);