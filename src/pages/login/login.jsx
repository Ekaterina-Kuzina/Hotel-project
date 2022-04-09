import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal";
import loginStyle from "./login.module.css";

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const hanbleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const error = {};
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexForCyrillic = /[а-яё]+/i;

    if (!values.email) {
      error.email = "Заполните поле";
    } else if (!regexForEmail.test(values.email)) {
      error.email = " Неверный адрес почты";
    }

    if (!values.password) {
      error.password = "Заполните поле";
    } else if (values.password.length < 8) {
      error.password = "Пароль должен быть минимум 8 символов";
    } else if (regexForCyrillic.test(values.password)) {
      error.password = "Используйте латинские буквы и цифры";
    }
    return error;
  };

  const hanbleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      localStorage.setItem("email", formValues.email);
      localStorage.setItem("password", formValues.password);
      navigate("/hotels", { replace: true });
    }
  }, [formErrors]);

  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("email")) {
      navigate("/hotels", { replace: true });
    }
  }, []);

  return (
    <div className={loginStyle.login__page}>
      <Modal
        formValues={formValues}
        formErrors={formErrors}
        onChange={hanbleChange}
        onSubmit={hanbleSubmit}
        isSubmit={isSubmit}
      />
    </div>
  );
}
