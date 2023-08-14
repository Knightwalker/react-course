import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import i18nSlice from "./slices/i18nSlice/i18nSlice";
import localStorageMiddleware, { loadState } from "./middlewares/localStorageMiddleware";
import coreApi from "../services/api/coreApi";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [i18nSlice.name]: i18nSlice.reducer,
        [coreApi.reducerPath]: coreApi.reducer
    },
    preloadedState: loadState(),
    middleware: (gDM) => gDM().concat([localStorageMiddleware, coreApi.middleware])
});

export default store;