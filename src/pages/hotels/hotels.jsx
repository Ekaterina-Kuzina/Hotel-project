/* eslint-disable func-names */
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";
import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
import Button from "../../components/buttons/button";
import hotelsStyle from "./hotels.module.css";
import Header from "../../components/header/header";
import CardList from "../../components/card-list/card-list";
import { hotelsInfo, setFavouriteFilter } from "../../services/actions/hotels";
import CardIcon from "../../components/card-icon/card-icon";
import Carousel from "../../components/carousel/carousel";
import {
  declinationOfNum,
  FILTER_UP_STARS,
  FILTER_DOWN_STARS,
  FILTER_UP_PRICE,
  FILTER_DOWN_PRICE,
} from "../../helper";
import FilterButton, {
  FILTER_BUTTON_STATE_UP,
  FILTER_BUTTON_STATE_DOWN,
  FILTER_BUTTON_STATE_DISABLED,
} from "../../components/buttons/filter-button";

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

function mapFilterStateToStarButtonState(filterState) {
  if (filterState === FILTER_UP_STARS) {
    return FILTER_BUTTON_STATE_UP;
  }
  if (filterState === FILTER_DOWN_STARS) {
    return FILTER_BUTTON_STATE_DOWN;
  }
  return FILTER_BUTTON_STATE_DISABLED;
}

function mapFilterStateToPriceButtonState(filterState) {
  if (filterState === FILTER_UP_PRICE) {
    return FILTER_BUTTON_STATE_UP;
  }
  if (filterState === FILTER_DOWN_PRICE) {
    return FILTER_BUTTON_STATE_DOWN;
  }
  return FILTER_BUTTON_STATE_DISABLED;
}

function sortFavouriteHotelsByFilter(favouriteHotelsData, filterState) {
  return favouriteHotelsData.sort((a, b) => {
    if (filterState === FILTER_UP_STARS) {
      return b.stars - a.stars;
    }
    if (filterState === FILTER_DOWN_STARS) {
      return a.stars - b.stars;
    }
    if (filterState === FILTER_UP_PRICE) {
      return b.priceFrom - a.priceFrom;
    }
    return a.priceFrom - b.priceFrom;
  });
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
  const [currency] = useState("rub");
  const [lang] = useState("ru");
  const filterState = useSelector((state) => state.favouriteHotels.filter);

  const formatDate = (data) => {
    return data.toISOString().split("T")[0];
  };
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

  const getCheckOutData = () => {
    // eslint-disable-next-line camelcase
    // const checkOut = moment().format("llll").add(1, "days").calendar();
    // console.log(checkOut);
    // return checkOut;
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + numberOfDays);
    return formatDate(checkOut);
  };

  const handleLocationOnChange = (e) => {
    setLocation(e.target.value);
  };

  const handleNumberOfDaysOnChange = (e) => {
    setNumberOfDays(e.target.value);
  };

  const filterByStartClicked = (filterButtonState) => {
    if (
      filterButtonState === FILTER_BUTTON_STATE_DISABLED ||
      filterButtonState === FILTER_BUTTON_STATE_DOWN
    ) {
      dispatch(setFavouriteFilter(FILTER_UP_STARS));
    } else {
      dispatch(setFavouriteFilter(FILTER_DOWN_STARS));
    }
  };

  const filterByPriceClicked = (filterButtonState) => {
    if (
      filterButtonState === FILTER_BUTTON_STATE_DISABLED ||
      filterButtonState === FILTER_BUTTON_STATE_DOWN
    ) {
      dispatch(setFavouriteFilter(FILTER_UP_PRICE));
    } else {
      dispatch(setFavouriteFilter(FILTER_DOWN_PRICE));
    }
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
        numberOfDays: `${numberOfDays}`,
      })
    );
  };

  useEffect(() => {
    dispatch(
      hotelsInfo({
        location: `${location}`,
        checkIn: `${formatDate(checkIn)}`,
        checkOut: getCheckOutData(),
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
              <div className={hotelsStyle.favourite__filters}>
                <FilterButton
                  filterCard={filterByStartClicked}
                  buttonState={mapFilterStateToStarButtonState(filterState)}
                >
                  Рейтинг
                </FilterButton>
                <FilterButton
                  filterCard={filterByPriceClicked}
                  buttonState={mapFilterStateToPriceButtonState(filterState)}
                >
                  Цена
                </FilterButton>
              </div>
              <CardList
                styleForCard={styleForCard.favouriteCard}
                hotelsData={sortFavouriteHotelsByFilter(
                  favouriteHotelsData,
                  filterState
                )}
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
              <h3 className={hotelsStyle.content__text}>
                {getFullDate(new Date(hotelsData[0]?.checkIn))}
              </h3>
            </div>
            <Carousel />
            <div className={hotelsStyle.title}>
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
        </div>
      </main>
    </div>
  );
}
