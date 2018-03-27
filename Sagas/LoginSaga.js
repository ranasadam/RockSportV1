import {LOGIN} from '../Constants'
import {call, fork, put, takeEvery} from 'redux-saga/effects'
import API from '../Services/Api'
import {loginFailure, loginSuccess} from "../Actions";
import {NavigationActions} from 'react-navigation';
const api = API.create();
const err = 'Login Failed';

function* login(action) {
    try {
        const email = action.email;
        const password = action.password;

        const payload = {
            email,
            password,
        }
        const response = yield call(api.login, payload);
      //  alert(JSON.stringify(response))
        if (response.ok) {
            const data = response.data;
            if (data.status === "ok") {
                yield put(loginSuccess(data.cookie, data.user));
            } else {
                yield put(loginFailure('Invalid user name and/or password'));
            }

        } else {
            yield put(loginFailure(err))
        }
    } catch (e) {
        yield put(loginFailure(err))
    }
}

function* loginSaga() {
    yield takeEvery(LOGIN.REQUEST, login)
}

export default function* root() {
    yield fork(loginSaga);
}

