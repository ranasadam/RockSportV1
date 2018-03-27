import {Dimensions} from "react-native";
import moment from "moment/moment";

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const USER_DATA_KEY = 'USER_DATA_KEY';
export const APP_NAME = "Rock Sport";
//Action Types
export const SELECT_POST = "selected_post";
export const SELECT_PODCAST = "select_podcast";
export const SELECTED_SHOW = "selected_show";
export const SELECTED_VIDEO = "selected_video";
export const TOGGLE_MENU = 'toggle_menu';
export const TOGGLE_RADIO = 'toggle_radio';
export const RADIO_READY = 'radio_ready';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const AdMobBannerID="ca-app-pub-3940256099942544/6300978111";
export const YOUTUBE_API_KEY = "AIzaSyAbjgji_zRU8ISqi82fr4MCdN0EUdKzvNw";
export const LIVE_STREAM_URL = "http://64.71.79.181:5106/stream.mp3";

// events
export const LOGIN = createRequestTypes('LOGIN');
export const SIGNUP = createRequestTypes('SIGNUP');
export const USER_META = createRequestTypes('USER_META');
export const PODCASTS = createRequestTypes('PODCASTS');
export const SHOWS = createRequestTypes('SHOWS');
export const POSTS = createRequestTypes('POSTS');
export const VIDEOS = createRequestTypes('VIDEOS');
export const CONTACT_US = createRequestTypes('CONTACT_US');
export const SPONSORS = createRequestTypes('SPONSORS');

function createRequestTypes(base) {
    const res = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
    return res;
}

export default function getDateDifferenceString(modified) {
    var momentDate = moment(modified);
    var modifiedDate = momentDate.toDate();
    var nowDate = new Date();

    var hours = Math.floor(Math.abs(nowDate - modifiedDate) / 36e5);
    if (hours <= 1) {
        return hours + " hour";
    } else if (hours < 24) {
        return hours + " hours"
    } else {
        var day = Math.floor(hours / 24);
        if (day <= 1) {
            return day + " day";
        } else {
            return day + " days"
        }
    }
}

