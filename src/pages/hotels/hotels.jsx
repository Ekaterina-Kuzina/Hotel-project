import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import Button from "../../components/buttons/button";
import hotelsStyle from "./hotels.module.css";
import Header from "../../components/header/header";

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
  de: deLocale,
};

const maskMap = {
  fr: "__/__/____",
  en: "__/__/____",
  ru: "__.__.____",
  de: "__.__.____",
};

export default function Hotels() {
  const [locale] = useState("ru");
  const [value, setValue] = useState(new Date());
  // const [location, setLocation] = useState(new Date());

  return (
    <div className={hotelsStyle.m}>
      <Header />
      <main className="container">
        <div className={hotelsStyle.wrapper}>
          <div>
            <div className={hotelsStyle.finder}>
              <div className={hotelsStyle.finder__item}>
                <p className={hotelsStyle.finder__text}>Локация</p>
                <TextField type="text" value="hi" fullWidth />
              </div>
              <div className={hotelsStyle.finder__item}>
                <p className={hotelsStyle.finder__text}>Дата заселения</p>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={localeMap[locale]}
                >
                  <DatePicker
                    mask={maskMap[locale]}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
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
                <TextField type="text" value="hi" fullWidth />
              </div>
              <Button>Найти</Button>
            </div>

            <div className={hotelsStyle.favourite}>
              <h2 className={hotelsStyle.favourite__title}>Избранное</h2>
            </div>
          </div>

          <div className={hotelsStyle.content}>kkkkkkkkk</div>
        </div>
      </main>
    </div>
  );
}
