import { call, put, select, all, takeLatest } from "redux-saga/effects";

import { makeDeleteApiCall, makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { linksTypes } from "../../reducers/profile/addLinks";

function* addLinksAPi(payload) {
  try {
    yield put({ type: linksTypes.ADD_LINKS_INDICATOR });
    let params = payload.requestParam;
    let body = payload.requestBody;
    const token = payload.tokenDetail;
    const response = yield call(makePostApiCall, URLS.API_LINKS, body, token, params,);
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: linksTypes.ADD_LINKS_SUCCESS, response, });
      // yield put({ type: linksTypes.GET_LINKS, userId: payload.requestParam.id, tokenDetail: payload.tokenDetail, });
    } else {
      yield put({
        type: linksTypes.ADD_LINKS_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: linksTypes.ADD_LINKS_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* getLinksList(payload) {
  try {
    yield put({ type: linksTypes.GET_LINKS_INDICATOR });
    let params = {
      id: payload.userId,
      recordOffset: 0,
      recordPerPage: 100,
    };
    const token = payload.tokenDetail;
    const response = yield call(makeGetApiCall, URLS.API_LINKS, params, token);
    // const response = {}
    if (typeof response.status !== "undefined" && response?.status) {
      yield put({ type: linksTypes.GET_LINKS_SUCCESS, response, });
    } else {
      yield put({
        type: linksTypes.GET_LINKS_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: linksTypes.GET_LINKS_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getLinksCountList(payload) {
  try {
    yield put({ type: linksTypes.GET_LINKS_COUNT_INDICATOR });
    let params = {
      id: payload.userId,
      linkId: payload.id,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makePostApiCall,
      URLS.API_LINKS_COUNTER,
      params,
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: linksTypes.GET_LINKS_COUNT_SUCCESS, response });
    } else {
      yield put({
        type: linksTypes.GET_LINKS_COUNT_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: linksTypes.GET_LINKS_COUNT_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* deleteLinksList(payload) {
  try {
    yield put({ type: linksTypes.DELETE_LINKS_INDICATOR });
    const params = payload.requestParam;
    const token = payload.tokenDetail;
    const response = yield call(
      makeDeleteApiCall,
      URLS.API_LINKS,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: linksTypes.DELETE_LINKS_SUCCESS, response });
    } else {
      yield put({
        type: linksTypes.DELETE_LINKS_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: linksTypes.DELETE_LINKS_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* LinksSaga() {
  yield all([
    takeLatest(linksTypes.ADD_LINKS, addLinksAPi),
    takeLatest(linksTypes.GET_LINKS, getLinksList),
    takeLatest(linksTypes.GET_LINKS_COUNT, getLinksCountList),
    takeLatest(linksTypes.DELETE_LINKS, deleteLinksList),
  ]);
}

export default LinksSaga;
