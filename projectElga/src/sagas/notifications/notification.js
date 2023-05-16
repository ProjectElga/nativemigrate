import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { makeDeleteApiCall, makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { notificationTypes } from "../../reducers/notifications/notification";


function* getNotificationData(payload) {
  try {
    yield put({ type: notificationTypes.GET_NOTIFCATION_INDICATOR });
    const token = payload.tokenDetail;
    const params = payload.requestParam;

    const response = yield call(
      makeGetApiCall,
      URLS.API_GET_NOTIFICATION,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: notificationTypes.GET_NOTIFCATION_SUCCESS, response });
    } else {
      yield put({
        type: notificationTypes.GET_NOTIFCATION_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: notificationTypes.GET_NOTIFCATION_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* notificationSaga() {
  yield all([
    takeLatest(notificationTypes.GET_NOTIFCATION, getNotificationData),
  ]);
}
export default notificationSaga;
