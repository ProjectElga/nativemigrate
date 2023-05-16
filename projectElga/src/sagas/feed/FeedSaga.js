import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { makeGetApiCall, makePostApiCall } from "../../api";
import { SignupTypes } from "../../reducers/auth/signup";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import ENUM from "../../constants/Enum";
import { getFeedListTypes } from "../../reducers/explore/feed";
import { feedActionTypes } from "../../reducers/explore/feedAction";
import { getFeedDetailTypes } from "../../reducers/explore/feedDetail";

function* getFeedList(payload) {
  try {
    yield put({
      type: getFeedListTypes.GET_FEED_LIST_INDICATOR,
    });
    let params = payload.params;

    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_FEED_LIST,
      params,
      token
    );
    console.log("response", response);
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: getFeedListTypes.GET_FEED_LIST_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: getFeedListTypes.GET_FEED_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: getFeedListTypes.GET_FEED_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* doFeedActionList(payload) {
  try {
    yield put({
      type: feedActionTypes.DO_FEED_LIKE_INDICATOR,
    });
    let params = {
      entityId: payload?.entityId,
      id: payload?.userId,
      type: "LINK",
    };
    let type = payload?.isLiked ? "like" : "unlike";
    const token = payload.tokenDetail;
    const response = yield call(
      makePostApiCall,
      URLS.API_FEED_ACTIVITY(type),
      {},
      token,
      params
    );
    console.log("response", response);
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: feedActionTypes.DO_FEED_LIKE_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: feedActionTypes.DO_FEED_LIKE_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: feedActionTypes.DO_FEED_LIKE_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getFeedDetail(payload) {
  try {
    yield put({
      type: getFeedDetailTypes.GET_FEED_DETAILS_LIST_INDICATOR,
    });
    let params = {
      linkId: payload.linkId,
    };
    let id = payload.linkId;
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FEED_DETAILS(id),
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: getFeedDetailTypes.GET_FEED_DETAILS_LIST_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: getFeedDetailTypes.GET_FEED_DETAILS_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: getFeedDetailTypes.GET_FEED_DETAILS_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* FeedSaga() {
  yield all([
    takeLatest(getFeedListTypes.GET_FEED_LIST, getFeedList),
    takeLatest(feedActionTypes.DO_FEED_LIKE, doFeedActionList),
    takeLatest(getFeedDetailTypes.GET_FEED_DETAILS_LIST, getFeedDetail),
  ]);
}

export default FeedSaga;
