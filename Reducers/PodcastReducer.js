import { PODCASTS } from '../Constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case PODCASTS.REQUEST:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case PODCASTS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case PODCASTS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
