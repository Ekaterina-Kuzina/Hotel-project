import React from "react";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import cardStyle from "./card.module.css";
import {
  declinationOfNum,
  areHotelOffersEqual,
  formatPrice,
} from "../../helper";
import {
  addFavouriteHotel,
  removeFavouriteHotel,
} from "../../services/actions";

export default function Card({
  favouriteHotelsData,
  hotelData,
  children,
  styleForCard,
}) {
  const dispatch = useDispatch();
  const isFavourite =
    styleForCard === "favouriteCardStyle" ||
    favouriteHotelsData.find((item) => areHotelOffersEqual(item, hotelData));

  const handleOnClickBtn = () => {
    if (isFavourite) {
      dispatch(removeFavouriteHotel(hotelData));
    } else {
      dispatch(addFavouriteHotel(hotelData));
    }
  };

  const getFullDate = (date) => {
    return date.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleNumberOfDays = (days) => {
    return `${days} ${declinationOfNum(days, ["день", "дня", "дней"])}`;
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
          className={`${
            isFavourite
              ? `${cardStyle.price__icon__active}`
              : `${cardStyle.price__icon}`
          } ${
            styleForCard === "favouriteCardStyle"
              ? `${cardStyle.price__icon__active}`
              : ""
          }`}
          onClick={handleOnClickBtn}
        />
      </div>

      <div className={cardStyle.date__info}>
        <p>{getFullDate(new Date(hotelData.checkIn))}</p>
        <span className={cardStyle.line} />
        <p>{handleNumberOfDays(hotelData.numberOfDays)}</p>
      </div>

      <div className={cardStyle.price__info}>
        <Rating name="read-only" value={hotelData.stars} readOnly />
        <div className={cardStyle.price}>
          <p className={cardStyle.price__text}>Price:</p>
          <span className={cardStyle.price__item}>{`${formatPrice(
            hotelData.priceFrom
          )} ₽`}</span>
        </div>
      </div>
    </li>
  );
}
