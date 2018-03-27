import {fork} from 'redux-saga/effects'

import postSaga from './PostSaga';
import loginSaga from "./LoginSaga";
import podcastSaga from "./PodcastSaga";

import userMetaSaga from "./UserMetaSaga";

import signUpSaga from "./SignUpSaga";
import showSaga from "./ShowSaga";
import videoSaga from "./VideoSaga";
import contactUs from "./ContactUsSaga";
import sponsors from "./SponsorsSaga";


export default function* root() {
    yield fork(postSaga);
    yield fork(loginSaga);
    yield fork(podcastSaga);
    yield fork(userMetaSaga);
    yield fork(signUpSaga);
    yield fork(showSaga);
    yield fork(videoSaga);
    yield fork(contactUs);
    yield fork(sponsors);


}
