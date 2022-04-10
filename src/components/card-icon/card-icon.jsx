import React from "react";
import homeIcon from "../../icons/home.svg";
import cardIconStyle from "./card-icon.module.css";

export default function CardIcon() {
  return (
    <div className={cardIconStyle.wrapper}>
      <img src={homeIcon} alt="icon" className={cardIconStyle.image} />
    </div>
  );
}
