import {combineReducers} from 'redux';
import postData from './PostReducer';
import podcastData from './PodcastReducer';
import loginData from './LoginReducer';
import signUpData from './SignUpReducer';
import navigatorState from './StateReducer';
import userMetaData from './UserMetaReducer';
import showData from './ShowReducers';
import videoData from './VideoReducers';
import contactUsData from './ContactUsReducer';
import sponsorsData from './SponsorsReducer';

export default combineReducers({
    postData, loginData, podcastData, signUpData,userMetaData,navigatorState, showData,videoData,contactUsData,sponsorsData,
});
