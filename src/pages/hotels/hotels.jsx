import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";
// import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "../../components/buttons/button";
import hotelsStyle from "./hotels.module.css";
import Header from "../../components/header/header";
import CardList from "../../components/card-list/card-list";
import { hotelsInfo } from "../../services/actions/hotels";

const localeMap = {
  ru: ruLocale,
};

const maskMap = {
  ru: "__.__.____",
};

export default function Hotels() {
  const dispatch = useDispatch();
  const [locale] = useState("ru");
  const [location, setLocation] = useState("Москва");
  const [checkIn, setCheckIn] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [currency] = useState("rub");

  const formatData = (data) => {
    return data.toISOString().split("T")[0];
  };

  const getCheckOutData = () => {
    const checkOut = new Date();
    checkOut.setDate(checkIn.getDate() + numberOfDays);
    return formatData(checkOut);
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
        checkIn: `${formatData(checkIn)}`,
        checkOut: getCheckOutData(),
        currency: `${currency}`,
      })
    );
  };

  useEffect(() => {
    dispatch(
      hotelsInfo({
        location: `${location}`,
        checkIn: `${formatData(checkIn)}`,
        checkOut: getCheckOutData(),
        currency: `${currency}`,
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
            </div>
          </div>

          <div className={hotelsStyle.content}>
            <div className={hotelsStyle.content__info}>
              <div className={hotelsStyle.content__info_block}>
                <h2 className={hotelsStyle.content__title}>Отели</h2>
                <span className={hotelsStyle.content__icon} />
                <h2 className={hotelsStyle.content__title}>Москва</h2>
              </div>

              <h3 className={hotelsStyle.content__text}>07 июля 2020</h3>
            </div>

            <CardList numberOfDays={numberOfDays} />
          </div>
        </div>
      </main>
    </div>
  );
}
