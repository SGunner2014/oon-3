import React from 'react';
import {setIsOnion, setTitle, setRedditLink, setLink} from '../redux/actions/postActions';
import { connect } from 'react-redux';
import {WonPrompt, LostPrompt} from './components/prompts';
const axios = require("axios");
const REQUEST_URL = "http://localhost:8080/api/user?mode=FETCH_ARTICLE";

const Home = ({dispatch, title, redditLink, link, isOnion}) => {
    const [score, setScore] = React.useState(0);
    const [hasWon, setHasWon] = React.useState(false);
    const [hasLost, setHasLost] = React.useState(false);

    // Retrieves a new post from the database
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
        if (hasWon || hasLost) {
            setHasWon(false);
            setHasLost(false);
        }
    }

    // Called when the not onion button is clicked
    const notOnion = () => {
        console.log("got here");
        handleResult(false);
    };

    // Called when the onion button is clicked
    const onion = () => {
        handleResult(true);
    };

    // Called to handle the result of a click in a nice package
    const handleResult = (click) => {
        if ((click && isOnion) || (!click && !isOnion)) {
            setHasWon(true);
            setScore(score + 1);
        } else {
            setHasLost(true);
        }
    };

    if (title === "") // make sure we start with a title!
        getPost();

    return (
        <div className="container">
            <h3>Your score so far: {score}</h3>
            <hr/>
            <h1 className="mt-4">{title}</h1>
            <hr/>
            <div className="row">
                <div className="col-md-6">
                    <button className="mr-auto btn btn-lg btn-success" onClick={onion}>Onion</button>
                </div>
                <div className="col-md-6">
                    <button className="ml-auto btn btn-lg btn-danger" onClick={notOnion}>Not Onion</button>
                </div>
            </div>

            {
                hasWon &&
                <WonPrompt score={score} click={getPost}/>
            }
            {
                hasLost &&
                <LostPrompt score={score} click={getPost}/>
            }
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