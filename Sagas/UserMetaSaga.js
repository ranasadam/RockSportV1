import {USER_META} from '../Constants'
import {put, take, takeEvery, fork, call} from 'redux-saga/effects'
import API from '../Services/Api'
import {signUpFailure, signUpSuccess, userMetaFailure, userMetaSuccess} from "../Actions";

const api = API.create();
const err = "Signup Failed";

function* userMetaSaga() {
    try {
        const {cookie, mobile, sex, dob} = yield take(USER_META.REQUEST);
        const payload = {
            cookie,
            mobile,
            sex,
            dob,
        }
        const response = yield call(api.userMeta,payload);
        if (response.ok) {
            const data = response.data;
            if (data.status === "ok") {
                yield put(userMetaSuccess())
            } else
                yield put(userMetaFailure('Failed to update'))
        } else {
            yield put(userMetaFailure(err))
        }
    } catch (e) {
        yield put(userMetaFailure(USER_META.FAILURE, err))
    }
}

export default function* root() {
    yield fork(userMetaSaga);
}

