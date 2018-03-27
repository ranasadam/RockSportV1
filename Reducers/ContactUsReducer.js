import { CONTACT_US } from '../Constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function contactUsReducer (state = initialState, action) {
    switch (action.type) {
        case CONTACT_US.REQUEST:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case CONTACT_US.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case CONTACT_US.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
