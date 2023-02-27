import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { handleSetUser } = useContext(AppContext);

    const [state, setState] = useState({
        form: {
            fields: {
                email: "",
                password: ""
            },
            options: {
                isValid: false
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state.form.fields;

        const payload = {
            email: email,
            password: password
        }

        console.log(payload);
        // TODO: call BE

        // Context
        handleSetUser("James Bond", payload.email);

        // Redirect
        navigate("/movies");
    }

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setState((oldState) => {
            const newState = { ...oldState }; // shallow-copy
            newState.form.fields[name] = value;
            return newState;
        });
    }

    useEffect(() => {
        const emailIsValid = (() => {
            if (state.form.fields.email.length <= 0) {
                return false;
            }
            return true;
        })();

        const passwordIsValid = (() => {
            if (state.form.fields.password.length <= 0) {
                return false;
            }
            return true;
        })();

        const isValid = (() => {
            if (emailIsValid && passwordIsValid) {
                return true;
            }
            return false;
        })();

        setState((oldState) => {
            const newState = { ...oldState };
            newState.form.options.isValid = isValid;
            return newState;
        });
    }, [
        state.form.fields.email,
        state.form.fields.password
    ]);

    return (
        <div className="LoginPage">
            <div className="LoginPage__form-wrapper">
                <h1 className="LoginPage__form-wrapper-label">Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            name="email"
                            type="text"
                            placeholder="email"
                            value={state.form.fields.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={state.form.fields.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="LoginPage__register-btn btn btn-lg btn-danger"
                        type="submit"
                        disabled={(state.form.options.isValid) ? false : true}
                    >
                        Login
                    </button>
                    <p>New to netflix? <Link to="/auth/register">Sign in now</Link>.</p>
                </form>
            </div>

        </div>
    )
}

export default LoginPage;
