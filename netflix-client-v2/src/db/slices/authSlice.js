// Libs
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Services
import { postRegister, postLogin } from "../../services/AuthService";

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
            debugger;
            const { email, token } = action.payload;
            state.user.email = email;
            state.user.token = token;
            state.user.isLoggedIn = true;
        },
        userLoggedOut: (state) => {
            state.user = initialState.user;
            localStorage.clear("NetflixClone");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postRegister.fulfilled, (state, action) => {});
        builder.addCase(postLogin.fulfilled, (state, action) => {});
    }
});

const { userLoggedIn, userLoggedOut } = authSlice.actions;

const useSelectAuth = () => {
    const auth = useSelector(state => state.auth);
    return auth;
}

const useSelectUser = () => {
    const user = useSelector(state => state.auth.user);
    return user;
}

export default authSlice;
export { 
    userLoggedIn,
    userLoggedOut,
    useSelectAuth,
    useSelectUser
};