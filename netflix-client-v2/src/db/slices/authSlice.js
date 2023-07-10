// Libs
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Services
import { postRegister, postLogin } from "../../services/AuthService";

const initialState = {
    user: {
        email: "",
        isLoggedIn: false
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        userLoggedInAction: (state, action) => {
            const { email } = action.payload;
            state.user.email = email;
            state.user.isLoggedIn = true;
        },
        userLoggedOutAction: (state) => {
            state.user = initialState.user;
            localStorage.clear("NetflixClone");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postRegister.fulfilled, (state, action) => {});
        builder.addCase(postLogin.fulfilled, (state, action) => {});
    }
});

const { userLoggedInAction, userLoggedOutAction } = authSlice.actions;

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
    userLoggedInAction,
    userLoggedOutAction,
    useSelectAuth,
    useSelectUser
};