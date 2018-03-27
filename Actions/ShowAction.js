import { SHOWS } from '../Constants'

export function fetchShowsAction() {
    return {
        type: SHOWS.REQUEST
    }
}