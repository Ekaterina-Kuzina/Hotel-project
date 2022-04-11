import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import finderBlockStyle from "./finder-block.module.css";
import Button from "../buttons/button";
import {
  localeMap,
  maskMap,
  formatDate,
  currency,
  lang,
  locale,
  getCheckOutData,
} from "../../helper";
import { hotelsInfo } from "../../services/actions/hotels";

export default function FinderBlock({
  location,
  checkIn,
  setCheckIn,
  numberOfDays,
  setNumberOfDays,
  setLocation,
}) {
  const dispatch = useDispatch();
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
        checkOut: getCheckOutData(checkIn, numberOfDays),
        currency: `${currency}`,
        lang: `${lang}`,
        numberOfDays: `${numberOfDays}`,
      })
    );
  };
  return (
    <div className={finderBlockStyle.finder}>
      <form onSubmit={handleOnSubmmit}>
        <div className={finderBlockStyle.item}>
          <p className={finderBlockStyle.text}>Локация</p>
          <TextField
            required
            type="text"
            value={location}
            fullWidth
            onChange={handleLocationOnChange}
          />
        </div>
        <div className={finderBlockStyle.item}>
          <p className={finderBlockStyle.text}>Дата заселения</p>
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
        <div className={finderBlockStyle.item}>
          <p className={finderBlockStyle.text}>Количество дней</p>
          <TextField
            required
            type="number"
            value={numberOfDays}
            fullWidth
            onChange={handleNumberOfDaysOnChange}
          />
        </div>
        <Button>Найти</Button>
      </form>
    </div>
  );
}
