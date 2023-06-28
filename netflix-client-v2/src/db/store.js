import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import i18nSlice from "./slices/i18nSlice/i18nSlice";
import localStorageMiddleware, { loadState } from "./middlewares/localStorageMiddleware";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        i18n: i18nSlice.reducer
    },
    preloadedState: loadState(),
    middleware: (gDM) => gDM().concat(localStorageMiddleware)
});

export default store;