import { SHOWS } from '../Constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function dataReducer (state = initialState, action) {
    switch (action.type) {
        case SHOWS.REQUEST:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case SHOWS.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case SHOWS.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
