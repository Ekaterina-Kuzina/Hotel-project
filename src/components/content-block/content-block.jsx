import React from "react";
import { useSelector } from "react-redux";
import contentBlock from "./content-block.module.css";
import CardList from "../card-list/card-list";
import CardIcon from "../card-icon/card-icon";
import Carousel from "../carousel/carousel";
import { styleForCard, declinationOfNum } from "../../helper";

export default function ContentBlock() {
  const hotelsData = useSelector((state) => state.hotelsData.hotels);
  const favouriteHotelsData = useSelector(
    (state) => state.favouriteHotels.favouriteHotels
  );

  const handleNumberOfHotels = (numberOfHotels) => {
    return `${declinationOfNum(numberOfHotels, ["отель", "отеля", "отелей"])}`;
  };

  const getFullDate = (date) => {
    return date.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={contentBlock.content}>
      <div className={contentBlock.info}>
        <div className={contentBlock.block}>
          <h2 className={contentBlock.title}>Отели</h2>
          <span className={contentBlock.icon} />
          <h2 className={contentBlock.title}>{hotelsData[0]?.location.name}</h2>
        </div>
        <h3 className={contentBlock.text}>
          {getFullDate(new Date(hotelsData[0]?.checkIn))}
        </h3>
      </div>
      <Carousel />
      <div className={contentBlock.result}>
        Добавлено в Избранное: <span>{favouriteHotelsData.length}</span>
        {` ${handleNumberOfHotels(favouriteHotelsData.length)}`}
      </div>
      <CardList
        styleForCard={styleForCard.card}
        hotelsData={hotelsData}
        favouriteHotelsData={favouriteHotelsData}
      >
        <CardIcon />
      </CardList>
    </div>
  );
}
