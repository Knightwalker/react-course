// Libs
import { useEffect, useRef, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Enums
import { ENUM_SERVICE_STATUS } from "../../../services/enums";

// State Management (Global)
import { userLoggedInAction } from "../../../db/slices/authSlice";

// Utils
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import { wait } from "../../../utils/shared";

// Services
import { postLogin, postLoginErrorHandler } from "../../../services/AuthService";

// Local Imports
import {
    reducerState,
    initialState,
    setFieldValueAction,
    setFieldIsTouchedAction,
    setFieldErrorAction,
    clearFieldErrorAction,
    setOptionsIsFormValidAction,
    resetStateAction
} from "./LoginPageState";
import "./LoginPage.css";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, dispatchState] = useReducer(reducerState, initialState);
    const [postLoginStatus, setPostLoginStatus] = useState(ENUM_SERVICE_STATUS.INIT);
    const [postLoginErrorMessage, setPostLoginErrorMessage] = useState(null);
    const postLoginRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Step 1. Prepare data
        const payload = {
            email: state.form.fields.email.value,
            password: state.form.fields.password.value,
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
        dispatchState(resetStateAction());
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
            const value = state.form.fields[field].value;

            if (value.length <= 0) {
                dispatchState(setFieldErrorAction(field, "Field cannot be empty"));
            } else if (field === "email" && !isEmailValid(value)) {
                dispatchState(setFieldErrorAction(field, "Email address is not valid"));
            } else if (field === "password" && !isPasswordValid(value)) {
                dispatchState(setFieldErrorAction(field, "Password must be between 6 and 60 characters and may not contain a tilde (~)"));
            } else {
                fields[field].isValid = true;
                dispatchState(clearFieldErrorAction(field));
            }
        }

        if (
            fields.email.isValid &&
            fields.password.isValid
        ) {
            isFormValid = true;
        }

        dispatchState(setOptionsIsFormValidAction(isFormValid));
    };

    useEffect(() => {
        validateFields();
    }, [
        state.form.fields.email.value,
        state.form.fields.password.value,
        state.form.fields.confirmPassword.value
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
                            className={state.form.fields.email.className.join(" ")}
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={state.form.fields.email.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                dispatchState(setFieldValueAction(name, value));

                                if (!state.form.fields[name].isTouched) {
                                    dispatchState(setFieldIsTouchedAction(name));
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;

                                if (!state.form.fields[name].isTouched) {
                                    dispatchState(setFieldIsTouchedAction(name));
                                }
                            }}
                            autoComplete="username"
                        />
                        {state.form.fields.email.error.length > 0 && state.form.fields.email.isTouched && (
                            <p className="LoginPage__form-error">
                                {state.form.fields.email.error}
                            </p>
                        )}
                    </div>
                    <div className="LoginPage__form-input-wrapper">
                        <input
                            className={state.form.fields.password.className.join(" ")}
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={state.form.fields.password.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                dispatchState(setFieldValueAction(name, value));

                                if (!state.form.fields[name].isTouched) {
                                    dispatchState(setFieldIsTouchedAction(name));
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;

                                if (!state.form.fields[name].isTouched) {
                                    dispatchState(setFieldIsTouchedAction(name));
                                }
                            }}
                            autoComplete="current-password"
                        />
                        {state.form.fields.password.error.length > 0 && state.form.fields.password.isTouched && (
                            <p className="LoginPage__form-error">
                                {state.form.fields.password.error}
                            </p>
                        )}
                    </div>
                    <button
                        className="LoginPage__btn"
                        disabled={!state.form.options.isFormValid}
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