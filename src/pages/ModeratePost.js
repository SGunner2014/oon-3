import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getPostDetails, changePostDetails} from '../posts/posts';

// This is a protected route that allows the user to moderate a specific post.
const ModeratePost = ({dispatch, username, token, postid}) => {
    const [post, setPost] = useState(null);
    const [redirect, setRedirect] = useState(false);

    // Now we have to register some handlers for each of the attributes of the post
    const onAttributeChange = (e, attr) => {
        let tPost = post;
        if (attr === "isOnion")
            tPost[attr] = e.target.checked;
        else
            tPost[attr] = e.target.value;
        setPost(tPost);
    };

    // This'll fetch the details for the post we want to view
    const fetchPostDetails = (token, postid) => {
        getPostDetails(postid, token, (result) => {
            if (result) {
                setPost(result.post);
            }
        });
    };

    // This'll change the attributes on the server and then redirect if successful.
    const alterPostDetails = (token, postid) => {
        changePostDetails(postid, token, post, (result) => {
            if (result) {
                setRedirect(true);
            } else {
                // TODO: display an error message to the user
            }
        });
    };

    // Check if we need to redirect
    if (redirect) {
        return (
            <Redirect to="/admin/moderate"></Redirect>
        );
    }

    // Make sure we obtain the post details before we do any rendering
    if (post === null) {
        fetchPostDetails(token, postid);
    }

    return (
        <div className="container mt-2 mb-2">
            <h1>Moderate a post</h1>
            <p className="text-muted">Post #{postid}</p>
            <hr/>
            {
                // Just make sure we're actually rendering something useful before we do it.
                post !== null && (
                    <div>
                        <form>
                            {/* List all the attributes for the post */}
                            <div className="form-group">
                                <label for="postName">Post Title</label>
                                <input className="form-control" onChange={(e) => {onAttributeChange(e, "title")}} type="text" value={post.title}/>
                            </div>
                            <div className="form-group">
                                <label for="redditLink">Reddit Link</label>
                                <input className="form-control" onChange={(e) => {onAttributeChange(e, "redditLink")}} id="redditLink" type="text" value={post.redditLink}/>
                            </div>
                            <div className="form-group">
                                <label for="link">News Link</label>
                                <input className="form-control" onChange={(e) => {onAttributeChange(e, "link")}} id="link" type="url" value={post.link}/>
                            </div>
                            <div className="form-group">
                                <label for="isOnion">Is Onion</label>
                                {
                                    post.isOnion && (
                                        <input className="form-control" onChange={(e) => {onAttributeChange(e, "isOnion")}} type="checkbox" id="isOnion" checked/>
                                    )
                                }
                                {
                                    !post.isOnion && (
                                        <input className="form-control" onChange={(e) => onAttributeChange(e, "isOnion")} type="checkbox" id="isOnion"/>
                                    )
                                }
                            </div>
                            {/* When the user clicks this button, we'll change the values on the server and then redirect */}
                            {/* We will only redirect if the changes were successful */}
                            <button type="button" className="btn btn-md btn-primary" onClick={() => alterPostDetails(token, post.id)}>Submit Changes</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

const MapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
    postid: state.moderationReducer.postid,
});

export default connect(MapStateToProps)(ModeratePost);