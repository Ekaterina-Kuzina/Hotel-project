import React from "react";
import Card from "../card/card";
import cardListStyle from "./card-list.module.css";

export default function CardList({
  hotelsData,
  numberOfDays,
  children,
  styleForCard,
  favouriteHotelsData,
}) {
  return (
    <ul
      className={
        styleForCard === "favouriteCardStyle"
          ? `${cardListStyle.wrapper__favourite}`
          : `${cardListStyle.wrapper}`
      }
    >
      {hotelsData.map((hotelData) => (
        <Card
          styleForCard={styleForCard}
          numberOfDays={numberOfDays}
          hotelData={hotelData}
          favouriteHotelsData={favouriteHotelsData}
          key={hotelData.hotelId}
        >
          {children}
        </Card>
      ))}
    </ul>
  );
}
