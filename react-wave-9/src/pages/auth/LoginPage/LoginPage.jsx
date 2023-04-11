import { useState, useEffect, useContext } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const LoginPage = () => {
  const { handleSetUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    form: {
      fields: {
        email: "",
        password: "",
      },
      options: {
        isFormValid: false,
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setState((oldState) => {
      const newState = { ...oldState }; // shallow-copy
      newState.form.fields[name] = value;
      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1. Prepare data
    const { email, password } = state.form.fields;

    // Step 2. Call BE

    // Step 3. Context
    handleSetUser(email);

    // Step 4. Navigate to home module
    navigate("/browse");
  };

  const validateFields = () => {
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

    const isFormValid = (() => {
      if (!emailIsValid || !passwordIsValid) {
        return false;
      }
      return true;
    })();

    setState((oldState) => {
      const newState = { ...oldState };
      newState.form.options.isFormValid = isFormValid;
      return newState;
    });
  };

  useEffect(() => {
    validateFields();
  }, [state.form.fields.email, state.form.fields.password]);

  return (
    <div className="LoginPage">
      <div className="LoginPage__form-wrapper">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="LoginPage__form-wrapper-input"
            name="email"
            type="text"
            placeholder="Enter your email"
            value={state.form.fields.email}
            onChange={handleChange}
            autoComplete="username"
          />
          <input
            className="LoginPage__form-wrapper-input"
            name="password"
            type="password"
            placeholder="Password"
            value={state.form.fields.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            className="LoginPage__btn"
            disabled={!state.form.options.isFormValid}
          >
            Login
          </button>

          <div className="LoginPage__checkbox-wrapper">
            <div>
              <input id="checkbox" name="checkbox" type="checkbox" />
              <label htmlFor="checkbox">Remember me</label>
            </div>
            <Link to="/">Need help?</Link>
          </div>

          <div className="LoginPage__others-wrapper">
            <p>
              New to netflix? <Link to="/auth/register">Sign up now</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
