import { SPONSORS } from '../Constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function sponsorsReducer (state = initialState, action) {
    switch (action.type) {
        case SPONSORS.REQUEST:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case SPONSORS.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case SPONSORS.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
