import { call, put, takeEvery } from "redux-saga/effects";
import {
  getHotelsInfo,
  getHotelsInfoSuccess,
  getHotelsInfoError,
} from "../actions";

function* sagaGetHotelsInfo(params) {
  try {
    yield put(getHotelsInfo());
    console.log(params);
    const response = yield call(() => {
      return fetch(
        `http://engine.hotellook.com/api/v2/cache.json?${new URLSearchParams({
          location: params.queryParams.location,
          checkIn: params.queryParams.checkIn,
          checkOut: params.queryParams.checkOut,
          currency: params.queryParams.currency,
        })}`
      ).then((res) => res.json());
    });
    console.log(response);
    yield put(getHotelsInfoSuccess(response));
    console.log(" hiihih ");
  } catch (error) {
    console.error(error);
    yield put(getHotelsInfoError());
  }
}

function* mySaga() {
  yield takeEvery("HOTELS_INFO", sagaGetHotelsInfo);
}

export default mySaga;
