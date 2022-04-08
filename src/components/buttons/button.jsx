import React from "react";
import PropTypes from "prop-types";
import buttonsStyle from "./buttons.module.css";

export default function Button({ children }) {
  return (
    <button type="submit" className={buttonsStyle.button}>
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
