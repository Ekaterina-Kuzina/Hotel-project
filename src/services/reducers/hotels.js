import {
  GET_HOTELS_INFO,
  GET_HOTELS_INFO_SUCCESS,
  GET_HOTELS_INFO_FAILED,
} from "../constants";

const initialState = {
  hotels: [],
  hotelsRequest: false,
  hotelsFailed: false,
};

// eslint-disable-next-line default-param-last
export default function hotelsData(state = initialState, action) {
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
