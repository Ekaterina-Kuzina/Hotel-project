import { combineReducers } from "redux";
import { hotelsData, favouriteHotels } from "./hotels";

const rootReducer = combineReducers({
  hotelsData,
  favouriteHotels,
});

export default rootReducer;
