import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        email: "",
        token: null,
        isLoggedIn: false
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            const { email, token } = action.payload;
            state.user.email = email;
            state.user.token = token;
            state.user.isLoggedIn = true;
        },
        userLoggedOut: (state) => {
            state.user.email = initialState.user.email;
            state.user.token = initialState.user.token;
            state.user.isLoggedIn = initialState.user.isLoggedIn;
        }
    }
});

const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice;
export { userLoggedIn, userLoggedOut };