import {SHOWS} from '../Constants'
import {put, takeEvery,fork, call} from 'redux-saga/effects'
import API from '../Services/Api'

const api = API.create();

function* fetchShows(action) {
    try {
        const response = yield call(api.getShows);
        if (response.ok) {
            const responseData = response.data;
            const data = responseData.posts;
            //  alert(JSON.stringify(data));
            yield put({type: SHOWS.SUCCESS, data})
        } else {
            yield put({type: SHOWS.FAILURE})
        }
    } catch (e) {
        yield put({type: SHOWS.FAILURE})
    }
}

function* showsSaga() {
    yield takeEvery(SHOWS.REQUEST, fetchShows)
}

export default function* root() {
    yield fork(showsSaga);
}
