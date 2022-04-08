import React from "react";
import PropTypes from "prop-types";
import titleStyle from "./title.module.css";

export default function Title({ children }) {
  return <h1 className={titleStyle.title}>{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};
