import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { Alert } from "react-native";
import { makeGetApiCall, makeGetApiCallWithoutStatus, makePostApiCall } from '../../api';
import { SignupTypes } from '../../reducers/auth/signup';
import STRINGS from '../../constants/Strings';
import URLS from '../../constants/Urls';
import ENUM from '../../constants/Enum';
import { regenerateTokenTypes } from '../../reducers/auth/regenerateToken';


function* singUp(payload) {
    try {
        yield put({ type: SignupTypes.GOOGLE_SIGNUP_INDICATOR })
        let body = payload?.requestParam;
        let token = "";
        let contentType = "x-www-form-urlencoded";
        console.log("payload",payload?.requestParam)
        const response = yield call(makeGetApiCallWithoutStatus, URLS.GOOGLE_REGISTER, body, token, contentType);
        if (response.status === 200) {
            yield put({ type: SignupTypes.GOOGLE_SIGNUP_SUCCESS, response });
        } else {
            yield put({ type: SignupTypes.GOOGLE_SIGNUP_FAILED, message: response.message });
        }
    } catch (e) {
        console.warn("error signUp>>", e)
        yield put({ type: SignupTypes.GOOGLE_SIGNUP_FAILED, message: STRINGS.LOADINGERROR });
    }
}

function* getRegenerateToken(payload) {
    try {
        yield put({ type: regenerateTokenTypes.REGENERATE_TOKEN_INDICATOR })
        let params = {};
        let token = payload.tokenDetail;
        
        const response = yield call(makeGetApiCallWithoutStatus, URLS.API_REGENERATE_TOKEN, params, token,);
        if (response.status === 200) {
            yield put({ type: regenerateTokenTypes.REGENERATE_TOKEN_SUCCESS, response });
        } else {
            yield put({ type: regenerateTokenTypes.REGENERATE_TOKEN_FAILED, message: response.message });
        }
    } catch (e) {
        yield put({ type: regenerateTokenTypes.REGENERATE_TOKEN_FAILED, message: STRINGS.LOADINGERROR });
    }
}

function* singUpSaga() {
    yield all([
        takeLatest(SignupTypes.GOOGLE_SIGNUP, singUp),
        takeLatest(regenerateTokenTypes.REGENERATE_TOKEN, getRegenerateToken)

    ])
}

export default singUpSaga;