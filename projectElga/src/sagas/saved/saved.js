import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { makeGetApiCall, makePostApiCall } from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { profileTypes } from "../../reducers/profile/profile";
import { savedTypes } from "../../reducers/saved/saved";

function* getSavedData(payload) {
  try {
    yield put({ type: savedTypes.SAVED_DATA_INDICATOR });
    let params = {}
    if (payload.isSearch) {
      params = {
        id: payload.userId,
        entity: payload.saveEntity,
        key: payload.key,
        recordOffset: 0,
        recordPerPage:100,
      };
    }
    else {
      params = {
        id: payload.userId,
        saveEntity: payload.saveEntity,
        recordOffset: 0,
        recordPerPage:100,
      };
    }

    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      payload.isSearch ? URLS.API_FETCH_SAVED_SEARCH(payload.saveEntity) : URLS.API_FETCH_SAVED,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: savedTypes.SAVED_DATA_SUCCESS, response });

    } else {
      yield put({
        type: savedTypes.SAVED_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: savedTypes.SAVED_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
// function* getSaveEntity(payload) {
//   try {
//     yield put({ type: savedTypes.ADD_SAVED_INDICATOR });
//     let params = {
//       userId: payload.userId,
//       entityId: payload.entityId,
//       saveEntity: payload.saveEntity,
//     };
//     const token = payload.tokenDetail;
//     alert("isSaved in saga" + payload)

//     const response = yield call(
//       makePostApiCall,
//       URLS.API_SAVE_ENTITY(payload.entityId),
//       {},
//       token,
//       params
//     );
//     if (payload.isSaved) {
//       yield put({ type: profileTypes.UNSAVED_PROFILE });
//     }
//     else {
//       yield put({ type: profileTypes.SAVED_PROFILE });
//     }
//     if (typeof response.status !== "undefined" && response.status) {
//       yield put({ type: savedTypes.ADD_SAVED_SUCCESS, response });
//     } else {
//       yield put({
//         type: savedTypes.ADD_SAVED_FAILED,
//         message: response.message,
//       });
//     }
//   } catch (e) {
//     yield put({
//       type: savedTypes.ADD_SAVED_FAILED,
//       message: STRINGS.LOADINGERROR,
//     });
//   }
// }
function* addSaveEntity(payload) {
  try {
    yield put({ type: savedTypes.ADD_SAVED_INDICATOR });

    let params = {
      id: payload.userId,
      entityId: payload.entityId,
      saveEntity: payload.saveEntity,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makePostApiCall,
      URLS.API_SAVE_ENTITY(payload.entityId),
      {},
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: savedTypes.ADD_SAVED_SUCCESS, response });
    } else {
      yield put({
        type: savedTypes.ADD_SAVED_FAILED, message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: savedTypes.ADD_SAVED_FAILED, message: STRINGS.LOADINGERROR,
    });
  }
}

function* SavedSaga() {
  yield all([
    takeLatest(savedTypes.SAVED_DATA, getSavedData),
    takeLatest(savedTypes.ADD_SAVED, addSaveEntity),
  ]);
}
export default SavedSaga;
