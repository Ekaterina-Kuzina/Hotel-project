import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../card-list/card-list";
import favouriteStyle from "./favourite-block.module.css";
import { setFavouriteFilter } from "../../services/actions/hotels";
import {
  FILTER_UP_STARS,
  FILTER_DOWN_STARS,
  FILTER_UP_PRICE,
  FILTER_DOWN_PRICE,
  styleForCard,
} from "../../helper";
import FilterButton, {
  FILTER_BUTTON_STATE_UP,
  FILTER_BUTTON_STATE_DOWN,
  FILTER_BUTTON_STATE_DISABLED,
} from "../buttons/filter-button";

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

export default function FavouriteBlock() {
  const dispatch = useDispatch();
  const favouriteHotelsData = useSelector(
    (state) => state.favouriteHotels.favouriteHotels
  );
  const filterState = useSelector((state) => state.favouriteHotels.filter);
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
  return (
    <div className={favouriteStyle.favourite}>
      <h3 className={favouriteStyle.title}>Избранное</h3>
      <div className={favouriteStyle.wrapper}>
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
  );
}
