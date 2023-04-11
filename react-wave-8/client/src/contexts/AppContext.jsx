import { createContext, useReducer } from "react";

const AppContext = createContext({});

const ENUM_TYPES = {
    TOGGLE_THEME: 0
}

const reducer = (state, action) => {
    const {type, value} = action;

    switch (type) {
        case ENUM_TYPES.TOGGLE_THEME:
            return { ...state, theme: value };
        default:
            return state;
    }
};

const AppContextProvider = ({ children }) => {
    const [appSettings, dispatchSettings] = useReducer(reducer, {
        theme: "black",
        lang: "it",
        mode: {
            debug: true
        }
    });

    return (
        <AppContext.Provider value={{
            appSettings: appSettings,
            dispatchSettings: dispatchSettings
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
export { AppContext, ENUM_TYPES }
