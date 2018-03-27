import {SIGNUP, LOGIN} from '../Constants'
import {put, take, takeEvery, fork, call} from 'redux-saga/effects'
import API from '../Services/Api'
import {loginFailure, loginSuccess, signUpFailure, signUpSuccess} from "../Actions";

const api = API.create();
const err = "Sign up Failed";

function* signUp(action) {
    try {
        const userName = action.userName;
        const email = action.email;
        const password = action.password;
        const nOnce = action.nOnce;
        const dob = action.dob;
        const sex = action.sex;
        const mobile = action.mobile;

        //Creating payload for sign up API call post data
        const signUpPayload = {
            userName,
            email,
            password,
            nOnce,
        }
        //API call for SignUp request and response
        const signUpResponse = yield call(api.signup, signUpPayload);
        if (signUpResponse.ok) {//check weather response code is 200 (OK)
            const signUpData = signUpResponse.data;
            if (signUpData.status === "ok") {//check response status to see if there was an error in pay load sent
                /*
                * Sign up was successful, user has been successfully registered
                * Take the credentials used for sign up and try to login
                * login is necessary to get user profile
                */
                //Creating payload for login API call post data
                const loginPayload = {
                    email,
                    password,
                }
                //API call for login request and response
                const loginResponse = yield call(api.login, loginPayload);
                if (loginResponse.ok) {//check weather response code is 200 (OK)
                    const loginData = loginResponse.data;
                    if (loginData.status === "ok") {//check response status to see if there was an error in pay load sent
                        let cookie = loginData.cookie
                        //Creating payload for user meta API call post data
                        const userMetaPayload = {
                            cookie,
                            mobile,
                            sex,
                            dob,
                        }
                        //API call for user meta request and response
                        yield call(api.userMeta, userMetaPayload);
                        yield put(signUpSuccess(cookie, loginData.user))
                    } else
                        yield put(signUpFailure(loginData.error))//error while trying to login after sign up
                } else
                    yield put(signUpFailure('Authentication Failure'))
            } else
                yield put(signUpFailure(signUpData.error))
        } else {
            yield put(signUpFailure(err))
        }
    } catch (e) {
        yield put(signUpFailure(SIGNUP.FAILURE, 'Something went wrong'))
    }
}

function* signUpSaga() {
    yield takeEvery(SIGNUP.REQUEST, signUp)
}

export default function* root() {
    yield fork(signUpSaga);
}

