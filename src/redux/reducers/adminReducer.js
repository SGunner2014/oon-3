const INITIAL_STATE = {
    username: "",
    token: "",
    loggedIn: false,
};

const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                username: action.username,
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            };
        case "SET_LOGGEDIN":
            return {
                ...state,
                loggedIn: action.loggedIn,
            };
        default:
            return state;
    }
};

export default adminReducer;