import initialState from "../initialState";
import ENUM_ACTION_TYPES from "../enums";

const userReducer = (userState = initialState.user, action) => {
    if (action.type === ENUM_ACTION_TYPES.USER_LOGGED_IN) {
        const { username } = action.payload;

        return {
            ...userState,
            username: username,
            isLoggedIn: true
        }
    } else if (action.type === ENUM_ACTION_TYPES.USER_LOGGED_OUT) {
        return {
            ...userState,
            username: "",
            isLoggedIn: false
        }
    }
    return userState;
}

export default userReducer;