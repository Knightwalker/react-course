import React, { useEffect, useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const reducer = (oldState, { type, payload }) => {
    if (type === "changeFields") {
        const { name, value } = payload;
        const newState = JSON.parse(JSON.stringify(oldState)); // deep-copy
        newState.form.fields[name] = value;
        return newState;
    } else if (type === "formValidation") {
        const { isFormValid } = payload;
        const newState = { ...oldState }; // shallow-copy
        newState.form.options.isFormValid = isFormValid;
        return newState;
    }
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isNameFieldClicked, setIsNameFieldClicked] = useState(false);
    //   const [error, setError] = useState("");
    const [state, dispatch] = useReducer(reducer, {
        form: {
            fields: {
                name: "",
                email: "",
                password: "",
                confirm_password: "",
            },
            options: {
                isFormValid: false,
            },
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1. Prepare data
        const { name, email, password } = state.form.fields;

        // Step 2. Send POST request to BE

        // Step 3. Navigate to login
        navigate("/auth/login");
    };

    const validateFields = () => {
        const nameIsValid = (() => {
            const value = state.form.fields.name;
            if (value === "") {
                return false;
            }
            return true;
        })();

        const emailIsValid = (() => {
            const value = state.form.fields.email;
            if (value === "") {
                return false;
            }
            return true;
        })();

        const passwordIsValid = (() => {
            const value = state.form.fields.password;
            if (value === "") {
                return false;
            }
            return true;
        })();

        const isConfirmPasswordValid = (() => {
            const value = state.form.fields.confirm_password;
            if (value === "" || value !== state.form.fields.password) {
                // setError("Passwords do not match");
                return false;
            }
            return true;
        })();

        const isFormValid = (() => {
            if (
                !nameIsValid ||
                !emailIsValid ||
                !passwordIsValid ||
                !isConfirmPasswordValid
            ) {
                return false;
            }
            //   setError("");
            return true;
        })();

        dispatch({
            type: "formValidation", payload: {
                isFormValid: isFormValid
            }
        });
    };

    useEffect(() => {
        validateFields();
    }, [
        state.form.fields.name,
        state.form.fields.email,
        state.form.fields.password,
        state.form.fields.confirm_password,
    ]);

    useEffect(() => { });

    return (
        <div className="RegisterPage">
            <div className="RegisterPage__form-wrapper">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="RegisterPage__form-wrapper-input"
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={state.form.fields.name}
                        onChange={(e) => {
                            const payload = {
                                name: e.currentTarget.name,
                                value: e.currentTarget.value
                            }
                            dispatch({ type: "changeFields", payload: payload });
                        }}
                        onBlur={() => setIsNameFieldClicked(true)}
                        autoComplete="username"
                    />
                    {!state.form.fields.name && isNameFieldClicked && (
                        <p className="RegisterPage__form-wrapper-error">
                            Please enter a valid name
                        </p>
                    )}
                    <input
                        className="RegisterPage__form-wrapper-input"
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={state.form.fields.email}
                        onChange={(e) => {
                            const payload = {
                                name: e.currentTarget.name,
                                value: e.currentTarget.value
                            }
                            dispatch({ type: "changeFields", payload: payload });
                        }}
                        autoComplete="username"
                    />
                    <input
                        className="RegisterPage__form-wrapper-input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={state.form.fields.password}
                        onChange={(e) => {
                            const payload = {
                                name: e.currentTarget.name,
                                value: e.currentTarget.value
                            }
                            dispatch({ type: "changeFields", payload: payload });
                        }}
                        autoComplete="current-password"
                    />
                    <input
                        className="RegisterPage__form-wrapper-input"
                        name="confirm_password"
                        type="password"
                        placeholder="Password again"
                        value={state.form.fields.confirm_password}
                        onChange={(e) => {
                            const payload = {
                                name: e.currentTarget.name,
                                value: e.currentTarget.value
                            }
                            dispatch({ type: "changeFields", payload: payload });
                        }}
                        autoComplete="current-password"
                    />
                    {/* {error && <p>{error}</p>} */}
                    <button
                        className="RegisterPage__btn"
                        disabled={!state.form.options.isFormValid}
                    >
                        Register
                    </button>

                    <div className="RegisterPage__checkbox-wrapper">
                        <div>
                            <input id="checkbox" name="checkbox" type="checkbox" required />
                            <label htmlFor="checkbox">I agree to Netflix Terms</label>
                        </div>
                        <Link to="/">Learn more.</Link>
                    </div>

                    <div className="RegisterPage__others-wrapper">
                        <p>
                            Already have an account? <Link to="/auth/login">Sign in now</Link>
                            .
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
