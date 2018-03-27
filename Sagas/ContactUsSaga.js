import {CONTACT_US} from '../Constants'
import {put, takeEvery,fork, call} from 'redux-saga/effects'
import API from '../Services/Api'

const api = API.create();

function* contactUs(action) {
    try {
        const response = yield call(api.getPosts);
        if (response.ok) {
            const responseData = response.data;
            const data = responseData.posts;
            //    alert(JSON.stringify(data));
            yield put({type: CONTACT_US.SUCCESS, data})
        } else {
            yield put({type: CONTACT_US.FAILURE})
        }
    } catch (e) {
        yield put({type: CONTACT_US.FAILURE})
    }
}

function* contactUsSaga() {
    yield takeEvery(CONTACT_US.REQUEST, contactUs)
}

export default function* root() {
    yield fork(contactUsSaga);
}
