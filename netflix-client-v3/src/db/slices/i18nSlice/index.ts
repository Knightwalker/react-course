// Libs
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Types
import { TRootState } from "../../store";

// Local imports
import * as enText from "./en";
import * as itText from "./it";
import * as deText from "./de";
import * as frText from "./fr";

type TLanguageChangedByKeyAction = PayloadAction<{
    key: "EN" | "IT" | "DE" | "FR"
}>

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
        languageChangedByKey: (state, action: TLanguageChangedByKeyAction) => {
            const { key } = action.payload;
            state.selectedLanguage = key;
            state.text = text[key];
        }
    } 
});

const { languageChangedByKey } = i18nSlice.actions;

const useSelectLanguage = () => {
    const selectedLanguage = useSelector((state: TRootState) => state.i18n.selectedLanguage);
    return selectedLanguage;
};

const useSelectText = () => {
    const text = useSelector((state: TRootState) => state.i18n.text);
    return text;
};

export default i18nSlice;
export { 
    languageChangedByKey,
    useSelectLanguage,
    useSelectText
};