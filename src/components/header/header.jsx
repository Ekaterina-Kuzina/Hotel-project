import React from "react";
import { Link } from "react-router-dom";
import ExitButton from "../buttons/exit-button";
import Title from "../title/title";
import headerStyle from "./header.module.css";

export default function Header() {
  return (
    <header className={headerStyle.wrapper}>
      <Title>Simple Hotel Check</Title>
      <Link to="/">
        <ExitButton />
      </Link>
    </header>
  );
}
