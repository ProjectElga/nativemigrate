import { call, put, select, all, takeLatest } from "redux-saga/effects";

import { makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";

import { categoryTypes } from "../../reducers/discover/category";
import { getUserDiscoverTypes } from "../../reducers/discover/getUser";
import { getTrendingUserDiscoverTypes } from "../../reducers/discover/getTrendingUser";
function* getCategoryData(payload) {
  try {
    yield put({ type: categoryTypes.GET_CATEGORY_DATA_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_DISCOVER_CATEGORIES,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: categoryTypes.GET_CATEGORY_DATA_SUCCESS, response });
    } else {
      yield put({
        type: categoryTypes.GET_CATEGORY_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: categoryTypes.GET_CATEGORY_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* getUserFromCategoryData(payload) {
  try {
    yield put({ type: getUserDiscoverTypes.GET_USER_DISCOVERY_INDICATOR });
    let params = {};
    if (payload.categoryId) {
      params = {
        id: payload.userId,
        categoryId: payload.categoryId,
        trending: false,
        recordOffset: payload.recordOffset,
        recordPerPage: payload.recordPerPage
      };
    } else {
      params = {
        id: payload.userId,
        subcategoryId: payload.subcategoryId,
        trending: false,
        recordOffset: payload.recordOffset,
        recordPerPage: payload.recordPerPage
      };
    }

    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      payload.categoryId
        ? URLS.API_FETCH_DISCOVER_USER
        : URLS.API_FETCH_DISCOVER_USER_FROM_SUBCATEGORY,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: getUserDiscoverTypes.GET_USER_DISCOVERY_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getTrendingUsers(payload) {
  try {
    yield put({
      type: getUserDiscoverTypes.GET_USER_DISCOVERY_INDICATOR,
    });
    let params = payload.params

    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_TRENDING_USER,
      params,
      token
    );
    console.log("response", response)
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: getUserDiscoverTypes.GET_USER_DISCOVERY_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getNearBygUsers(payload) {
  try {
    yield put({
      type: getUserDiscoverTypes.GET_USER_DISCOVERY_INDICATOR,
    });
    let params = {
      id: payload.userId,
      trending: false,
      businessProfile: false,
      recordOffset: payload.recordOffset,
      recordPerPage: payload.recordPerPage
    };

    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_TRENDING_USER,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: getUserDiscoverTypes.GET_USER_DISCOVERY_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* categorySaga() {
  yield all([
    takeLatest(categoryTypes.GET_CATEGORY_DATA, getCategoryData),
    takeLatest(
      getUserDiscoverTypes.GET_USER_DISCOVERY,
      getUserFromCategoryData
    ),
    takeLatest(
      getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
      getTrendingUsers
    ),
    takeLatest(
      getUserDiscoverTypes.GET_NEAR_BY_USER_DISCOVERY,
      getNearBygUsers
    ),
  ]);
}

export default categorySaga;
