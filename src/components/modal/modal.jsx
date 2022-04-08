import React from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import modalStyle from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";
import Button from "../buttons/button";
import Title from "../title/title";

export default function Modal(props) {
  return ReactDom.createPortal(
    <>
      <ModalOverlay closeModal={props.closeModal} />

      <div className={modalStyle.wrapper}>
        <Title>Simple Hotel Check</Title>

        <Link to="/about">
          <Button>Войти</Button>
        </Link>
      </div>
    </>,

    document.getElementById("modal-root")
  );
}
