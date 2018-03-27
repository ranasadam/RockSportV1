import { LOGIN} from '../Constants'

const initialState = {
    isAuthenticated: false,
    isFetching: false,
    failure:true,
    cookie: '',
    user: {},
    errorMessage: '',
};

export default function login(state = initialState, action) {
    switch(action.type) {
        case LOGIN.REQUEST:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isFetching: true,
                failure: false,
            });
        case LOGIN.SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isFetching: false,
                failure: false,
                cookie: action.cookie,
                user: action.user,
            });
        case LOGIN.FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isFetching: false,
                failure: true,
                errorMessage:action.errorMessage,
            });
        default:
            return state;
    }
}
