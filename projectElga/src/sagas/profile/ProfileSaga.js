import { call, put, select, all, takeLatest } from "redux-saga/effects";

import {
  makeGetApiCall,
  makeGetApiV2Call,
  makePostApiCall,
  makePutApiCall,
} from "../../api";
import STRINGS from "../../constants/Strings";
import URLS from "../../constants/Urls";
import { UserMetaTypes } from "../../reducers/onboard/userMeta";
import { citationTypes } from "../../reducers/profile/citations";
import { profileTypes } from "../../reducers/profile/profile";
import { updateUser } from "../../reducers/profile/edit";
import { instagramTypes } from "../../reducers/profile/instagram";
import { youtubeTypes } from "../../reducers/profile/youtube";
import { linksTypes } from "../../reducers/profile/addLinks";
import { thirdPartyProfileTypes } from "../../reducers/profile/thirdPartyProfile";
import { createCollab } from "../../reducers/actionButton/collab";
import { profilePercentageTypes } from "../../reducers/profile/profilePercentage";
function* getProfileData(payload) {
  try {
    yield put({ type: profileTypes.GET_PROFILE_DATA_INDICATOR });
    yield put({ type: instagramTypes.RESET_FETCH_INSTAGRAM_MEDIA });
    let params = {
      id: payload.userId,
      entityId: payload.entityId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_USER_PROFILE,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: profileTypes.GET_PROFILE_DATA_SUCCESS, response });
      yield put({
        type: citationTypes.GET_CITATION,
        userId: payload.userId,
        entityId: payload.entityId,
        tokenDetail: payload.tokenDetail,
      });
      yield put({
        type: createCollab.COUNT_COLLAB,
        userId: payload.entityId ? payload.entityId : payload.userId,
        tokenDetail: payload.tokenDetail,
        username: response.data?.userName
      });
      yield put({
        type: instagramTypes.FETCH_INSTAGRAM_MEDIA,
        userId: payload.entityId ? payload.entityId : payload.userId,
        tokenDetail: payload.tokenDetail,
      });

      yield put({
        type: youtubeTypes.FETCH_YOUTUBE_MEDIA,
        userId: payload.entityId ? payload.entityId : payload.userId,
        tokenDetail: payload.tokenDetail,
      });
      // yield put({
      //   type: linksTypes.GET_LINKS,
      //   userId: payload.userId,
      //   tokenDetail: payload.tokenDetail,
      // });
    } else {
      yield put({
        type: profileTypes.GET_PROFILE_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: profileTypes.GET_PROFILE_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getProfileMetaData(payload) {
  try {
    yield put({ type: UserMetaTypes.FETCH_USER_META_INDICATOR });

    const token = payload.tokenDetail;
    const body = payload.requestBody;
    const response = yield call(
      makeGetApiCall,

      URLS.API_FETCH_USER_META(payload.userId),
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: UserMetaTypes.FETCH_USER_META_SUCCESS, response });
    } else {
      yield put({
        type: UserMetaTypes.FETCH_USER_META_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: UserMetaTypes.FETCH_USER_META_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* updateUserSaga(payload) {
  try {
    yield put({ type: updateUser.UPDATE_USER_INDICATOR });
    let params = {
      id: payload.userId,
    };
    const token = payload.tokenDetail;

    const body = payload.requestBody;
    const response = yield call(
      makePutApiCall,
      URLS.API_UPDATE_USER_PROFILE,
      body,
      token,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: updateUser.UPDATE_USER_SUCCESS, response });
    } else {
      yield put({
        type: updateUser.UPDATE_USER_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: updateUser.UPDATE_USER_FAILED,
      message: STRINGS.USERNAME_EXIST,
    });
  }
}
function* updateUserElasticSaga(payload) {
  try {
    yield put({ type: updateUser.UPDATE_USER_INDICATOR });
   
    const token = payload.tokenDetail;

    const body = payload.requestBody;
    const response = yield call(
      makePutApiCall,
      URLS.API_UPDATE_ELASTIC_SEARCH,
      body,
      token,
 
    );
    if (typeof response.status !== "undefined" && response.status) {
      console.log("elastic update working")
      yield put({ type: updateUser.UPDATE_USER_SUCCESS, response });
    } else {
      yield put({
        type: updateUser.UPDATE_USER_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: updateUser.UPDATE_USER_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getInstagramList(payload) {
  try {
    yield put({ type: instagramTypes.FETCH_INSTAGRAM_MEDIA_INDICATOR });
    let params = {
      id: payload.userId,
      platforms: "INSTAGRAM",
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiV2Call,
      URLS.API_FETCH_USER_INSTAGRAM,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: instagramTypes.FETCH_INSTAGRAM_MEDIA_SUCCESS,
        response,
      });
    } else {
      yield put({
        type: instagramTypes.FETCH_INSTAGRAM_MEDIA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: instagramTypes.FETCH_INSTAGRAM_MEDIA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getYoutubeList(payload) {
  try {
    yield put({ type: youtubeTypes.FETCH_YOUTUBE_MEDIA_INDICATOR });
    let params = {
      id: payload.userId,
      platforms: "YOUTUBE",
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiV2Call,
      URLS.API_FETCH_USER_INSTAGRAM,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: youtubeTypes.FETCH_YOUTUBE_MEDIA_SUCCESS, response });
    } else {
      yield put({
        type: youtubeTypes.FETCH_YOUTUBE_MEDIA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    yield put({
      type: youtubeTypes.FETCH_YOUTUBE_MEDIA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}
function* uploadImage(payload) {
  try {
    yield put({ type: updateUser.UPDATE_USER_PHOTO_INDICATOR });
    const params = payload.params;
    const token = payload.tokenDetail;
    const body = payload.form;
    const contentType = "multipart/form-data";
    const response = yield call(
      makePostApiCall,
      URLS.API_UPLOAD_PHOTO,
      body,
      token,
      params,
      contentType
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: updateUser.UPDATE_USER_PHOTO_SUCCESS, response });
      console.log(response);
    } else {
      yield put({
        type: updateUser.UPDATE_USER_PHOTO_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log("e>>", e);
    yield put({
      type: updateUser.UPDATE_USER_PHOTO_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* gettpProfileData(payload) {
  console.log("hi called");
  try {
    yield put({ type: thirdPartyProfileTypes.GET_TPP_PROFILE_DATA_INDICATOR });
    yield put({ type: instagramTypes.RESET_FETCH_INSTAGRAM_MEDIA });
    let params = {
      id: payload.userId,
      entityId: payload.entityId,
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_USER_PROFILE,
      params,
      token
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({
        type: thirdPartyProfileTypes.GET_TPP_PROFILE_DATA_SUCCESS,
        response,
      });
      yield put({
        type: citationTypes.GET_CITATION,
        userId: payload.userId,
        entityId: payload.entityId,
        tokenDetail: payload.tokenDetail,
      });
      yield put({
        type: thirdPartyProfileTypes.GET_PROFILE_IS_VISITED,
        id: payload.userId,
        tokenDetail: payload.tokenDetail,
      })
      yield put({
        type: createCollab.COUNT_COLLAB,
        userId: payload.entityId ? payload.entityId : payload.userId,
        tokenDetail: payload.tokenDetail,
        username: response.data?.userName
      });
      yield put({
        type: instagramTypes.FETCH_INSTAGRAM_MEDIA,
        userId: payload.entityId ? payload.entityId : payload.userId,
        tokenDetail: payload.tokenDetail,
      });

      yield put({
        type: youtubeTypes.FETCH_YOUTUBE_MEDIA,
        userId: payload.entityId ? payload.entityId : payload.userId,
        tokenDetail: payload.tokenDetail,
      });
      // yield put({
      //   type: linksTypes.GET_LINKS,
      //   userId: payload.userId,
      //   tokenDetail: payload.tokenDetail,
      // });
    } else {
      yield put({
        type: thirdPartyProfileTypes.GET_TPP_PROFILE_DATA_FAILED,
        message: response.message,
      });
    }
  } catch (e) {
    console.log(e)
    yield put({
      type: thirdPartyProfileTypes.GET_TPP_PROFILE_DATA_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getIsVisited(payload) {
  try {
    yield put({ type: thirdPartyProfileTypes.GET_PROFILE_IS_VISITED_INDICATOR });
    const params = {
      id: payload.id
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_IS_VISITED_PROFILE,
      params,
      token,
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: thirdPartyProfileTypes.GET_PROFILE_IS_VISITED_SUCCESS, response });
    } else {
      yield put({ type: thirdPartyProfileTypes.GET_PROFILE_IS_VISITED_FAILED, });
    }
  } catch (e) {
    yield put({
      type: thirdPartyProfileTypes.GET_PROFILE_IS_VISITED_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* getProfilePercentage(payload) {
  try {
    yield put({ type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE_INDICATOR });
    const params = {
      id: payload.id
    };
    const token = payload.tokenDetail;
    const response = yield call(
      makeGetApiCall,
      URLS.API_FETCH_PROFILE_COMPLETION_PERCENTAGE,
      params,
      token,
    );
    if (typeof response.status !== "undefined" && response.status) {
      yield put({ type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE_SUCCESS, response });
    } else {
      yield put({ type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE_FAILED, });
    }
  } catch (e) {
    yield put({
      type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE_FAILED,
      message: STRINGS.LOADINGERROR,
    });
  }
}

function* ProfileSaga() {
  yield all([
    takeLatest(profileTypes.GET_PROFILE_DATA, getProfileData),
    takeLatest(thirdPartyProfileTypes.GET_TPP_PROFILE_DATA, gettpProfileData),
    takeLatest(UserMetaTypes.FETCH_USER_META, getProfileMetaData),
    takeLatest(updateUser.UPDATE_USER, updateUserSaga),
    takeLatest(updateUser.UPDATE_USER_ELASTIC, updateUserElasticSaga),

    takeLatest(instagramTypes.FETCH_INSTAGRAM_MEDIA, getInstagramList),
    takeLatest(youtubeTypes.FETCH_YOUTUBE_MEDIA, getYoutubeList),
    takeLatest(updateUser.UPDATE_USER_PHOTO, uploadImage),
    takeLatest(thirdPartyProfileTypes.GET_PROFILE_IS_VISITED, getIsVisited),
    takeLatest(profilePercentageTypes.FETCH_PROFILE_PERCENTAGE, getProfilePercentage),
  ]);
}

export default ProfileSaga;
