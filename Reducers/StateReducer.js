import {
    RADIO_READY,
    SELECT_PODCAST,
    SELECT_POST,
    SELECTED_SHOW,
    SELECTED_VIDEO,
    TOGGLE_MENU,
    TOGGLE_RADIO,
} from '../Constants';

const INITIAL_STATE = {
    selectedPost: null,
    selectedPodcast: null,
    selectedShow: null,
    selectedVideo: null,
    isSideMenuOpen: false,
    isLiveRadioPlaying: false,
    isLiveRadioReady: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_POST: {
            return {
                ...state,
                selectedPost: action.payload,
            };
        }
        case SELECT_PODCAST: {
            return {
                ...state,
                selectedPodcast: action.payload,
            };
        }
        case SELECTED_SHOW: {
            return {
                ...state,
                selectedShow: action.payload,
            };
        }
        case SELECTED_VIDEO: {
            return {
                ...state,
                selectedVideo: action.payload,
            };
        }
        case TOGGLE_MENU: {

            return {
                ...state,
                isSideMenuOpen: action.payload,
            }
        }
        case RADIO_READY: {

            return {
                ...state,
                isLiveRadioReady: action.payload,
            }
        }

        case TOGGLE_RADIO: {
            const isPlaying = state.isLiveRadioPlaying ? false : true

            return {
                ...state,
                isLiveRadioReady: true,
                isLiveRadioPlaying: isPlaying,
            }
        }
        default:
            return state;
    }
};
