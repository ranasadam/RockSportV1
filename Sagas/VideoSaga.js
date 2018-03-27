import {VIDEOS} from '../Constants'
import {put, takeEvery,fork, call} from 'redux-saga/effects'
import API from '../Services/Api'

const api = API.create();

function* fetchVideos(action) {
    try {
        const response = yield call(api.getVideos);
        if (response.ok) {
            const responseData = response.data;
            const data = responseData.posts;
            //  alert(JSON.stringify(data));
            yield put({type: VIDEOS.SUCCESS, data})
        } else {
            yield put({type: VIDEOS.FAILURE})
        }
    } catch (e) {
        yield put({type: VIDEOS.FAILURE})
    }
}

function* videoSaga() {
    yield takeEvery(VIDEOS.REQUEST, fetchVideos)
}

export default function* root() {
    yield fork(videoSaga);
}
