const apiReducer = (state = null, action) => {
    if (action.type === "LOADED_USERS") {
        console.log("FROM apiReducer: ", action);
        return state;
    }
    return state;
}

export default apiReducer;