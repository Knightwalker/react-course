import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const RegisterForm = ({ fields }) => {
  const [formData, setFormData] = useState({});

  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const { handleSetUser } = useContext(AppContext);

  useEffect(() => {
    const defaultValue = {};
    fields.forEach((field) => {
      defaultValue[field.name] = field.value;
    });
    setFormData(defaultValue);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", formData);
    handleSetUser(formData.firstName, formData.email);
    navigate("/movies");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    Object.values(formData).every((value) => value.length >= 2)
      ? setIsValid(true)
      : setIsValid(false);
  };

  useEffect(() => {
    validation();
  }, [formData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field, idx) => (
          <div key={idx}>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <br />
        <button className="btn btn-primary" type="submit" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
