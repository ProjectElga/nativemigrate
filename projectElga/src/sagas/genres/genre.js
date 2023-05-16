import { call, put, all, takeLatest } from "redux-saga/effects";

import { makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { genreAddTypes, genreAssignTypes } from "../../reducers/genres/assignGenre";
import { genreSearchTypes } from "../../reducers/genres/genreSearch";

function* searchGenres(payload) {
  try {
    yield put({ type: genreSearchTypes.SEARCH_GENRE_INDICATOR });
    let params = {
      id: payload.userId,
      key: payload.name,
      recordOffset: 0,
      recordPerPage: 100,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_GENRE_SEARCH,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: genreSearchTypes.SEARCH_GENRE_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: genreSearchTypes.SEARCH_GENRE_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: genreSearchTypes.SEARCH_GENRE_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* assignGenres(payload) {
  try {
    yield put({ type: genreAssignTypes.ASSIGN_GENRE_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;
    const body = payload.body;
    const response = yield call(
      makePostApiCall,
      URLS.API_GENRE_ASSIGN,
      body,
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: genreAssignTypes.ASSIGN_GENRE_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: genreAssignTypes.ASSIGN_GENRE_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: genreAssignTypes.ASSIGN_GENRE_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* GenreSaga() {
  yield all([
    takeLatest(genreSearchTypes.SEARCH_GENRE, searchGenres),
    takeLatest(genreAssignTypes.ASSIGN_GENRE, assignGenres),
  ]);
}

export default GenreSaga;
