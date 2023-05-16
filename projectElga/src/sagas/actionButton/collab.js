import { call, put, all, takeLatest } from "redux-saga/effects";
import { makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { createCollab } from "../../reducers/actionButton/collab";

function* createCollabReq(payload) {
  try {
    yield put({ type: createCollab.ADD_COLLAB_INDICATOR });
    let params = payload.requestParam;
    const token = payload.tokenDetail;
    const body = payload.formData;
    const contentType = "application/x-www-form-urlencoded";
    const response = yield call(
      makePostApiCall,
      URLS.API_CREATE_COLLAB,
      body,
      token,
      params,
      contentType
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: createCollab.ADD_COLLAB_SUCCESS, response });
    } else {
      yield put({
        type: createCollab.ADD_COLLAB_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.warn("e>>", e);
    yield put({
      type: createCollab.ADD_COLLAB_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getCollab(payload) {

  try {
    yield put({ type: createCollab.GET_COLLAB_INDICATOR });
    let params = payload.params;
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_GET_COLLAB,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: createCollab.GET_COLLAB_SUCCESS, response });
    } else {
      yield put({
        type: createCollab.GET_COLLAB_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.warn("e>>", e);
    yield put({
      type: createCollab.GET_COLLAB_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* getCollabCount(payload) {
  try {
    yield put({ type: createCollab.COUNT_COLLAB_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_COLLAB_COUNT(payload.username),
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: createCollab.COUNT_COLLAB_SUCCESS, response });
    } else {
      yield put({
        type: createCollab.COUNT_COLLAB_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.warn("e>>", e);
    yield put({
      type: createCollab.COUNT_COLLAB_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* collabSaga() {
  yield all([
    takeLatest(createCollab.ADD_COLLAB, createCollabReq),
    takeLatest(createCollab.GET_COLLAB, getCollab),
    takeLatest(createCollab.COUNT_COLLAB, getCollabCount),
  ]);
}

export default collabSaga;
