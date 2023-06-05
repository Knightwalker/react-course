import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { postRegister } from "../services/AuthService";

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
    },
    extraReducers: (builder) => {
        builder.addCase(postRegister.fulfilled, (state, action) => {
            return action.payload;
        });
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