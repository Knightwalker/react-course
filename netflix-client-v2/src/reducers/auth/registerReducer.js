import { ENUM_REGISTER_ACTION_TYPES } from "../../enums/auth";

const registerInitialState = {
    form: {
        fields: {
            email: {
                value: "",
                error: "",
                isTouched: false,
                className: ["RegisterPage__form-input"]
            },
            password: {
                value: "",
                error: "",
                isTouched: false,
                className: ["RegisterPage__form-input"]
            },
            confirmPassword: {
                value: "",
                error: "",
                isTouched: false,
                className: ["RegisterPage__form-input"]
            },
        },
        options: {
            isFormValid: false,
        },
    }
};

const registerReducer = (oldState, action) => {
    if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE) {
        const { name, value } = action.payload;
        const newState = JSON.parse(JSON.stringify(oldState)); // deep-copy
        newState.form.fields[name].value = value;
        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR) {
        const { field, error } = action.payload;
        const newState = JSON.parse(JSON.stringify(oldState)); // deep-copy
        newState.form.fields[field].error = error;

        // Add the "has-error" class if it's not already included
        newState.form.fields[field].className = newState.form.fields[field].className.includes("has-error")
            ? newState.form.fields[field].className
            : [...newState.form.fields[field].className, "has-error"];

        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED) {
        const { field } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.fields[field].isTouched = true;

        // Add the "was-touched" class if it's not already included
        newState.form.fields[field].className = newState.form.fields[field].className.includes("was-touched")
            ? newState.form.fields[field].className
            : [...newState.form.fields[field].className, "was-touched"];

        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.CLEAR_FIELD_ERROR) {
        const { field } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.fields[field].error = "";

        // Remove the "has-error" class if it's included
        newState.form.fields[field].className = newState.form.fields[field].className.filter(
            className => className !== "has-error"
        );

        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.VALIDATE_FORM) {
        const { isFormValid } = action.payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.options.isFormValid = isFormValid;
        return newState;
    } else if (action.type === ENUM_REGISTER_ACTION_TYPES.RESET_STATE) {
        return JSON.parse(JSON.stringify(registerInitialState));
    } else {
        return oldState;
    }
};

export {
    registerReducer,
    registerInitialState
};