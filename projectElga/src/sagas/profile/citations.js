import { call, put, select, all, takeLatest } from "redux-saga/effects";

import { makeGetApiCall, makePostApiCall, makePutApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { citationTypes } from "../../reducers/profile/citations";

function* addCitationApi(payload) {
  try {
    yield put({ type: citationTypes.ADD_CITATION_INDICATOR });
    let params = payload.requestParam;
    let body = payload.requestBody;
    const token = payload.tokenDetail;
    const response = yield call(
      makePostApiCall,
      URLS.API_ADD_CITATION,
      body,
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: citationTypes.ADD_CITATION_SUCCESS, response });
      yield put({
        type: citationTypes.GET_CITATION,
        userId: payload.requestParam.id,
        entityId: payload.requestBody.entityId,
        tokenDetail: payload.tokenDetail,
        commentType: payload.requestParam.commentType,
      });
    } else {
      yield put({
        type: citationTypes.ADD_CITATION_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: citationTypes.ADD_CITATION_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* getCitationList(payload) {
  try {
    yield put({ type: citationTypes.GET_CITATION_INDICATOR });
    let params = {
      id: payload.userId,
      entityId: payload.entityId,
      recordOffset: 0,
      recordPerPage: 100,
      commentType: payload.commentType ? payload.commentType : "USER",
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_USER_CITATION,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: citationTypes.GET_CITATION_SUCCESS, response });
    } else {
      yield put({
        type: citationTypes.GET_CITATION_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: citationTypes.GET_CITATION_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* editCitationList(payload) {
  try {
    yield put({ type: citationTypes.EDIT_CITATION_INDICATOR });
    let params = payload.requestParam;
    const token = payload.tokenDetail;
    const response = yield call(
      makePutApiCall,
      URLS.API_FETCH_USER_CITATION,
      {},
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: citationTypes.EDIT_CITATION_SUCCESS, response });
    } else {
      yield put({
        type: citationTypes.EDIT_CITATION_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: citationTypes.EDIT_CITATION_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* CitationSaga() {
  yield all([
    takeLatest(citationTypes.ADD_CITATION, addCitationApi),
    takeLatest(citationTypes.GET_CITATION, getCitationList),
    takeLatest(citationTypes.EDIT_CITATION, editCitationList),
  ]);
}

export default CitationSaga;
