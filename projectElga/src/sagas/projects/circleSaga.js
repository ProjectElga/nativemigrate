import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { makeDeleteApiCall, makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { circleTypes } from "../../reducers/projects/circle";

function* getCircleData(payload) {
  try {
    yield put({ type: circleTypes.GET_CIRCLE_DATA_INDICATOR });
    const token = payload.tokenDetail;
    const params = payload.requestParam;

    const response = yield call(
      makeGetApiCall,
      URLS.API_GET_CIRCLE_DATA,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      if (payload?.requestParam?.listType === "PENDING") {
        yield put({ type: circleTypes.GET_CIRCLE_DATA_SUCCESS_PENDING, response });

      } else {
        if (payload?.requestParam?.listType === "SENT") {
          yield put({ type: circleTypes.GET_CIRCLE_DATA_SUCCESS_SENT, response });
        }
        else {
          yield put({ type: circleTypes.GET_CIRCLE_DATA_SUCCESS, response });
        }
      }

    } else {
      yield put({
        type: circleTypes.GET_CIRCLE_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: circleTypes.GET_CIRCLE_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getCircleSearchData(payload) {
  try {
    yield put({ type: circleTypes.GET_CIRCLE_DATA_INDICATOR });
    const token = payload.tokenDetail;
    const params = payload.requestParam;

    const response = yield call(
      makeGetApiCall,
      URLS.API_GET_CIRCLE_SEARCH_DATA,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: circleTypes.GET_CIRCLE_DATA_SUCCESS, response });
    } else {
      yield put({
        type: circleTypes.GET_CIRCLE_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: circleTypes.GET_CIRCLE_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* deleteCircleRequest(payload) {
  try {
    yield put({ type: circleTypes.DELETE_CIRCLE_DATA_INDICATOR });
    const token = payload.tokenDetail;
    const params = payload.requestParam;

    const response = yield call(
      makeDeleteApiCall,
      URLS.API_DELETE_CIRCLE_DATA,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      const requestParam = {
        id: payload.isSent ? payload.requestParam.receiverUserId : payload.requestParam.receiverUserId,
        listType: payload.isSent ? "SENT" : "PENDING",
      };
      yield put({ type: circleTypes.DELETE_CIRCLE_DATA_SUCCESS, response });
      yield put({ type: circleTypes.GET_CIRCLE_DATA, requestParam: requestParam, tokenDetail: payload.tokenDetail, });
    } else {
      yield put({
        type: circleTypes.DELETE_CIRCLE_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: circleTypes.DELETE_CIRCLE_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* acceptCircleRequest(payload) {
  try {
    yield put({ type: circleTypes.ACCEPT_CIRCLE_DATA_INDICATOR });
    const token = payload.tokenDetail;
    const params = payload.requestParam;
    console.log("payload>>", payload)
    const response = yield call(makeGetApiCall, URLS.API_ACCEPT_CIRCLE_DATA, params, token);
    if (typeof response.status !== "undefined" && response.status) {
      const requestParam = {
        id: payload.requestParam.receiverUserId,
        listType: "PENDING",
      };
      yield put({ type: circleTypes.ACCEPT_CIRCLE_DATA_SUCCESS, response });
      yield put({ type: circleTypes.GET_CIRCLE_DATA, requestParam: requestParam, tokenDetail: payload.tokenDetail, });
    } else {
      yield put({
        type: circleTypes.ACCEPT_CIRCLE_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: circleTypes.ACCEPT_CIRCLE_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* sendCircleRequest(payload) {
  try {
    yield put({ type: circleTypes.SEND_CIRCLE_REQ_INDICATOR });
    const token = payload.tokenDetail;
    const params = payload.requestParam;

    const response = yield call(
      makePostApiCall,
      URLS.API_SEND_CIRCLE_REQ,
      {},
      token,
      params
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: circleTypes.SEND_CIRCLE_REQ_SUCCESS, response });
    } else {
      yield put({
        type: circleTypes.SEND_CIRCLE_REQ_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: circleTypes.SEND_CIRCLE_REQ_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* circlesSaga() {
  yield all([
    takeLatest(circleTypes.GET_CIRCLE_DATA, getCircleData),
    takeLatest(circleTypes.GET_CIRCLE_SEARCH_DATA, getCircleSearchData),
    takeLatest(circleTypes.DELETE_CIRCLE_DATA, deleteCircleRequest),
    takeLatest(circleTypes.SEND_CIRCLE_REQ, sendCircleRequest),
    takeLatest(circleTypes.ACCEPT_CIRCLE_DATA, acceptCircleRequest)
  ]);
}
export default circlesSaga;
