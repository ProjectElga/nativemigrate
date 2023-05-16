import { call, put, all, takeLatest } from "redux-saga/effects";
import { makeDeleteApiCall, makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { archiveChatTypes } from "../../reducers/projects/archiveChat";
import { projectActionTypes } from "../../reducers/projects/projectAction";
import { projectTypes } from "../../reducers/projects/projects";

function* addProject(payload) {
  try {
    if (!payload.isReject) {
      yield put({ type: projectActionTypes.ACCEPT_PROJECT_INDICATOR });
    } else {
      yield put({ type: projectActionTypes.REJECT_PROJECT_INDICATOR });
    }
    let params = {
      senderUserId: payload.senderUserId,
      projectId: payload.projectId,
      receiverUserId: payload.userId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      payload.isReject ? URLS.API_REJECT_PROJECT : URLS.API_ACCEPT_PROJECT,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: projectActionTypes.ACCEPT_PROJECT_SUCCESS, response });
      yield put({
        type: projectTypes.GET_PENDING_PROJECT_LIST,
        userId: payload.userId,
        tokenDetail: payload.tokenDetail,
        listType: "PENDING",
      });
    } else {
      yield put({
        type: projectActionTypes.ACCEPT_PROJECT_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: projectActionTypes.ACCEPT_PROJECT_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* archiveProject(payload) {
  try {
    yield put({ type: archiveChatTypes.GET_ARCHIVE_CHAT_INDICATOR });
    let params = {
      id: payload.userId,
      projectId: payload.projectId,
      type: "COLLABORATION"
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeDeleteApiCall,
      URLS.API_GET_ARCHIVE_CHAT,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: archiveChatTypes.GET_ARCHIVE_CHAT_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: archiveChatTypes.GET_ARCHIVE_CHAT_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: archiveChatTypes.GET_ARCHIVE_CHAT_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* withdrawProject(payload) {
  try {
    yield put({ type: projectActionTypes.WITHDRAW_PROJECT_INDICATOR });
    let params = {
      senderUserId: payload.userId,
      receiverUserId: payload.receiverUserId,
      projectId: payload.projectId,
      type: payload.listType
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeDeleteApiCall,
      URLS.API_WITHDRAW_PROJECT,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectActionTypes.WITHDRAW_PROJECT_SUCCESS,
        response,
      });
      yield put({
        type: projectTypes.GET_SENT_PROJECT_LIST,
        userId: payload.userId,
        tokenDetail: payload.tokenDetail,
        listType: "SENT",
      });
    } else {
      yield put({
        type: projectActionTypes.WITHDRAW_PROJECT_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: projectActionTypes.WITHDRAW_PROJECT_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* addMembers(payload) {
  try {
    yield put({ type: projectActionTypes.ADD_MEMBERS_INDICATOR });
    let params = {
      id: payload.userId,
      projectId: payload.projectId,
    };
    let body = payload.participants;
    const token = payload.tokenDetail;
    const response = yield call(
      makePostApiCall,
      URLS.API_ADD_MEMBERS,
      body,
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectActionTypes.ADD_MEMBERS_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: projectActionTypes.ADD_MEMBERS_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: projectActionTypes.ADD_MEMBERS_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* removeMembers(payload) {
  try {
    yield put({ type: projectActionTypes.REMOVE_MEMBERS_INDICATOR });
    let params = {
      id: payload.userId,
      projectId: payload.projectId,
    };
    console.log("payload", payload)
    const token = payload.tokenDetail;
    const response = yield call(
      makeDeleteApiCall,
      URLS.API_REMOVE_MEMBERS(payload.action),
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: projectActionTypes.REMOVE_MEMBERS_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: projectActionTypes.REMOVE_MEMBERS_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: projectActionTypes.REMOVE_MEMBERS_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}


function* projectActionSaga() {
  yield all([
    takeLatest(projectActionTypes.ACCEPT_PROJECT, addProject),
    takeLatest(projectActionTypes.WITHDRAW_PROJECT, withdrawProject),
    takeLatest(archiveChatTypes.GET_ARCHIVE_CHAT, archiveProject),
    takeLatest(projectActionTypes.ADD_MEMBERS, addMembers),
    takeLatest(projectActionTypes.REMOVE_MEMBERS, removeMembers),

  ]);
}

export default projectActionSaga;
