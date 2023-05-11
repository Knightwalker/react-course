import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../configs/firebase";
import { LandingPageLayout } from "../../layouts";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();
  const [objErrors, setObjErrors] = useState(null);

  function F_Login(e) {
    e.preventDefault();
    const email = e.currentTarget["email"].value;
    const password = e.currentTarget["password"].value;

    AuthService.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        history.push("/browse");
      })
      .catch((error) => {
        let objErrors = {};
        if (error.code === "auth/invalid-email") {
          // "The email address is badly formatted.";
          objErrors.email = error.message;
        } else if (error.code === "auth/user-disabled") {
          // Thrown if the user corresponding to the given email has been disabled.
          objErrors.email = error.message;
        } else if (error.code === "auth/user-not-found") {
          // "There is no user record corresponding to this identifier. The user may have been deleted.";
          objErrors.email = error.message;
        } else if (error.code === "auth/wrong-password") {
          // "The password is invalid or the user does not have a password.";
          objErrors.password = error.message;
        }
        setObjErrors(objErrors);
      });

  }

  const F_Register = async (e) => {
    e.preventDefault();
    const email = e.currentTarget["email"].value;
    const password = e.currentTarget["password"].value;

    try {
      const result = await AuthService.createUserWithEmailAndPassword(email, password);
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }

  }

  console.log('test')
  console.log(objErrors?.email === true);
  console.log('test')

  return (
    <LandingPageLayout>
      <div className="LoginPage">
        <div className="LandingPage__hero">
          <div className="LandingPage__gradient"></div>
          <div className="LandingPage__hero-mid">

            <div className="login-form__wrapper">
              <h1 className="login-form__h1">Sign In</h1>
              <form className="login-form" onSubmit={F_Login}>
                <div className="form-control">
                  <input className={`login-form__input ${objErrors?.email ? "error" : ""}`} name="email" placeholder="Email" type="email" />
                  <label htmlFor="email">Email or phone number</label>
                  <div className="login-form__input-error">{objErrors?.email}</div>
                </div>
                <div className="form-control">
                  <input className="login-form__input" name="password" placeholder="Password" type="password" />
                  <label htmlFor="password">Password</label>
                  <div className="login-form__input-error">{objErrors?.password}</div>
                </div>
                <button className="login-form__btn" type="submit">Sing In</button>
              </form>
              <h4 className="login-form__h4">
                <span className="login-form__gray">New to Netflix?</span>
                <span className="login-form__sign-up">Sign Up Now.</span>
              </h4>
            </div>

          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
}

export default LoginPage;