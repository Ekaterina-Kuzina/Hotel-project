import { call, put, takeEvery } from "redux-saga/effects";
import {
  getHotelsInfo,
  getHotelsInfoSuccess,
  getHotelsInfoError,
} from "../actions";

function* sagaGetHotelsInfo(params) {
  try {
    yield put(getHotelsInfo());
    const response = yield call(() => {
      return fetch(
        `http://engine.hotellook.com/api/v2/cache.json?${new URLSearchParams({
          location: params.queryParams.location,
          checkIn: params.queryParams.checkIn,
          checkOut: params.queryParams.checkOut,
          currency: params.queryParams.currency,
          lang: params.queryParams.lang,
        })}`
      ).then((res) => res.json());
    });
    const responseWithCheckInAndNumberOfDays = response.map((hotelInfo) => {
      const temp = hotelInfo;
      temp.checkIn = params.queryParams.checkIn;
      temp.numberOfDays = params.queryParams.numberOfDays;
      return temp;
    });
    yield put(getHotelsInfoSuccess(responseWithCheckInAndNumberOfDays));
  } catch (error) {
    console.error(error);
    yield put(getHotelsInfoError());
  }
}

function* mySaga() {
  yield takeEvery("HOTELS_INFO", sagaGetHotelsInfo);
}

export default mySaga;
