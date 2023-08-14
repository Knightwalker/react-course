// Libs
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Local imports
import * as enText from "./en";
import * as itText from "./it";
import * as deText from "./de";
import * as frText from "./fr";

const text = {
    EN: { ...enText },
    IT: { ...itText },
    DE: { ...deText },
    FR: { ...frText }
};

const initialState = {
    selectedLanguage: "EN",
    text: text["EN"]
};

const i18nSlice = createSlice({
    name: "i18n",
    initialState: initialState,
    reducers: {
        languageChangedByKey: (state, action) => {
            const { key } = action.payload;
            state.selectedLanguage = key;
            state.text = text[key];
        }
    } 
});

const { languageChangedByKey } = i18nSlice.actions;

const useSelectLanguage = () => {
    const selectedLanguage = useSelector(state => state.i18n.selectedLanguage);
    return selectedLanguage;
};

const useSelectText = () => {
    const text = useSelector(state => state.i18n.text);
    return text;
};

export default i18nSlice;
export { 
    languageChangedByKey,
    useSelectLanguage,
    useSelectText
};