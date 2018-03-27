import {LOGIN} from '../Constants'

export function loginRequest(email, password) {
    return {
        type: LOGIN.REQUEST,
        email,
        password
    }
}

export function loginSuccess(cookie, user) {
    return {
        type: LOGIN.SUCCESS,
        cookie,
        user,
    }
}

export function loginFailure(errorMessage) {
    return {
        type: LOGIN.FAILURE,
        errorMessage,
    }
}

