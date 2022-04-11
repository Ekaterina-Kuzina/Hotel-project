/* eslint-disable default-param-last */
import {
  GET_HOTELS_INFO,
  GET_HOTELS_INFO_SUCCESS,
  GET_HOTELS_INFO_FAILED,
  ADD_FAVOURITE_HOTEL,
  REMOVE_FAVOURITE_HOTEL,
  SET_FAVOURITE_FILTER,
} from "../constants";

import imgs, { FILTER_UP_STARS } from "../../helper";

const initialStateForHotelsData = {
  hotels: [],
  hotelsRequest: false,
  hotelsFailed: false,
  images: imgs,
};

const initialStateForFavouriteHotels = {
  favouriteHotels: [],
  filter: FILTER_UP_STARS,
};

function hotelsData(state = initialStateForHotelsData, action) {
  switch (action.type) {
    case GET_HOTELS_INFO:
      return {
        ...state,
        hotelsRequest: true,
      };

    case GET_HOTELS_INFO_SUCCESS:
      return {
        ...state,
        hotels: action.hotels,
        hotelsRequest: false,
      };

    case GET_HOTELS_INFO_FAILED:
      return {
        ...state,
        hotelsFailed: true,
        hotelsRequest: false,
      };

    default:
      return state;
  }
}

function favouriteHotels(state = initialStateForFavouriteHotels, action) {
  switch (action.type) {
    case ADD_FAVOURITE_HOTEL:
      return {
        ...state,
        favouriteHotels: [...state.favouriteHotels, action.favourite],
      };

    case REMOVE_FAVOURITE_HOTEL:
      return {
        ...state,
        favouriteHotels: state.favouriteHotels.filter((hotel) => {
          return hotel !== action.hotelData;
        }),
      };
    case SET_FAVOURITE_FILTER:
      return {
        ...state,
        filter: action.filterState,
      };

    default:
      return state;
  }
}

export { hotelsData, favouriteHotels };
