export const setUsername = username => ({
    type: "SET_USERNAME",
    username: username,
});

export const setToken = token => ({
    type: "SET_TOKEN",
    token: token,
});

export const setLoggedIn = loggedIn => ({
    type: "SET_LOGGEDIN",
    loggedIn: loggedIn
});