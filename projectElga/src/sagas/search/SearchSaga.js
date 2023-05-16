import { call, put, all, takeLatest } from "redux-saga/effects";

import { makeGetApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { popularGenreTypes } from "../../reducers/search/popularGenre";
import { userSearchTypes } from "../../reducers/search/userSearch";


function* getUserDetail(payload) {
  try {
    yield put({ type: userSearchTypes.SEARCH_USER_PROFILE_INDICATOR });
    let params = {
      id: payload.userId,
      key: payload.name,
      recordOffset: 0,
      recordPerPage: 100,
    };
    const token = payload.tokenDetail;
    let response;
    if (payload?.query === "tag") {
      response = yield call(makeGetApiCall, URLS.API_GENRE_SEARCH, params, token);
    }
    else {
      if (payload?.query === "category") {
        response = yield call(makeGetApiCall, URLS.API_CATEGORY_SEARCH, params, token);
      }
      else {
        if (payload?.query === "generalTag") {
          response = yield call(makeGetApiCall, URLS.API_USER_SEARCH("tag"), params, token);
        }
        else {
          if (payload?.query === "generalCategory") {
            response = yield call(makeGetApiCall, URLS.API_USER_SEARCH("category"), params, token);
          }
          else {
            response = yield call(makeGetApiCall, URLS.API_USER_SEARCH(payload.query), params, token);
          }
        }
      }
    }
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: userSearchTypes.SEARCH_USER_PROFILE_SUCCESS, response, });
    } else {
      yield put({ type: userSearchTypes.SEARCH_USER_PROFILE_FAILED, message: response.message, });
    }
  } catch (e) {
    yield put({ type: userSearchTypes.SEARCH_USER_PROFILE_FAILED, message: STRINGS.LOADINGERROR, });
  }
}
function* getPopularGenre(payload) {
  try {
    yield put({ type: popularGenreTypes.GET_POPULAR_GENRE_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;
    const response = yield call(makeGetApiCall, URLS.API_GET_POPULAR_GENRE, params, token);
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: popularGenreTypes.GET_POPULAR_GENRE_SUCCESS, response, });
    } else {
      yield put({ type: popularGenreTypes.GET_POPULAR_GENRE_FAILED, message: response.message, });
    }
  } catch (e) {
    yield put({ type: popularGenreTypes.GET_POPULAR_GENRE_FAILED, message: STRINGS.LOADINGERROR, });
  }
}
function* SearchSaga() {
  yield all([
    takeLatest(userSearchTypes.SEARCH_USER_PROFILE, getUserDetail),
    takeLatest(popularGenreTypes.GET_POPULAR_GENRE, getPopularGenre),
  ]);
}

export default SearchSaga;
