import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getPostDetails, changePostDetails} from '../posts/posts';

const ModeratePost = ({dispatch, username, token, postid}) => {
    const [post, setPost] = useState({});

    // Now we have to register some handlers for each of the attributes of the post
    onAttributeChange = (e, attr) => {
        let tPost = post;
        tPost[attr] = e.target.value;
        setPost(tPost);
    };

    // This'll fetch the details for the post we want to view
    fetchPostDetails = (token, postid) => {
        getPostDetails(postid, token, (result) => {

        });
    };

    alterPostDetails = (token, postid) => {
        changePostDetails(postid, token, post, (result) => {

        });
    };

    return (
        <div className="container mt-2 mb-2">
            <h1>Moderate a post</h1>
            <p className="text-muted">Post #{postid}</p>
            <hr/>
            {
                // Just make sure we're actually rendering something useful before we do it.
                post !== {} && (
                    <div>
                        <Form>
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
                                        <input className="form-control" onChange={(e) => onAttributeChange(e, "isOnion")} type="check" id="isOnion"/>
                                    )
                                }
                            </div>
                        </Form>
                    </div>
                )
            }
        </div>
    );
};

const MapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
    postid: state.moderationReducer.post,
});

export default connect(MapStateToProps)(ModeratePost);