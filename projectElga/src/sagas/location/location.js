import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { locationTypes } from "../../reducers/location/location";

function* sendLocation(payload) {
    try {
      yield put({ type: locationTypes.SEND_LOCATION_DATA_INDICATOR });
      const token = payload.tokenDetail;
      const params = {
        id: payload.userId,
        longitude: payload.longitude,
        latitude: payload.latitude
      };
  
      const response = yield call(
        makePostApiCall,
        URLS.API_ASSIGN_LOCATION,
        {},
        token,
        params
      );  
      if (typeof response.status !== "undefined" && response.status) {
        yield put({ type: locationTypes.SEND_LOCATION_DATA_SUCCESS, response });
      } else {
        yield put({
          type: locationTypes.SEND_LOCATION_DATA_FAILED,
          message: response.message,
        });
      }
    } catch (e) {
      yield put({
        type: locationTypes.SEND_LOCATION_DATA_FAILED,
        message: STRINGS.LOADINGERROR,
      });
    }
  }
  function* locationSaga() {
    yield all([
      takeLatest(locationTypes.SEND_LOCATION_DATA, sendLocation)

    ]);
  }
  export default locationSaga;