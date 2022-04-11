import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import hotelsStyle from "./hotels.module.css";
import Header from "../../components/header/header";
import { hotelsInfo } from "../../services/actions/hotels";
import { formatDate, currency, lang, getCheckOutData } from "../../helper";
import FavouriteBlock from "../../components/favourite-block/favourite-block";
import FinderBlock from "../../components/finder-block/finder-block";
import ContentBlock from "../../components/content-block/content-block";

export default function Hotels() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("Москва");
  const [checkIn, setCheckIn] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(1);

  useEffect(() => {
    dispatch(
      hotelsInfo({
        location: `${location}`,
        checkIn: `${formatDate(checkIn)}`,
        checkOut: getCheckOutData(checkIn, numberOfDays),
        currency: `${currency}`,
        lang: `${lang}`,
        numberOfDays: `${numberOfDays}`,
      })
    );
  }, []);

  return (
    <div className={hotelsStyle.page}>
      <Header />
      <main className="container">
        <div className={hotelsStyle.wrapper}>
          <div className={hotelsStyle.left__blocks}>
            <FinderBlock
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              location={location}
              setLocation={setLocation}
              numberOfDays={numberOfDays}
              setNumberOfDays={setNumberOfDays}
            />
            <FavouriteBlock />
          </div>
          <ContentBlock />
        </div>
      </main>
    </div>
  );
}
