/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import cardStyle from "./card.module.css";
import {
  addFavouriteHotel,
  removeFavouriteHotel,
} from "../../services/actions";

export default function Card({
  hotelData,
  numberOfDays,
  children,
  styleForCard,
}) {
  const dispatch = useDispatch();
  const [isActiveIcon, setIsActiveIcon] = useState(false);

  const handleOnClickBtn = () => {
    if (isActiveIcon) {
      dispatch(removeFavouriteHotel(hotelData.hotelId));
    } else {
      dispatch(addFavouriteHotel(hotelData));
    }
    setIsActiveIcon(!isActiveIcon);
  };

  return (
    <li
      className={
        styleForCard === "favouriteCardStyle"
          ? `${cardStyle.wrapper__favourite}`
          : `${cardStyle.wrapper}`
      }
    >
      <div className={cardStyle.card_icon}>{children}</div>

      <div className={cardStyle.card__info}>
        <h4 className={cardStyle.title}>{hotelData.hotelName}</h4>
        <input
          type="button"
          className={
            isActiveIcon
              ? `${cardStyle.price__icon__active}`
              : `${cardStyle.price__icon}`
          }
          onClick={handleOnClickBtn}
        />
      </div>

      <div className={cardStyle.date__info}>
        <p>7 июля 2020</p>
        <span className={cardStyle.line} />
        <p>
          {numberOfDays === 1 ? `${numberOfDays} ${"день"}` : `${numberOfDays}`}
        </p>
      </div>

      <div className={cardStyle.price__info}>
        <Rating name="read-only" value={hotelData.stars} readOnly />
        <div className={cardStyle.price}>
          <p className={cardStyle.price__text}>Price:</p>
          <span
            className={cardStyle.price__item}
          >{`${hotelData.priceFrom} ₽`}</span>
        </div>
      </div>
    </li>
  );
}
