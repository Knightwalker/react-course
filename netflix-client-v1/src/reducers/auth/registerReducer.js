import { ENUM_REGISTER_ACTION_TYPES } from "../../enums/auth";

const registerInitialState = {
    form: {
        fields: {
            email: {
                value: "",
                error: "",
                isTouched: false
            },
            password: {
                value: "",
                error: "",
                isTouched: false
            },
            confirmPassword: {
                value: "",
                error: "",
                isTouched: false
            },
        },
        options: {
            isFormValid: false,
        },
    },
};

const registerReducer = (oldState, action) => {
    if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE) {
        const { name, value } = action.payload;
        const newState = JSON.parse(JSON.stringify(oldState)); // deep-copy
        newState.form.fields[name].value = value;
        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR) { 
        const { field, error } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.fields[field].error = error;
        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED) { 
        const { field } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.fields[field].isTouched = true;
        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.CLEAR_FIELD_ERROR) { 
        const { field } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.fields[field].error = "";
        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.VALIDATE_FORM) {
        const { isFormValid } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.options.isFormValid = isFormValid;
        return newState;
    } else {
        return oldState;
    }
}

export {
    registerReducer,
    registerInitialState
}