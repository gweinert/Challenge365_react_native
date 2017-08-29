import {
    REQUEST_USER_DETAILS,
    RECEIVE_USER_DETAILS,
    LOGGING_IN,
    LOGOUT_USER,
    REQUEST_CREATE_BOOKMARK,
    CREATE_BOOKMARK_SUCCESS,
    CREATE_BOOKMARK_FAIL,
    REQUEST_DELETE_BOOKMARK,
    DELETE_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_FAIL
} from '../Actions/ActionCreators'

export default function auth(
    state = {
        isLoggedIn: false,
        isFetchingUser: false,
        isPosting: false,
        profile: {}
    },
    action) {
    
    switch(action.type) {
        // case LOGGING_IN:
        //     return Object.assign({}, state, {
        //         isLoggedIn: true,
        //         profile: action.profile
        //     })
        case LOGOUT_USER:
            return {...state, isLoggedIn: false, profile: {}}
        case REQUEST_USER_DETAILS:
            return {...state, isFetchingUser: true}
        case RECEIVE_USER_DETAILS:
            return { 
                ...state, 
                isLoggedIn: true, 
                isFetchingUser: false,
                profile: action.profile
            }
        case REQUEST_CREATE_BOOKMARK: 
            return Object.assign({}, state, {
                isPosting: true
            })
        case CREATE_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                profile: {...state.profile, bookmarkedChallenges: [...state.profile.bookmarkedChallenges, action.bookmark]}
            })
        case CREATE_BOOKMARK_FAIL: 
            return Object.assign({}, state, {
                isPosting: false
            })
        case REQUEST_DELETE_BOOKMARK:
            return Object.assign({}, state, {
                isPosting: true
            })
        case DELETE_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                profile: {
                    ...state.profile, 
                    bookmarkedChallenges: state.profile.bookmarkedChallenges.filter(challengeId => challengeId !== action.bookmark)
                }
            })
        case DELETE_BOOKMARK_FAIL: 
            return Object.assign({}, state, {
                isPosting: false
            })
        default: return state
    }
}