import React, {useState} from 'react';
import {connect} from 'react-redux';

const ModeratePost = ({dispatch, username, token, post}) => {
    return (
        <div className="container mt-2 mb-2">
            <h1>Moderate a post</h1>
            <hr/>
            <Form>
                <div className="form-group">
                    <label for="postName"></label>
                </div>
            </Form>
        </div>
    );
};

const MapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
    post: state.moderationReducer.post,
});

export default connect(MapStateToProps)(ModeratePost);