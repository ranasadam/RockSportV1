import { POSTS } from '../Constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case POSTS.REQUEST:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case POSTS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case POSTS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
