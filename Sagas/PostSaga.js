import {POSTS} from '../Constants'
import {put, takeEvery,fork, call} from 'redux-saga/effects'
import API from '../Services/Api'

const api = API.create();

function* fetchPosts(action) {
    try {
        const response = yield call(api.getPosts);
        if (response.ok) {
            const responseData = response.data;
            const data = responseData.posts;
        //    alert(JSON.stringify(data));
            yield put({type: POSTS.SUCCESS, data})
        } else {
            yield put({type: POSTS.FAILURE})
        }
    } catch (e) {
        yield put({type: POSTS.FAILURE})
    }
}

function* postSaga() {
    yield takeEvery(POSTS.REQUEST, fetchPosts)
}

export default function* root() {
    yield fork(postSaga);
}
