import {
  GET_HOTELS_INFO,
  GET_HOTELS_INFO_SUCCESS,
  GET_HOTELS_INFO_FAILED,
  HOTELS_INFO,
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

export { getHotelsInfo, getHotelsInfoSuccess, getHotelsInfoError, hotelsInfo };
