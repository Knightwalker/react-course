import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerReducer, registerInitialState } from "../../../reducers/auth/registerReducer";
import { ENUM_REGISTER_ACTION_TYPES } from "../../../enums/auth";
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import "./RegisterPage.css";

// Services
import { postRegister } from "../../../services/AuthService";
import { ENUM_SERVICE_ERROR_TYPE } from "../../../services/enums";
import { wait } from "../../../utils/shared";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerState, registerDispatch] = useReducer(registerReducer, registerInitialState);

    const registerMutationInstance = useMutation({
        mutationFn: postRegister
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1. Prepare data
        const payload = {
            email: registerState.form.fields.email.value,
            password: registerState.form.fields.password.value,
            confirmPassword: registerState.form.fields.confirmPassword.value
        };

        // Step 2. Send POST request to BE
        let hasErrors = false;
        try {
            const data = await registerMutationInstance.mutateAsync(payload);
            console.log(data);
        } catch (error) {
            debugger;
            hasErrors = true;
            // Handle specific error types or status codes
            if (error.type === ENUM_SERVICE_ERROR_TYPE.NETWORK_ERROR) {
                alert(error.message);
                // Handle network errors
            } else if (error.type === ENUM_SERVICE_ERROR_TYPE.PARSE_ERROR) {
                // Handle parse errors
                alert(error.message);
            } else if (error.type === ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE) {
                // Handle unsuccessful response errors
                if (error.status >= 400 && error.status < 500) {
                    // Handle client errors
                } else if (error.status >= 500 && error.status < 600) {
                    // Handle server errors
                } else {
                    // Handle other errors, not in (200-299)
                }
            } else {
                // Handle other unknown errors. (I'm not sure if we can ever hit such a case at this level)
                alert("We have encountered an unknown error. If this persists, please contact support.");
            }
        }
        if (hasErrors) {
            return;
        }

        // Step 3. Navigate to login
        await wait(600); // Give humans time to process that the account was created.
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
        }
        let isFormValid = false;

        for (let field in fields) {
            const value = registerState.form.fields[field].value;

            if (value.length <= 0) {
                registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Field cannot be empty."
                    }
                });
            } else if (field === "email" && !isEmailValid(value)) {
                registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Email address is not valid"
                    }
                });
            } else if (field === "password" && !isPasswordValid(value)) {
                registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Password must be between 6 and 60 characters and may not contain a tilde (~)"
                    }
                });
            } else if (field === "confirmPassword" && value !== registerState.form.fields.password.value) {
                registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Passwords do not match"
                    }
                });
            } else {
                fields[field].isValid = true;
                registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.CLEAR_FIELD_ERROR,
                    payload: {
                        field: field
                    }
                });
            }
        }

        if (
            fields.email.isValid &&
            fields.password.isValid &&
            fields.confirmPassword.isValid
        ) {
            isFormValid = true;
        }

        registerDispatch({
            type: ENUM_REGISTER_ACTION_TYPES.VALIDATE_FORM,
            payload: {
                isFormValid: isFormValid
            }
        });
    };

    useEffect(() => {
        validateFields();
    }, [
        registerState.form.fields.email.value,
        registerState.form.fields.password.value,
        registerState.form.fields.confirmPassword.value
    ]);

    return (
        <div className="RegisterPage">
            <div className="RegisterPage__form-wrapper">
                <h1>Sign Up</h1>
                {registerMutationInstance.status === "error" && (
                    <div className="RegisterPage__form-error-container">
                        {registerMutationInstance.error.message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="RegisterPage__form-input-wrapper">
                        <input
                            className="RegisterPage__form-input"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={registerState.form.fields.email.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                registerDispatch({
                                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        name: name,
                                        value: value
                                    }
                                });
                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch({
                                        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name,
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                registerDispatch({
                                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                    payload: {
                                        field: e.currentTarget.name,
                                    }
                                });
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
                            className="RegisterPage__form-input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={registerState.form.fields.password.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                registerDispatch({
                                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        name: name,
                                        value: value
                                    }
                                });
                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch({
                                        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name,
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                registerDispatch({
                                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                    payload: {
                                        field: e.currentTarget.name,
                                    }
                                });
                            }}
                            autoComplete="current-password"
                        />
                        {registerState.form.fields.password.error.length > 0 && registerState.form.fields.password.isTouched && (
                            <p className="RegisterPage__form-error">
                                {registerState.form.fields.password.error}
                            </p>
                        )}
                    </div>
                    <div className="RegisterPage__form-input-wrapper">
                        <input
                            className="RegisterPage__form-input"
                            name="confirmPassword"
                            type="password"
                            placeholder="Password again"
                            value={registerState.form.fields.confirmPassword.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                registerDispatch({
                                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        name: name,
                                        value: value
                                    }
                                });
                                if (!registerState.form.fields[name].isTouched) {
                                    registerDispatch({
                                        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name,
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                registerDispatch({
                                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                    payload: {
                                        field: e.currentTarget.name,
                                    }
                                });
                            }}
                            autoComplete="current-password"
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
                    {registerMutationInstance.status === "loading" && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                    {registerMutationInstance.status === "success" && (
                        <i className="RegisterPage__form-state-success bi bi-check-circle"></i>
                    )}
                    {registerMutationInstance.status === "error" && (
                        <i className="RegisterPage__form-state-error bi bi-exclamation-triangle"></i>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
