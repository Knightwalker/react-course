import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import authSlice from "./slices/authSlice";
import i18nSlice from "./slices/i18nSlice";
import localStorageMiddleware, { loadState } from "./middlewares/localStorageMiddleware";
import coreApi from "../services/api/coreApi";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [i18nSlice.name]: i18nSlice.reducer,
    [coreApi.reducerPath]: coreApi.reducer
});

const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
    middleware: (gDM) => gDM().concat([localStorageMiddleware, coreApi.middleware])
});

export default store;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch: () => TAppDispatch = useDispatch;