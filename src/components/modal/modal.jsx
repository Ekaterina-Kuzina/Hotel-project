import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyle from "./modal.module.css";
import TextField from "../text-field/text-field";
import Title from "../title/title";
import Button from "../buttons/button";

export default function Modal({ formValues, formErrors, onChange, onSubmit }) {
  return ReactDom.createPortal(
    <>
      <ModalOverlay />
      <div className={modalStyle.wrapper}>
        <Title>Simple Hotel Check</Title>
        <div className={modalStyle.form}>
          <form onSubmit={onSubmit} noValidate>
            <TextField
              type="email"
              name="Логин"
              labelName="Логин"
              value={formValues.email}
              onChange={onChange}
              formErrors={formErrors}
            />
            <TextField
              type="password"
              name="Пароль"
              labelName="Пароль"
              value={formValues.password}
              onChange={onChange}
              formErrors={formErrors}
            />
            <Button>Войти</Button>
          </form>
        </div>
      </div>
    </>,

    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  formValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  formErrors: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
