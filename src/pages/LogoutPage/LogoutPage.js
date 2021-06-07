import React from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../configs/firebase";
import { LandingPageLayout } from "../../layouts";
import "./LogoutPage.css";

function LogoutPage() {
  const history = useHistory();

  function F_Logout(e) {
    e.preventDefault();
    AuthService.signOut()
    .then(() => {
      console.log("logged out");
      history.push("/");
    })
    .catch((error) => {
      console.log(error);
      history.push("/error");
    })
  }

  return (
    <LandingPageLayout>
      <div className="LoginPage">
        <div className="LandingPage__hero">
          <div className="LandingPage__gradient"></div>
          <div className="LandingPage__hero-mid">
             
            <div className="login-form__wrapper">
              <h1 className="login-form__h1">Are you sure you want to log out?</h1>
              <form className="login-form" onSubmit={F_Logout}>
                <input className="login-form__input" name="email" placeholder="Email" type="email" />
                <input className="login-form__input" name="password" placeholder="Password" type="password" />
                <button className="login-form__btn" type="submit">Log Out</button>
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

export default LogoutPage;