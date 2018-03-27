import { SIGNUP} from '../Constants'

const initialState = {
    isFetching: false,
    failure:true,
    cookie:'',
    userId: '',
    user:{},
    errorMessage: '',
};

export default function signup(state = initialState, action) {
    switch(action.type) {
        case SIGNUP.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                failure: false,
            });
        case SIGNUP.SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                failure: false,
                cookie: action.cookie,
                user:action.user,
            });
        case SIGNUP.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                failure: true,
                errorMessage:action.errorMessage
            });
        default:
            return state;
    }
}
