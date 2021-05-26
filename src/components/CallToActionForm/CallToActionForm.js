import React from "react";
import "./CallToActionForm.css"

function CallToActionForm(props) {
  const { onSubmit } = props;

  const prepareSubmit = (e) => {
    e.preventDefault();
    const email = e.currentTarget["email"].value;
    const data = { email: email }
    onSubmit(data);
  }

  return (
    <div className="cta">
      <form className="cta__form" onSubmit={prepareSubmit}>
        <div className="cta__input-container">
          <input className="cta__input" name="email" type="text" required={true} />
          <label className="cta__label">Email address</label>
        </div>
        <button className="cta__btn" type="submit">
          <span className="cta__btn-text">Get Started</span>
          <span className="chevron-right-arrow">
            <svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg">
              <desc>chevron</desc>
              <path d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z" fill="#fafafa" fillRule="evenodd"></path>
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}

CallToActionForm.defaultProps = {
  onSubmit: (e) => { alert("configure callback function"); }
};

export default CallToActionForm;