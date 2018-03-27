import {USER_META} from '../Constants'

export function userMetaRequest(cookie, mobile, sex, dob) {
    return {
        type: USER_META.REQUEST,
        cookie,
        mobile,
        sex,
        dob,
    }
}

export function userMetaSuccess() {
    return {
        type: USER_META.SUCCESS,
    }
}

export function userMetaFailure(err) {
    return {
        type: USER_META.FAILURE,
        err,
    }
}