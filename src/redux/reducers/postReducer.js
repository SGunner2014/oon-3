const INITIAL_STATE = {
    isOnion: null,
    title: "this is a title",
    redditLink: null,
    link: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ONION":
            return {
                ...state,
                isOnion: action.isOnion,
            };
        case "SET_TITLE":
            return {
                ...state,
                title: action.title,
            };
        case "SET_REDDIT_LINK":
            return {
                ...state,
                redditLink: action.redditLink,
            };
        case "SET_LINK":
            return {
                ...state,
                link: action.link,
            };
        default:
            return state;
    }
};

export default postReducer;