import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({});
  const [isValid, setIsvalid] = useState(false);

  useEffect(() => {
    validation();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(formData);
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
    // console.log(formData);
  };

  const validation = () => {
    // ["firstName", "lastName", "email", "password"]
    const fieldsNames = props.fields.map((field) => field.name);

    fieldsNames.every((field) => formData[field] && formData[field].length > 2)
      ? setIsvalid(true)
      : setIsvalid(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.fields.map((field, index) => (
        <div key={index}>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button
        className="RegisterPage__login-btn btn btn-lg btn-danger"
        type="submit"
        disabled={!isValid}
      >
        Register
      </button>
      <p>
        Already have an account? <Link to="/auth/login">Log in now</Link>.
      </p>
    </form>
  );
};
export default RegisterForm;
