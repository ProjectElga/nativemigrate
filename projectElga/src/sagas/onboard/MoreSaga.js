import { call, put, all, takeLatest } from "redux-saga/effects";
import { makeDeleteApiCall, makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { assignAgency } from "../../reducers/onboard/more";

function* getAssignAgency(payload) {
  try {
    yield put({ type: assignAgency.ASSIGN_AGENCY_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;
    const body = payload.requestBody;
    const response = yield call(
      makePostApiCall,
      URLS.API_ASSIGN_AGENCY_DETAILS,
      body,
      token,
      params
    );

    if (typeof response?.status !== "undefined" && response?.status) {
      yield put({ type: assignAgency.ASSIGN_AGENCY_SUCCESS, response });
    } else {
      yield put({
        type: assignAgency.ASSIGN_AGENCY_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: assignAgency.ASSIGN_AGENCY_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* deleteAssignAgency(payload) {
  try {
    yield put({ type: assignAgency.DELETE_AGENCY_INDICATOR });
    let params = {
      id: payload.userId,
      agencyId: payload.agencyId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeDeleteApiCall,
      URLS.API_DELETE_AGENCY_DETAILS,
      params,
      token
    );

    if (typeof response?.status !== "undefined" && response?.status) {
      yield put({ type: assignAgency.DELETE_AGENCY_SUCCESS, response });
      yield put({
        type: assignAgency.GET_AGENCY,
        userId: payload.userId,
        tokenDetail: payload.tokenDetail,
      });
    } else {
      yield put({
        type: assignAgency.DELETE_AGENCY_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: assignAgency.DELETE_AGENCY_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getAgencyDetails(payload) {
  try {
    yield put({ type: assignAgency.GET_AGENCY_INDICATOR });
    let params = {
      id: payload.userId,
      recordOffset: 0,
      recordPerPage: 100,
    };
    const token = payload.tokenDetail;

    const response = yield call(
      makeGetApiCall,
      URLS.API_ASSIGN_AGENCY_DETAILS,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: assignAgency.GET_AGENCY_SUCCESS, response });
    } else {
      yield put({
        type: assignAgency.GET_AGENCY_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: assignAgency.GET_AGENCY_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* MoreSaga() {
  yield all([
    takeLatest(assignAgency.ASSIGN_AGENCY, getAssignAgency),
    takeLatest(assignAgency.GET_AGENCY, getAgencyDetails),
    takeLatest(assignAgency.DELETE_AGENCY, deleteAssignAgency),
  ]);
}

export default MoreSaga;
