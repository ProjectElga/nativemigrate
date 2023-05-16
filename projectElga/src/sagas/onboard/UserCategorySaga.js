import { call, put, select, all, takeLatest } from 'redux-saga/effects';

import { makeGetApiCall, makePostApiCall } from '../../api';
import STRINGS from '../../constants/Strings';
import URLS from '../../constants/Urls';
import { categoryTypes } from '../../reducers/onboard/userCategory';


function* getCategoryList(payload) {
    try {
        yield put({ type: categoryTypes.GET_USER_CATEGORY_LIST_INDICATOR })
        let params = {
            id: payload.userId,
            isCreator: payload.isCreator
        }
        const token = payload.tokenDetail;
        console.log("params category",params);
        console.log("token category",token);
        const response = yield call(makeGetApiCall, URLS.API_FETCH_USER_CATEGORY, params, token);
        if (typeof response.status !== 'undefined' && response.status) {
            yield put({ type: categoryTypes.GET_USER_CATEGORY_LIST_SUCCESS, response });
        } else {
            yield put({ type: categoryTypes.GET_USER_CATEGORY_LIST_FAILED, message: response.message });
        }
    } catch (e) {
        yield put({ type: categoryTypes.GET_USER_CATEGORY_LIST_FAILED, message: STRINGS.LOADINGERROR });
    }
}
function* assignSubCategory(payload) {
    try {
        yield put({ type: categoryTypes.ASSIGN_SUB_CATEGORIES_INDICATOR })
        let params = {
            id:  payload.userId ,
            isCreator: payload.isCreator,
            displayName: payload?.displayName
        }
        let body = payload.requestBody
        const token = payload.tokenDetail 
        const response = yield call(makePostApiCall, URLS.API_ASSIGN_SUBCATEGORIES, body, token, params);
        if (typeof response.status !== 'undefined' && response.status) {
            yield put({ type: categoryTypes.ASSIGN_SUB_CATEGORIES_SUCCESS, response });
        } else {
            yield put({ type: categoryTypes.ASSIGN_SUB_CATEGORIES_FAILED, message: response.message });
        }
    } catch (e) {
        yield put({ type: categoryTypes.ASSIGN_SUB_CATEGORIES_FAILED, message: STRINGS.LOADINGERROR });
    }
}


function* UserCategorySaga() {
    yield all([
        takeLatest(categoryTypes.GET_USER_CATEGORY_LIST, getCategoryList),
        takeLatest(categoryTypes.ASSIGN_SUB_CATEGORIES, assignSubCategory)
    ])
}

export default UserCategorySaga;