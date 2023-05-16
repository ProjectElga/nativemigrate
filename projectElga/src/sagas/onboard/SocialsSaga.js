import { call, put, all, takeLatest } from 'redux-saga/effects';
import { makePostApiCall } from '../../api';
import STRINGS from '../../constants/Strings';
import URLS from '../../constants/Urls';
import { saveInstagramInfo } from '../../reducers/onboard/socials';

function* postInstagramInfo(payload) {
    try {
        yield put({ type: saveInstagramInfo.SAVE_INSTAGRAM_INFO_INDICATOR })
        let params = {
            id: payload.userId,
        }
        const token = payload.tokenDetail;
        const userName=payload.userName;
        const response = yield call(makePostApiCall, `${URLS.API_SAVE_INSTAGRAM_DETAILS}${userName}`,{},  token, params);
        if (typeof response.status !== 'undefined' && response.status) {
            yield put({ type: saveInstagramInfo.SAVE_INSTAGRAM_INFO_SUCCESS, response });
        } else {
            yield put({ type: saveInstagramInfo.SAVE_INSTAGRAM_INFO_FAILED, message: response.message });
        }
    } catch (e) {
        yield put({ type: saveInstagramInfo.SAVE_INSTAGRAM_INFO_FAILED, message: STRINGS.LOADINGERROR });
    }
}

function* SocialsSaga() {
    yield all([
        takeLatest(saveInstagramInfo.SAVE_INSTAGRAM_INFO, postInstagramInfo)
    ])
}

export default SocialsSaga;