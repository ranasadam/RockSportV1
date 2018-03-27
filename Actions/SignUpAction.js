import {SIGNUP} from '../Constants'

export function signUpRequest(userName, email, password, nOnce, dob, sex, mobile) {
    return {
        type: SIGNUP.REQUEST,
        userName,
        email,
        password,
        nOnce,
        dob,
        sex,
        mobile,
    }
}

export function signUpSuccess(cookie, user) {
    return {
        type: SIGNUP.SUCCESS,
        cookie,
        user,
    }
}

export function signUpFailure(errorMessage) {
    return {
        type: SIGNUP.FAILURE,
        errorMessage,
    }
}