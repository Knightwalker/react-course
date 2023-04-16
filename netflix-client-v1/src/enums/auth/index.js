const ENUM_REGISTER_ACTION_TYPES = {
    SET_FIELD_VALUE: 0,
    SET_FIELD_ERROR: 1,
    SET_FIELD_IS_TOUCHED: 2,
    CLEAR_FIELD_ERROR: 3,
    VALIDATE_FORM: 4,
    RESET_STATE: 5
}

const ENUM_REQUEST_STATUS = {
    hasErrors: "hasErrors",
    isCancelled: "isCancelled"
}

export {
    ENUM_REGISTER_ACTION_TYPES,
    ENUM_REQUEST_STATUS
}