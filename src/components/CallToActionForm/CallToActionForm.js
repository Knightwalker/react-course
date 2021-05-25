import React from "react";
import "./CallToActionForm.css"

function CallToActionForm(props) {
  const { F_OnSubmit } = props;

  return (
    <div className="cta">
      <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
      <form className="cta__form" onSubmit={F_OnSubmit}>
        <div className="cta__input-container">
          <input className="cta__input" type="text" required={true} />
          <label className="cta__label">Email address</label>
        </div>
        <button className="cta__btn" type="submit">
          <span className="cta__btn-text">
            Get Started
          </span>
          <span className="chevron-right-arrow">
            <svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg"><desc>chevron</desc><path d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z" fill="#000000" fill-rule="evenodd"></path></svg>
          </span>
        </button>
      </form>
    </div>
  );
}

CallToActionForm.defaultProps = {
  F_OnSubmit: (e) => { e.preventDefault(); alert("configure callback function"); }
};

export default CallToActionForm;