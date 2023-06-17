import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import i18nSlice from "./i18nSlice/i18nSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        i18n: i18nSlice.reducer
    }
});

export default store;