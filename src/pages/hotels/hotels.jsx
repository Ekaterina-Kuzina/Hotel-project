import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/buttons/button";
import hotelsStyle from "./hotels.module.css";
import Header from "../../components/header/header";
import CardList from "../../components/card-list/card-list";
import { hotelsInfo } from "../../services/actions/hotels";
import CardIcon from "../../components/card-icon/card-icon";
import Carousel from "../../components/carousel/carousel";

const localeMap = {
  ru: ruLocale,
};

const maskMap = {
  ru: "__.__.____",
};

const styleForCard = {
  card: "cardStyle",
  favouriteCard: "favouriteCardStyle",
};

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

export default function Hotels() {
  const dispatch = useDispatch();
  const hotelsData = useSelector((state) => state.hotelsData.hotels);
  const favouriteHotelsData = useSelector(
    (state) => state.favouriteHotels.favouriteHotels
  );
  const [locale] = useState("ru");
  const [location, setLocation] = useState("Москва");
  const [checkIn, setCheckIn] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [sendedNumberOfDate, setSendedNumberOfDate] = useState(1);
  const [currency] = useState("rub");
  const [lang] = useState("ru");

  const formatDate = (data) => {
    return data.toISOString().split("T")[0];
  };
  const handleNumberOfDays = () => {
    return `${numberOfDays} ${declinationOfNum(numberOfDays, [
      "день",
      "дня",
      "дней",
    ])}`;
  };

  const handleNumberOfHotels = (numberOfHotels) => {
    return `${declinationOfNum(numberOfHotels, ["отель", "отеля", "отелей"])}`;
  };

  const getFullDate = () => {
    return checkIn.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCheckOutData = () => {
    const checkOut = new Date();
    checkOut.setDate(checkIn.getDate() + numberOfDays);
    return formatDate(checkOut);
  };

  const handleLocationOnChange = (e) => {
    setLocation(e.target.value);
  };

  const handleNumberOfDaysOnChange = (e) => {
    setNumberOfDays(e.target.value);
  };

  const handleOnSubmmit = async (e) => {
    e.preventDefault();
    dispatch(
      hotelsInfo({
        location: `${location}`,
        checkIn: `${formatDate(checkIn)}`,
        checkOut: getCheckOutData(),
        currency: `${currency}`,
        lang: `${lang}`,
      })
    );
    setSendedNumberOfDate(handleNumberOfDays());
  };

  useEffect(() => {
    dispatch(
      hotelsInfo({
        location: `${location}`,
        checkIn: `${formatDate(checkIn)}`,
        checkOut: getCheckOutData(),
        currency: `${currency}`,
        lang: `${lang}`,
      })
    );
  }, []);

  return (
    <div className={hotelsStyle.page}>
      <Header />
      <main className="container">
        <div className={hotelsStyle.wrapper}>
          <div>
            <div className={hotelsStyle.finder}>
              <form onSubmit={handleOnSubmmit}>
                <div className={hotelsStyle.finder__item}>
                  <p className={hotelsStyle.finder__text}>Локация</p>
                  <TextField
                    required
                    type="text"
                    value={location}
                    fullWidth
                    onChange={handleLocationOnChange}
                  />
                </div>
                <div className={hotelsStyle.finder__item}>
                  <p className={hotelsStyle.finder__text}>Дата заселения</p>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={localeMap[locale]}
                  >
                    <DatePicker
                      mask={maskMap[locale]}
                      value={checkIn}
                      onChange={(newValue) => setCheckIn(newValue)}
                      minDate={new Date()}
                      renderInput={(params) => (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <TextField {...params} sx={{ width: "100%" }} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className={hotelsStyle.finder__item}>
                  <p className={hotelsStyle.finder__text}>Количество дней</p>
                  <TextField
                    required
                    type="text"
                    value={numberOfDays}
                    fullWidth
                    onChange={handleNumberOfDaysOnChange}
                  />
                </div>
                <Button>Найти</Button>
              </form>
            </div>

            <div className={hotelsStyle.favourite}>
              <h3 className={hotelsStyle.favourite__title}>Избранное</h3>
              <CardList
                styleForCard={styleForCard.favouriteCard}
                hotelsData={favouriteHotelsData}
                numberOfDays={sendedNumberOfDate}
              />
            </div>
          </div>

          <div className={hotelsStyle.content}>
            <div className={hotelsStyle.content__info}>
              <div className={hotelsStyle.content__info_block}>
                <h2 className={hotelsStyle.content__title}>Отели</h2>
                <span className={hotelsStyle.content__icon} />
                <h2 className={hotelsStyle.content__title}>
                  {hotelsData[0]?.location.name}
                </h2>
              </div>
              <h3 className={hotelsStyle.content__text}>{getFullDate()}</h3>
            </div>
            <Carousel />
            <div className={hotelsStyle.title}>
              Добавлено в Избранное: <span>{favouriteHotelsData.length}</span>
              {` ${handleNumberOfHotels(favouriteHotelsData.length)}`}
            </div>
            <CardList
              styleForCard={styleForCard.card}
              hotelsData={hotelsData}
              numberOfDays={sendedNumberOfDate}
            >
              <CardIcon />
            </CardList>
          </div>
        </div>
      </main>
    </div>
  );
}
