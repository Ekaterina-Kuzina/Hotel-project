/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import cardStyle from "./card.module.css";
import homeIcon from "../../icons/home.svg";

function declinationOfNum(n, textForms) {
  const num = Math.abs(n) % 100;
  const num1 = num % 10;
  if (num > 10 && num < 20) {
    return textForms[2];
  }
  if (num1 > 1 && num1 < 5) {
    return textForms[1];
  }
  if (num1 === 1) {
    return textForms[0];
  }
  return textForms[2];
}

export default function Card({
  hotelData: { hotelName, priceFrom, stars },
  numberOfDays,
}) {
  const [isActiveIcon, setIsActiveIcon] = useState(false);
  const handleNumberOfDays = () => {
    return `${numberOfDays} ${declinationOfNum(numberOfDays, [
      "день",
      "дня",
      "дней",
    ])}`;
  };

  const toggleIsActiveIcon = () => {
    setIsActiveIcon(!isActiveIcon);
  };
  return (
    <li className={cardStyle.wrapper}>
      <div className={cardStyle.image__wrapper}>
        <img src={homeIcon} alt="icon" className={cardStyle.image} />
      </div>

      <div>
        <h4 className={cardStyle.title}>{hotelName}</h4>
        <div className={cardStyle.date__info}>
          <p>7 июля 2020</p>
          <span className={cardStyle.line} />
          <p>{handleNumberOfDays()}</p>
        </div>

        <Rating name="read-only" value={stars} readOnly />
      </div>

      <div className={cardStyle.price__info}>
        <input
          type="button"
          className={
            isActiveIcon
              ? `${cardStyle.price__icon__active}`
              : `${cardStyle.price__icon}`
          }
          onClick={toggleIsActiveIcon}
        />
        <div className={cardStyle.price}>
          <p className={cardStyle.price__text}>Price:</p>
          <span className={cardStyle.price__item}>{`${priceFrom} ₽`}</span>
        </div>
      </div>
    </li>
  );
}
