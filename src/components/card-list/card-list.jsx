import React from "react";
import { useSelector } from "react-redux";
import Card from "../card/card";
import cardListStyle from "./card-list.module.css";

export default function CardList({ numberOfDays }) {
  const hotelsData = useSelector((state) => state.hotelsData.hotels);
  return (
    <ul className={cardListStyle.wrapper}>
      {hotelsData.map((hotelData) => (
        <Card
          numberOfDays={numberOfDays}
          hotelData={hotelData}
          key={hotelData.hotelId}
        />
      ))}
    </ul>
  );
}
