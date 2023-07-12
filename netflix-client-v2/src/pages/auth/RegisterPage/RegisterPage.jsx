// Libs
import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Enums
import { ENUM_SERVICE_STATUS } from "../../../services/enums";

// Utils
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import { wait } from "../../../utils/shared";

// Services
import { postRegister, postRegisterErrorHandler } from "../../../services/AuthService";

// Local imports
import {
    registerReducer,
    registerInitialState
} from "./RegisterPageReducer";
import { 
    setFieldValueAction, 
    setFieldIsTouchedAction, 
    setFieldErrorAction, 
    clearFieldErrorAction,
    setOptionsIsFormValidAction,
    resetStateAction
} from "./RegisterPageActions";
import "./RegisterPage.css";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [registerState, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const [postRegisterStatus, setPostRegisterStatus] = useState(ENUM_SERVICE_STATUS.INIT);
    const [postRegisterErrorMessage, setPostRegisterErrorMessage] = useState(null);
    const postRegisterRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1. Prepare data
        const payload = {
            email: registerState.form.fields.email.value,
            password: registerState.form.fields.password.value,
            confirmPassword: registerState.form.fields.confirmPassword.value
        };

        // Step 2. Send POST request to BE
        setPostRegisterStatus(ENUM_SERVICE_STATUS.LOADING);
        try {
            await wait(600); // Give humans time to process the loading.
            const actionResult = dispatch(postRegister(payload));
            postRegisterRef.current = actionResult;
            const promiseResult = await actionResult.unwrap();
            setPostRegisterStatus(ENUM_SERVICE_STATUS.SUCCESS);
            await wait(600); // Give humans time to process that the account was created.
        } catch (error) {
            if (error.name === "AbortError") {
                // Don't proceed any further. We have unmounted this component!
                return;
            }
            setPostRegisterStatus(ENUM_SERVICE_STATUS.ERROR);
            setPostRegisterErrorMessage(error.message);
            postRegisterErrorHandler(error);
            return; // If we have any errors, we would like to stop the execution flow of this function.
        } finally {
            postRegisterRef.current = null;
        }

        // Step 4. Navigate to login
        registerDispatch(resetStateAction());
        navigate("/auth/login");
    };

    const validateFields = () => {
        let fields = {
            email: {
                isValid: false
            },
            password: {
                isValid: false
            },
            confirmPassword: {
                isValid: false
            }
        };
        let isFormValid = false;

        for (const field in fields) {
            const value = registerState.form.fields[field].value;

            if (value.length <= 0) {
                registerDispatch(setFieldErrorAction(field, "Field cannot be empty"));
            } else if (field === "email" && !isEmailValid(value)) {
                registerDispatch(setFieldErrorAction(field, "Email address is not valid"));
            } else if (field === "password" && !isPasswordValid(value)) {
                registerDispatch(setFieldErrorAction(field, "Password must be between 6 and 60 characters and may not contain a tilde (~)"));  
            } else if (field === "confirmPassword" && value !== registerState.form.fields.password.value) {
                registerDispatch(setFieldErrorAction(field, "Passwords do not match"));
            } else {
                fields[field].isValid = true;
                registerDispatch(clearFieldErrorAction(field));
            }
        }

        if (
            fields.email.isValid &&
            fields.password.isValid &&
            fields.confirmPassword.isValid
        ) {
            isFormValid = true;
        }

        registerDispatch(setOptionsIsFormValidAction(isFormValid));
    };

    useEffect(() => {
        validateFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        registerState.form.fields.email.value,
        registerState.form.fields.password.value,
        registerState.form.fields.confirmPassword.value
    ]);

    // Side-effect, which pre-populates the `email` input field, based on what path we navigated from. If we navigated from the `CTAComponent` in the landing page, our email will be pre-populated. Otherwise it will be empty.
    useEffect(() => {
        if (location.state === null) {
            return;
        }
        const { email } = location.state;
        debugger;
        registerDispatch(setFieldValueAction("email", email));
    }, [location]);

    useEffect(() => {
        return () => {
            if (postRegisterRef.current) {
                postRegisterRef.current.abort();
            }
        }
    }, []);

    return (
        <div className="RegisterPage">
            <div className="RegisterPage__form-wrapper">
                <h1>Sign Up</h1>
                {postRegisterStatus === ENUM_SERVICE_STATUS.ERROR && (
                    <div className="RegisterPage__form-error-container">
                        {postRegisterErrorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="RegisterPage__form-input-wrapper">
                        <input
                            className={registerState.form.fields.email.className.join(" ")}
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={registerState.form.fields.email.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                registerDispatch(setFieldValueAction(name, value));

                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch(setFieldIsTouchedAction(name));
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;

                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch(setFieldIsTouchedAction(name));
                                }
                            }}
                            autoComplete="username"
                        />
                        {registerState.form.fields.email.error.length > 0 && registerState.form.fields.email.isTouched && (
                            <p className="RegisterPage__form-error">
                                {registerState.form.fields.email.error}
                            </p>
                        )}
                    </div>
                    <div className="RegisterPage__form-input-wrapper">
                        <input
                            className={registerState.form.fields.password.className.join(" ")}
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={registerState.form.fields.password.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                registerDispatch(setFieldValueAction(name, value));

                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch(setFieldIsTouchedAction(name));
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;

                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch(setFieldIsTouchedAction(name));
                                }
                            }}
                            autoComplete="new-password"
                        />
                        {registerState.form.fields.password.error.length > 0 && registerState.form.fields.password.isTouched && (
                            <p className="RegisterPage__form-error">
                                {registerState.form.fields.password.error}
                            </p>
                        )}
                    </div>
                    <div className="RegisterPage__form-input-wrapper">
                        <input
                            className={registerState.form.fields.confirmPassword.className.join(" ")}
                            name="confirmPassword"
                            type="password"
                            placeholder="Password again"
                            value={registerState.form.fields.confirmPassword.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                registerDispatch(setFieldValueAction(name, value));

                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch(setFieldIsTouchedAction(name));
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;

                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch(setFieldIsTouchedAction(name));
                                }
                            }}
                            autoComplete="new-password"
                        />
                        {registerState.form.fields.confirmPassword.error.length > 0 && registerState.form.fields.confirmPassword.isTouched && (
                            <p className="RegisterPage__form-error">
                                {registerState.form.fields.confirmPassword.error}
                            </p>
                        )}
                    </div>
                    <button
                        className="RegisterPage__btn"
                        disabled={!registerState.form.options.isFormValid}
                    >
                        Register
                    </button>

                    <div className="RegisterPage__checkbox-wrapper">
                        <div>
                            <input id="checkbox" name="checkbox" type="checkbox" required />
                            <label htmlFor="checkbox">I agree to Terms of Service</label>
                        </div>
                        <Link to="/">Learn more.</Link>
                    </div>

                    <div className="RegisterPage__others-wrapper">
                        <p>
                            Already have an account? <Link to="/auth/login">Sign in now</Link>.
                        </p>
                    </div>
                </form>

                <div className="RegisterPage__form-state">
                    {postRegisterStatus === ENUM_SERVICE_STATUS.LOADING && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                    {postRegisterStatus === ENUM_SERVICE_STATUS.SUCCESS && (
                        <i className="RegisterPage__form-state-success bi bi-check-circle"></i>
                    )}
                    {postRegisterStatus === ENUM_SERVICE_STATUS.ERROR && (
                        <i className="RegisterPage__form-state-error bi bi-exclamation-triangle"></i>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
