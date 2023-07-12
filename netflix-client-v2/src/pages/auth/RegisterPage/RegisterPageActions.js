import { ENUM_REGISTER_ACTION_TYPES } from "./RegisterPageEnums";

const setFieldValueAction = (field, value) => {
    return {
        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
        payload: {
            field: field,
            value: value
        }
    }
}

const setFieldIsTouchedAction = (field) => {
    return {
        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
        payload: {
            field: field,
        }
    }
}

const setFieldErrorAction = (field, error) => {
    return {
        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
        payload: {
            field: field,
            error: error
        }
    }
}

const clearFieldErrorAction = (field) => {
    return {
        type: ENUM_REGISTER_ACTION_TYPES.CLEAR_FIELD_ERROR,
        payload: {
            field: field
        }
    }
}

const setOptionsIsFormValidAction = (isFormValid) => {
    return {
        type: ENUM_REGISTER_ACTION_TYPES.SET_OPTIONS_IS_FORM_VALID,
        payload: {
            isFormValid: isFormValid
        }
    }
}

const resetStateAction = () => {
    return {
        type: ENUM_REGISTER_ACTION_TYPES.RESET_STATE,
    }
}

export {
    setFieldValueAction,
    setFieldIsTouchedAction,
    setFieldErrorAction,
    clearFieldErrorAction,
    setOptionsIsFormValidAction,
    resetStateAction
}