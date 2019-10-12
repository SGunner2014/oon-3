import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../posts/posts';

const Moderate = ({username, token}) => {
    const [posts, setPosts] = useState([]);

    const renderPosts = (content) => {
        let newPosts = [];
        const rowStyle = {
            "wordWrap": "break-word",
            "minWidth": "160px",
            "maxWidth": "160px",
        };

        for (let i = 0; i < content.length; i++) {
            let cPost = content[i];
            newPosts.push(
                <tr key={i}>
                    <td style={rowStyle}>{cPost["id"]}</td>
                    <td style={rowStyle}>{cPost["title"]}</td>
                    <td style={rowStyle}>{cPost["redditLink"]}</td>
                    <td style={rowStyle}>{cPost["link"]}</td>
                    <td></td>
                </tr>
            );
        }

        setPosts(newPosts);
    };

    if (posts.length === 0) {
        getPosts(null, token, (result) => {
            if (result)
                renderPosts(result);
        });
    }

    return (
        <div className="container mt-2">
            <h1>Moderate Posts</h1>
            <p className="text-muted">Posts available for moderation:</p>
            <hr/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Reddit Link</th>
                        <th scope="col">Link</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
});

export default connect(mapStateToProps)(Moderate);