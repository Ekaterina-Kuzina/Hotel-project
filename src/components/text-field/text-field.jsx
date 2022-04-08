import React from "react";
import PropTypes from "prop-types";
import textFieldStyle from "./text-field.module.css";

export default function TextField({ type, name, value, onChange, formErrors }) {
  return (
    <div className={textFieldStyle.wrapper}>
      <label htmlFor={name} className={textFieldStyle.text}>
        {name}
      </label>
      <input
        id={type}
        name={type}
        className={textFieldStyle.input}
        type={type}
        value={value}
        onChange={onChange}
      />
      <p className={textFieldStyle.error}>{formErrors[type]}</p>
    </div>
  );
}

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
