import {SELECT_PODCAST, SELECT_POST, SELECTED_SHOW, SELECTED_VIDEO, TOGGLE_MENU,TOGGLE_RADIO,RADIO_READY} from '../Constants';

export const selectPost = payload => ({type: SELECT_POST, payload});
export const selectPodcast = payload => ({type: SELECT_PODCAST, payload});
export const selectShow = payload => ({type: SELECTED_SHOW, payload});
export const selectVideo = payload => ({type: SELECTED_VIDEO, payload});
export const toggleMenuAction = payload => ({type: TOGGLE_MENU, payload});
export const toggleLiveRadioAction = () => ({type: TOGGLE_RADIO});
export const liveRadioReadyAction = payload => ({type: RADIO_READY,payload});
