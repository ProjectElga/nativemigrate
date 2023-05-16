import { call, put, all, takeLatest } from 'redux-saga/effects';
import { makeGetApiCall, makePostApiCall } from '../../api';
import STRINGS from '../../constants/Strings';
import URLS from '../../constants/Urls';
import { assignIdentity } from '../../reducers/onboard/identity';

function* getAssignIdentity(payload) {
    try {
        yield put({ type: assignIdentity.ASSIGN_IDENTITY_INDICATOR })
        let params = {
            id: payload.userId,
        }
        const token = payload.tokenDetail;
        const response = yield call(makePostApiCall, URLS.API_ASSIGN_USER_IDENTITY, {}, token, params);
        if (typeof response.status !== 'undefined' && response.status) {
            yield put({ type: assignIdentity.ASSIGN_IDENTITY_SUCCESS, response });
        } else {
            yield put({ type: assignIdentity.ASSIGN_IDENTITY_FAILED, message: response.message });
        }
    } catch (e) {
        yield put({ type: assignIdentity.ASSIGN_IDENTITY_FAILED, message: STRINGS.LOADINGERROR });
    }
}

function* IdentitySaga() {
    yield all([
        takeLatest(assignIdentity.ASSIGN_IDENTITY, getAssignIdentity)
    ])
}

export default IdentitySaga;