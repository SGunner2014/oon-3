import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../posts/posts';

const Moderate = ({username, token}) => {
    const [posts, setPosts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [beginning, setBeginning] = useState(0);

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

    const getNextPage = () => {
        if (hasNextPage) {
            getPosts(beginning + 25, token, (result) => {
                if (result) {
                    renderPosts(result.posts);
                    setHasNextPage(result.hasNext);
                    setHasPreviousPage(result.hasPrevious);
                    setBeginning(beginning + 25); // increment by 25 to get the next few posts
                }
            });
        }
    };

    const getPreviousPage = () => {
        if (hasPreviousPage) {
            getPosts(beginning - 25, token, (result) => {
                if (result) {
                    renderPosts(result.posts);
                    setHasNextPage(result.hasNextPage);
                    setHasPreviousPage(result.hasPreviousPage);
                    setBeginning(beginning - 25);
                }
            });
        }
    }

    if (posts.length === 0) {
        getPosts(beginning, token, (result) => {
            if (result) {
                renderPosts(result.posts);
                setHasNextPage(result.hasNextPage);
                setHasPreviousPage(result.hasPreviousPage);
                setBeginning(beginning);
            }
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
            <div className="row">
                <div className="col-sm-6">
                    {
                        hasPreviousPage && (
                            <button role="button" onClick={getPreviousPage} className="btn btn-sm btn-success">&lt;&lt; Previous Page</button>
                        )
                    }
                    {
                        !hasPreviousPage && (
                            <button role="button" className="btn btn-small btn-success" disabled>&lt;&lt; Previous Page</button>
                        )
                    }
                </div>
                <div className="col-sm-6">
                    {

                    }
                    <button onClick={getNextPage} className="btn btn-sm btn-success">Next Page &gt;&gt;</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
});

export default connect(mapStateToProps)(Moderate);