import {PODCASTS} from '../Constants'
import {put, takeEvery,fork, call} from 'redux-saga/effects'
import API from '../Services/Api'

const api = API.create();

function* fetchPodcasts(action) {
    try {
        const response = yield call(api.getPodCasts);
        if (response.ok) {
            const responseData = response.data;
            const data = responseData.posts;
          //  alert(JSON.stringify(data));
            yield put({type: PODCASTS.SUCCESS, data})
        } else {
            yield put({type: PODCASTS.FAILURE})
        }
    } catch (e) {
        yield put({type: PODCASTS.FAILURE})
    }
}

function* podcastSaga() {
    yield takeEvery(PODCASTS.REQUEST, fetchPodcasts)
}

export default function* root() {
    yield fork(podcastSaga);
}
