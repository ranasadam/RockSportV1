import {SPONSORS} from '../Constants'
import {put, takeEvery,fork, call} from 'redux-saga/effects'
import API from '../Services/Api'

const api = API.create();

function* fetchSponsors(action) {
    try {
        const response = yield call(api.getSponsors);
        if (response.ok) {
            const responseData = response.data;
            const data = responseData.posts;
            yield put({type: SPONSORS.SUCCESS, data})
        } else {
            yield put({type: SPONSORS.FAILURE})
        }
    } catch (e) {
        yield put({type: SPONSORS.FAILURE})
    }
}

function* sponsorsSaga() {
    yield takeEvery(SPONSORS.REQUEST, fetchSponsors)
}

export default function* root() {
    yield fork(sponsorsSaga);
}
