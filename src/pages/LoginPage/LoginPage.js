import React from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../configs/firebase";
import { LandingPageLayout } from "../../layouts";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();

  const F_Login = async (e) => {
    e.preventDefault();
    const email = e.currentTarget["email"].value;
    const password = e.currentTarget["password"].value;

    try {
      const result = await AuthService.signInWithEmailAndPassword(email, password);
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }

    history.push("/browse");

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

  return (
    <LandingPageLayout>
      <div className="LoginPage">
        <div className="LandingPage__hero">
          <div className="LandingPage__gradient"></div>
          <div className="LandingPage__hero-mid">
             
            <div className="login-form__wrapper">
              <h1 className="login-form__h1">Sign In</h1>
              <form className="login-form" onSubmit={F_Login}>
                <input className="login-form__input" name="email" placeholder="Email" type="email" />
                <input className="login-form__input" name="password" placeholder="Password" type="password" />
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