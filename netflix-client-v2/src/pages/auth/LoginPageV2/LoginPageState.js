import { createAction, createReducer } from "@reduxjs/toolkit";

const ENUM_LOGIN_ACTION_TYPES = {
    SET_FIELD_VALUE: "SET_FIELD_VALUE",
    SET_FIELD_ERROR: "SET_FIELD_ERROR",
    SET_FIELD_IS_TOUCHED: "SET_FIELD_IS_TOUCHED",
    CLEAR_FIELD_ERROR: "CLEAR_FIELD_ERROR",
    SET_OPTIONS_IS_FORM_VALID: "SET_OPTIONS_IS_FORM_VALID",
    RESET_STATE: "RESET_STATE"
};

const initialState = {
    form: {
        fields: {
            email: {
                value: "",
                error: "",
                isTouched: false,
                className: ["LoginPage__form-input"]
            },
            password: {
                value: "",
                error: "",
                isTouched: false,
                className: ["LoginPage__form-input"]
            },
            confirmPassword: {
                value: "",
                error: "",
                isTouched: false,
                className: ["LoginPage__form-input"]
            },
        },
        options: {
            isFormValid: false,
        },
    }
};

const setFieldValueAction = createAction(ENUM_LOGIN_ACTION_TYPES.SET_FIELD_VALUE, (field, value) => {
    return {
        payload: {
            field: field,
            value: value
        }
    }
});

const setFieldIsTouchedAction = createAction(ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED, (field) => {
    return {
        payload: {
            field: field
        }
    }
});

const setFieldErrorAction = createAction(ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR, (field, error) => {
    return {
        payload: {
            field: field,
            error: error
        }
    }
});

const clearFieldErrorAction = createAction(ENUM_LOGIN_ACTION_TYPES.CLEAR_FIELD_ERROR, (field) => {
    return {
        payload: {
            field: field
        }
    }
});

const setOptionsIsFormValidAction = createAction(ENUM_LOGIN_ACTION_TYPES.SET_OPTIONS_IS_FORM_VALID, (isFormValid) => {
    return {
        payload: {
            isFormValid: isFormValid
        }
    }
});

const resetStateAction = createAction(ENUM_LOGIN_ACTION_TYPES.RESET_STATE);

const reducerState = createReducer(initialState, (builder) => {
    builder.addCase(setFieldValueAction, (state, action) => {
        const { field, value } = action.payload;
        state.form.fields[field].value = value; // immer is handling the deep-copy
    });
    builder.addCase(setFieldIsTouchedAction, (state, action) => {
        const { field } = action.payload;
        state.form.fields[field].isTouched = true;

        // Add the "was-touched" class if it's not already included
        if (!state.form.fields[field].className.includes("was-touched")) {
            state.form.fields[field].className.push("was-touched");
        }
    });
    builder.addCase(setFieldErrorAction, (state, action) => {
        const { field, error } = action.payload;
        state.form.fields[field].error = error;

        if (!state.form.fields[field].className.includes("has-error")) {
            state.form.fields[field].className.push("has-error");
        }
    });
    builder.addCase(clearFieldErrorAction, (state, action) => {
        const { field } = action.payload;
        state.form.fields[field].error = "";

        // Remove the "has-error" class if it's included
        const index = state.form.fields[field].className.indexOf("has-error");
        if (index !== -1) {
            state.form.fields[field].className.splice(index, 1);
        }
    });
    builder.addCase(setOptionsIsFormValidAction, (state, action) => {
        const { isFormValid } = action.payload;
        state.form.options.isFormValid = isFormValid;
    });
    builder.addCase(resetStateAction, (state) => {
        state = initialState;
    });
});

export {
    reducerState,
    initialState,
    setFieldValueAction,
    setFieldIsTouchedAction,
    setFieldErrorAction,
    clearFieldErrorAction,
    setOptionsIsFormValidAction,
    resetStateAction
};