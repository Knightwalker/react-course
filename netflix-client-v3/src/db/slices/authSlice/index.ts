// Libs
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// State
import { TRootState } from "../../store";

const initialState = {
    user: {
        email: "",
        isLoggedIn: false
    }
};

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
            localStorage.clear();
        }
    }
});

const { userLoggedInAction, userLoggedOutAction } = authSlice.actions;

const useSelectAuth = () => {
    const auth = useSelector((state: TRootState) => state.auth);
    return auth;
};

const useSelectUser = () => {
    const user = useSelector((state: TRootState) => state.auth.user);
    return user;
};

export default authSlice;
export { 
    userLoggedInAction,
    userLoggedOutAction,
    useSelectAuth,
    useSelectUser
};