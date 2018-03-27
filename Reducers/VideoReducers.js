import { VIDEOS } from '../Constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function dataReducer (state = initialState, action) {
    switch (action.type) {
        case VIDEOS.REQUEST:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case VIDEOS.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case VIDEOS.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
