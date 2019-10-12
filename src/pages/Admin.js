import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Admin = ({dispatch, username, token}) => {
    return (
        <div className="container mt-2">
            <h1>Admin Dashboard</h1>
            <p className="text-muted">Welcome to the Admin Dashboard, {username}.</p>
            <hr/>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Moderate Posts</h5>
                            <div className="card-content">
                                <p>This allows you to moderate the posts currently in the database.</p>
                                <Link className="btn btn-md btn-primary" to="/admin/moderate">Moderate Posts >>></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    username: state.adminReducer.username,
    token: state.adminReducer.token,
});

export default connect(mapStateToProps)(Admin);