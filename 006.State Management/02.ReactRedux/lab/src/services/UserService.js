const responseUsersMockData = [
    { id: "82d5c2d9-f9f1-466b-b0d6-7e40ee0f4261", name: "Admin" },
    { id: "160888bd-4142-468b-8931-73ae703b88ab", name: "User" }
]

// Thunk action creator
const getUsers = () => {
    return (dispatch, getState) => {
        console.log("FROM getUsers: ", getState());
        // return a promise which is resolved with mocked data after 2 seconds
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(responseUsersMockData);
            }, 2000);
        }).then(data => {
            const action = {
                type: "LOADED_USERS",
                payload: data
            };
            console.log("FROM getUsers: ", action);
            dispatch(action);
            return data;
        });
    }
}

export {
    getUsers
}