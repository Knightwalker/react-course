// Libs
import { useEffect, useRef, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Enums
import { ENUM_SERVICE_STATUS } from "../../../services/enums";

// DB, State Management
import { userLoggedInAction } from "../../../db/slices/authSlice";

// Utils
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import { wait } from "../../../utils/shared";

// Services
import { postLogin, postLoginErrorHandler } from "../../../services/AuthService";

// Local Imports
import { loginReducer, loginInitialState } from "./LoginPageReducer";
import { ENUM_LOGIN_ACTION_TYPES } from "./LoginPageEnums";
import "./LoginPage.css";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);
    const [postLoginStatus, setPostLoginStatus] = useState(ENUM_SERVICE_STATUS.INIT);
    const [postLoginErrorMessage, setPostLoginErrorMessage] = useState(null);
    const postLoginRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Step 1. Prepare data
        const payload = {
            email: loginState.form.fields.email.value,
            password: loginState.form.fields.password.value,
        };
        
        // Step 2. Send POST request to BE
        let data = null;
        setPostLoginStatus(ENUM_SERVICE_STATUS.LOADING);
        try {
            const actionResult = dispatch(postLogin(payload));
            postLoginRef.current = actionResult;
            data = await actionResult.unwrap();
            setPostLoginStatus(ENUM_SERVICE_STATUS.SUCCESS);
        } catch (error) {
            if (error.name === "AbortError") {
                // Don't proceed any further. We have unmounted this component!
                return;
            }
            setPostLoginStatus(ENUM_SERVICE_STATUS.ERROR);
            setPostLoginErrorMessage(error.message);
            postLoginErrorHandler(error);
            return; // If we have any errors, we would like to stop the execution flow of this function.
        }
        
        // Step 3. Save user in client
        dispatch(userLoggedInAction({
            email: payload.email,
        }));
        
        // Step 4. Navigate to home module
        await wait(500);
        navigate("/browse");
    };

    const validateFields = () => {
        let fields = {
            email: {
                isValid: false
            },
            password: {
                isValid: false
            }
        };
        let isFormValid = false;

        for (const field in fields) {
            const value = loginState.form.fields[field].value;

            if (value.length <= 0) {
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Field cannot be empty."
                    }
                });
            } else if (field === "email" && !isEmailValid(value)) {
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Email address is not valid"
                    }
                });
            } else if (field === "password" && !isPasswordValid(value)) {
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Password must be between 6 and 60 characters and may not contain a tilde (~)"
                    }
                });
            } else {
                fields[field].isValid = true;
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.CLEAR_FIELD_ERROR,
                    payload: {
                        field: field
                    }
                });
            }
        }

        if (
            fields.email.isValid &&
            fields.password.isValid
        ) {
            isFormValid = true;
        }

        loginDispatch({
            type: ENUM_LOGIN_ACTION_TYPES.VALIDATE_FORM,
            payload: {
                isFormValid: isFormValid
            }
        });
    };

    useEffect(() => {
        validateFields();
    }, [
        loginState.form.fields.email.value,
        loginState.form.fields.password.value,
        loginState.form.fields.confirmPassword.value
    ]);

    return (
        <div className="LoginPage">
            <div className="LoginPage__form-wrapper">
                <h1>Sign In</h1>
                {postLoginStatus === ENUM_SERVICE_STATUS.ERROR && (
                    <div className="LoginPage__form-error-container">
                        {postLoginErrorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="LoginPage__form-input-wrapper">
                        <input
                            className={loginState.form.fields.email.className.join(" ")}
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={loginState.form.fields.email.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                loginDispatch({
                                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        field: name,
                                        value: value
                                    }
                                });
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name,
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: e.currentTarget.name,
                                        }
                                    });
                                }
                            }}
                            autoComplete="username"
                        />
                        {loginState.form.fields.email.error.length > 0 && loginState.form.fields.email.isTouched && (
                            <p className="LoginPage__form-error">
                                {loginState.form.fields.email.error}
                            </p>
                        )}
                    </div>
                    <div className="LoginPage__form-input-wrapper">
                        <input
                            className={loginState.form.fields.password.className.join(" ")}
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={loginState.form.fields.password.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                loginDispatch({
                                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        field: name,
                                        value: value
                                    }
                                });
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name,
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: e.currentTarget.name,
                                        }
                                    });
                                }
                            }}
                            autoComplete="current-password"
                        />
                        {loginState.form.fields.password.error.length > 0 && loginState.form.fields.password.isTouched && (
                            <p className="LoginPage__form-error">
                                {loginState.form.fields.password.error}
                            </p>
                        )}
                    </div>
                    <button
                        className="LoginPage__btn"
                        disabled={!loginState.form.options.isFormValid}
                    >
                        Sign In
                    </button>

                    <div className="LoginPage__checkbox-wrapper">
                        <div>
                            <input id="checkbox" name="checkbox" type="checkbox" />
                            <label htmlFor="checkbox">Remember me</label>
                        </div>
                        <Link to="/">Need help?</Link>
                    </div>

                    <div className="LoginPage__others-wrapper">
                        <p>New to netflix? <Link to="/auth/register">Sign up now</Link>.</p>
                    </div>
                </form>

                <div className="LoginPage__form-state">
                    {postLoginStatus === ENUM_SERVICE_STATUS.LOADING && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                    {postLoginStatus === ENUM_SERVICE_STATUS.SUCCESS && (
                        <i className="LoginPage__form-state-success bi bi-check-circle"></i>
                    )}
                    {postLoginStatus === ENUM_SERVICE_STATUS.ERROR && (
                        <i className="LoginPage__form-state-error bi bi-exclamation-triangle"></i>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LoginPage;