const INITIAL_STATE = {
    postid: null,
};

// Provides resources when moderating a post
const moderationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "setPostID":
            return {
                ...state,
                postid: action.posts,
            };
        default:
            return state;
    }
};

export default moderationReducer;