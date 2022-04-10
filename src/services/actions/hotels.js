import {
  GET_HOTELS_INFO,
  GET_HOTELS_INFO_SUCCESS,
  GET_HOTELS_INFO_FAILED,
  HOTELS_INFO,
  ADD_FAVOURITE_HOTEL,
  REMOVE_FAVOURITE_HOTEL,
} from "../constants";

const getHotelsInfo = () => {
  return { type: GET_HOTELS_INFO };
};

const getHotelsInfoSuccess = (data) => {
  return { type: GET_HOTELS_INFO_SUCCESS, hotels: data };
};

const getHotelsInfoError = () => {
  return { type: GET_HOTELS_INFO_FAILED };
};

const hotelsInfo = (data) => {
  return { type: HOTELS_INFO, queryParams: data };
};

const addFavouriteHotel = (hotelInfo) => {
  return { type: ADD_FAVOURITE_HOTEL, favourite: hotelInfo };
};

const removeFavouriteHotel = (id) => {
  return { type: REMOVE_FAVOURITE_HOTEL, hotelId: id };
};

export {
  getHotelsInfo,
  getHotelsInfoSuccess,
  getHotelsInfoError,
  hotelsInfo,
  addFavouriteHotel,
  removeFavouriteHotel,
};
