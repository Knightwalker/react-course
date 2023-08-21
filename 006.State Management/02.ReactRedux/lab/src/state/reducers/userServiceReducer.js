const userServiceReducer = (state = null, action) => {
    if (action.type === "LOADED_USERS") {
        console.log("FROM userServiceReducer: ", action);
        return state;
    }
    return state;
}

export default userServiceReducer;