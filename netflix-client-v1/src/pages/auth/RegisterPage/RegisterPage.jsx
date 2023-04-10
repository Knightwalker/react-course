import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerReducer, registerInitialState } from "../../../reducers/auth/registerReducer";
import { ENUM_REGISTER_ACTION_TYPES, ENUM_REQUEST_STATUS } from "../../../enums/auth";
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import "./RegisterPage.css";

// Services
import { usePostRegister } from "../../../services/AuthService";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [makeRequestPostRegister, cancelRequestPostRegister] = usePostRegister();
    const [registerState, registerDispatch] = useReducer(registerReducer, registerInitialState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1. Prepare data
        const payload = {
            email: registerState.form.fields.email.value,
            password: registerState.form.fields.password.value,
            confirmPassword: registerState.form.fields.confirmPassword.value
        };

        // Step 2. Send POST request to BE
        try {
            const data = await makeRequestPostRegister(payload);
            debugger;
            console.log(data);
        } catch (err) {
            if (err.message === ENUM_REQUEST_STATUS.isCancelled) {
                return;
            }
            alert("We have encountered an unknown error.");
        }
        
        // Step 3. Navigate to login
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

    useEffect(() => {
        return () => {
            debugger;
            cancelRequestPostRegister();
        }
    }, []);

    return (
        <div className="RegisterPage">
            <div className="RegisterPage__form-wrapper">
                <h1>Sign Up</h1>
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
            </div>
        </div>
    );
};

export default RegisterPage;
