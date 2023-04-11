import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { routesMap } from "../../../routes";
import { useLogin } from "../../../services/AuthService";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../../../common/constants";
import { emailRegEx } from "../../../common/regex";

console.log("Loaded"); // This is lazy-loaded. Dynamically.
/**
 * JSX Component for LogIn
 * 
 * @returns {JSX}
 */
const LoginPage = () => {
    const [makeRequestLogin, cancelRequestLogin] = useLogin();
    const { handleSetUser } = useContext(AuthContext);
    const navigateHook = useNavigate();
    const [learnMore, setLearnMore] = useState(false)
    const fieldValue = useRef('')

    const [state, setState] = useState({
        form: {
            fields: {
                email: "",
                password: ""
            },
            options: {
                isFormValid: false
            },
            isTouched: {
                email: false,
                password: false
            },
        }
    });

    const [error, setError] = useState({
        fields: {
            email: false,
            password: false
        },
        message: {
            email: '',
            password: ''
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setState((oldState) => {
            const newState = { ...oldState }; // shallow-copy
            newState.form.fields[name] = value;
            newState.form.isTouched[name] = true;
            return newState;
        });
    }

    const validateFields = () => {
        const emailIsValid = (() => {
            const value = state.form.fields.email.trim();
            if (value === '' || !emailRegEx.test(value)) {
                return false;
            }
            return true;
        })();
        const passwordIsValid = (() => {
            if (state.form.fields.password === '') {
                return false;
            } else if (!(state.form.fields.password.length >= PASSWORD_MIN_LENGTH && state.form.fields.password.length <= PASSWORD_MAX_LENGTH)) {
                return false;
            }
            return true;
        })();

        const isFormValid = (() => {
            if (!emailIsValid || !passwordIsValid) {
                return false;
            }
            return true;
        })();

        if (state.form.isTouched.email && !emailIsValid) {
            setError((oldError) => {
                const newError = { ...oldError };
                newError.fields.email = true;
                newError.message.email = 'Please enter a valid email.';
                return newError
            });
        } else {
            setError((oldError) => {
                const newError = { ...oldError };
                newError.fields.email = false;
                newError.message.email = '';
                return newError
            })
        }

        if (state.form.isTouched.password && !passwordIsValid) {
            setError((oldError) => {
                const newError = { ...oldError };
                newError.fields.password = true;
                newError.message.password = 'Your password must contain between 4 and 60 characters.';
                return newError;
            })
        } else {
            setError((oldError) => {
                const newError = { ...oldError };
                newError.fields.password = false;
                newError.message.password = '';
                return newError;
            })
        }

        if (isFormValid) {
            setState((oldState) => {
                const newState = { ...oldState };
                newState.form.options.isFormValid = true;
                return newState;
            });
        } else {
            setState((oldState) => {
                const newState = { ...oldState };
                newState.form.options.isFormValid = false;
                return newState;
            });
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.currentTarget;
        if (name === 'email') {
            if (value === '') {
                setError((oldError) => {
                    const newError = { ...oldError };
                    newError.fields.email = true;
                    newError.message.email = 'Please enter a valid email.';
                    return newError
                })
                setState((oldState) => {
                    const newState = { ...oldState }; // shallow-copy
                    newState.form.isTouched[name] = true;
                    return newState;
                });
            }
        } else if (name === 'password') {
            if (value === '') {
                setError((oldError) => {
                    const newError = { ...oldError };
                    newError.fields.password = true;
                    newError.message.password = 'Your password must contain between 4 and 60 characters.';
                    return newError
                })
                setState((oldState) => {
                    const newState = { ...oldState }; // shallow-copy
                    newState.form.isTouched[name] = true;
                    return newState;
                });
            }
        }
        // validateFields();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state.form.fields;

        // Step 1. Call BE
        let result = null;
        try {
            result = await makeRequestLogin(email, password);
        } catch (error) {
            if (error.message === "canceled") {
                return;
            }
        }

        // Step 2. Context
        handleSetUser(email, result.token);

        // Step 3. Navigate
        navigateHook(routesMap.movies);
    }

    // react to side-effects
    useEffect(() => {
        const timer = setTimeout(() => {
            validateFields()
        }, 2000)

        return () => clearTimeout(timer)

    }, [
        state.form.fields.email,
        state.form.fields.password
    ])

    useEffect(() => {
        return () => {
            cancelRequestLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="LoginPage">

            <div className="LoginPage__form-wrapper">
                <h1 className="LoginPage__form-wrapper-label">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className={error.fields.email ? "hasError" : null}
                            name="email"
                            type="email"
                            placeholder="Email or phone number"
                            autoComplete="username"
                            ref={fieldValue}
                            value={state.form.fields.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {error.fields.email ? <p className="error">{error.message.email}</p> : null}
                    </div>
                    <div>
                        <input
                            className={error.fields.password ? "hasError" : null}
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={state.form.fields.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {error.fields.password ? <p className="error">{error.message.password}</p> : null}
                    </div>
                    <button
                        className="LoginPage__login-btn btn btn-lg btn-danger"
                        type="submit"
                        disabled={!state.form.options.isFormValid}
                    >
                        Sign In
                    </button>
                    <div className="LoginPage__checkbox-container">
                        <div className="LoginPage__checkbox-wrapper">
                            <p><input type="checkbox" name="rememberMe" id="rememberMe-true" />Remember me</p>
                            <Link to="/loginHelp">Need help?</Link>
                        </div>
                    </div>

                    <p id="new">New to netflix? <Link to="/auth/register">Sign up now</Link>.</p>
                    <span className="g-recaptcha">This page is protected by Google reCAPTCHA to ensure you are not a bot.&nbsp;</span>
                    <span>
                        <Link
                            className="blue"
                            onClick={() => setLearnMore(true)}
                        // to="/LogInHelp"
                        >
                            Learn more.
                        </Link>
                    </span>
                    {learnMore ? <p id="recaptcha">The information collected by Google reCAPTCHA is subject to the Google <Link className="blue" to="https://policies.google.com/privacy">Privacy Policy</Link> and <Link className="blue" to="https://policies.google.com/privacy">Terms of Service</Link>, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).</p> : null}
                </form>
            </div>

        </div>
    )
}

export default LoginPage;
