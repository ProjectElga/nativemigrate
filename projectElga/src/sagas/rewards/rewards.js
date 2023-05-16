import { call, put, all, takeLatest } from "redux-saga/effects";

import { makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { rewardTypes } from "../../reducers/rewards/rewards";

function* rewardShare(payload) {
  try {
    yield put({ type: rewardTypes.ADD_SHARE_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makePostApiCall,
      URLS.API_REWARD,
      {},
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: rewardTypes.ADD_SHARE_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: rewardTypes.ADD_SHARE_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: rewardTypes.ADD_SHARE_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* rewardSaga() {
  yield all([takeLatest(rewardTypes.ADD_SHARE, rewardShare)]);
}

export default rewardSaga;
