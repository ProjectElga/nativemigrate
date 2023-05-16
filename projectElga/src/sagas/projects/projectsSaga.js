import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { makeGetApiCall } from "../../api";
import ENUM from "../../constants/Enum";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { citationTypes } from "../../reducers/profile/citations";
import { projectDetailTypes } from "../../reducers/projects/projectDetail";

import { projectTypes } from "../../reducers/projects/projects";

//1. Get Search Results
function* getProjectList(payload) {
  try {
    yield put({ type: projectTypes.GET_PROJECT_LIST_INDICATOR });
    let params = {};
    if (payload.name) {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:100,
        listType: payload.listType,
        name: payload.name,
      };
    } else {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:100,
        listType: payload.listType,
      };
    }
    if (payload.listType === ENUM.ONGOING &&
      payload?.name &&
      payload?.name?.length > 0) {
      params = {
        id: payload.userId,
        key: payload.name,
        isActive: true,
        recordOffset: 0,
        recordPerPage:100,
      };
    }

    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      (payload.listType === ENUM.ONGOING &&
        payload?.name &&
        payload?.name?.length > 0)
        ? URLS.API_GET_PROJECT_SEARCH
        : URLS.API_GET_PROJECT_LIST,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectTypes.GET_PROJECT_LIST_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: projectTypes.GET_PROJECT_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>",e)
    yield put({
      type: projectTypes.GET_PROJECT_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

// pending
function* getPendingProjectList(payload) {
  try {
    yield put({ type: projectTypes.GET_PENDING_PROJECT_LIST_INDICATOR });
    let params = {};
    if (payload.name) {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:100,
        listType: payload.listType,
        name: payload.name,
      };
    } else {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:100,
        listType: payload.listType,
      };
    }
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      (payload.listType === ENUM.ONGOING &&
        payload?.name &&
        payload?.name?.length > 0)
        ? URLS.API_GET_PROJECT_SEARCH
        : URLS.API_GET_PROJECT_LIST,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectTypes.GET_PENDING_PROJECT_LIST_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: projectTypes.GET_PENDING_PROJECT_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>",e)
    yield put({
      type: projectTypes.GET_PENDING_PROJECT_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

// pending
function* getSentProjectList(payload) {
  try {
    yield put({ type: projectTypes.GET_SENT_PROJECT_LIST_INDICATOR });
    let params = {};
    if (payload.name) {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:100,
        listType: payload.listType,
        name: payload.name,
      };
    } else {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:100,
        listType: payload.listType,
      };
    }
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      (payload.listType === ENUM.ONGOING &&
        payload?.name &&
        payload?.name?.length > 0)
        ? URLS.API_GET_PROJECT_SEARCH
        : URLS.API_GET_PROJECT_LIST,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectTypes.GET_SENT_PROJECT_LIST_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: projectTypes.GET_SENT_PROJECT_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>",e)
    yield put({
      type: projectTypes.GET_SENT_PROJECT_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* getProjectListSchedular(payload) {
  try {
    let params = {};

    if (payload.name) {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:30,
        listType: payload.listType,
        name: payload.name,
      };
    } else {
      params = {
        id: payload.userId,
        recordOffset: 0,
        recordPerPage:20,
        listType: payload.listType,
      };
    }

    if (payload.listType === ENUM.ONGOING &&
      payload?.name &&
      payload?.name?.length > 0) {
      params = {
        id: payload.userId,
        isActive: true,
        key: payload.name,
        recordOffset: 0,
        recordPerPage:30,
      };
    }

    const token = payload.tokenDetail;

    const response = yield call(
      makeGetApiCall,
      (payload.listType === ENUM.ONGOING &&
        payload?.name &&
        payload?.name?.length > 0)
        ? URLS.API_GET_PROJECT_SEARCH
        : URLS.API_GET_PROJECT_LIST,
      params,
      token
    );

    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectTypes.GET_PROJECT_LIST_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: projectTypes.GET_PROJECT_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>",e)
    yield put({
      type: projectTypes.GET_PROJECT_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* getProjectDetailList(payload) {
  try {
    yield put({ type: projectDetailTypes.GET_PROJECT_DETAIL_LIST_INDICATOR });
    let params = {
      senderUserId: payload.id,
      receiverUserId: payload.recieverId,
      projectId: payload.projectId,
      listType: payload?.sentSection,
    };
    const token = payload.tokenDetail;
    console.log("params", params);
    const response = yield call(
      makeGetApiCall,
      URLS.API_GET_PROJECT_DETAIL_LIST,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectDetailTypes.GET_PROJECT_DETAIL_LIST_SUCCESS,
        response,
      });
      yield put({
        type: citationTypes.GET_CITATION,
        userId: payload.id,
        entityId: payload.projectId,
        tokenDetail: payload.tokenDetail,
        commentType: "COLLABORATION",
      });
    } else {
      yield put({
        type: projectDetailTypes.GET_PROJECT_DETAIL_LIST_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: projectDetailTypes.GET_PROJECT_DETAIL_LIST_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* projectsSaga() {
  yield all([
    takeLatest(projectTypes.GET_PROJECT_LIST, getProjectList),
    takeLatest(projectTypes.GET_PENDING_PROJECT_LIST, getPendingProjectList),
    takeLatest(projectTypes.GET_SENT_PROJECT_LIST, getSentProjectList),
    takeLatest(projectTypes.GET_PROJECT_SCHEDULAR_LIST, getProjectListSchedular),
    takeLatest(
      projectDetailTypes.GET_PROJECT_DETAIL_LIST,
      getProjectDetailList
    ),
  ]);
}
export default projectsSaga;
