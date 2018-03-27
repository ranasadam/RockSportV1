import { USER_META} from '../Constants'

const initialState = {
    isFetching: false,
    isCalled: false,
    failure:true,
    errorMessage: '',
};

export default function userMeta(state = initialState, action) {
    switch(action.type) {
        case USER_META.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                failure: false,
                isCalled: true,
            });
        case USER_META.SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                failure: false,
                isCalled: true,
            });
        case USER_META.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                failure: true,
                isCalled: true,
            });
        default:
            return state;
    }
}
