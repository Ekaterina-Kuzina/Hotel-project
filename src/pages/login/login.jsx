import * as React from "react";
import Button from "../../components/buttons/button";
import Modal from "../../components/modal/modal";
import loginStyle from "./login.module.css";

export default function Login() {
  return (
    <div className={loginStyle.login__page}>
      <Modal>
        <Button>Войти</Button>
      </Modal>
    </div>
  );
}
