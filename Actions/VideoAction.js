import { VIDEOS } from '../Constants'

export function fetchVideosAction() {
    return {
        type: VIDEOS.REQUEST
    }
}