import { combineReducers }      from 'redux';
import { NavigationActions }    from 'react-navigation';
import { AppNavigator }         from '../Navigators';
import {
    REQUEST_CHALLENGES,
    RECEIVE_CHALLENGES,
    REQUEST_CREATE_CHALLENGE,
    CREATE_CHALLENGE_SUCCESS,
    REQUEST_CREATE_UPVOTE,
    CREATE_CHALLENGE_UPVOTE_SUCCESS,
    CREATE_REPLY_UPVOTE_SUCCESS,
    CREATE_UPVOTE_FAIL,
    REQUEST_CREATE_REPLY,
    CREATE_REPLY_SUCCESS,
    CREATE_REPLY_FAIL,
    REQUEST_REMOVE_RESOURCE,
    REMOVE_RESOURCE_SUCCESS,
    REMOVE_RESOURCE_FAIL,
    REQUEST_USER_DETAILS,
    RECEIVE_USER_DETAILS,
    LOGGING_IN
} from '../Actions'


//Start with home screen
const firstAction = AppNavigator.router.getActionForPathAndParams('Home')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

function nav(state = initialNavState, action) {
    // let nextState
    // switch(action.type) {
    //     case: 'Home': 
    //         nextState = AppNavigator.router.
    // }
    const nextState = AppNavigator.router.getStateForAction(action, state)

    return nextState || state
}

function challenges(
    state = {
        isFetching: false,
        isPosting: false,
        upvoteIsPosting: false,
        items: []
    },
    action) {
    
    switch (action.type) {
        case REQUEST_CHALLENGES:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_CHALLENGES:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.challenges
            })
        case REQUEST_CREATE_CHALLENGE:
            return Object.assign({}, state, {
                isPosting: true
            })
        case CREATE_CHALLENGE_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                items: [...state.items, action.challenge]
            })
        case REQUEST_CREATE_UPVOTE: 
            return Object.assign({}, state, {
                upvoteIsPosting: true
            })
        case CREATE_CHALLENGE_UPVOTE_SUCCESS:
            return Object.assign({}, state, {
                upvoteIsPosting: false,
                items: state.items.map(item =>
                    (item._id == action.upvote.id)
                    ? {...item, votes: [ ...item.votes, action.upvote.res.newVote ] }
                    : item
                )
            })
        case CREATE_REPLY_UPVOTE_SUCCESS:
            return Object.assign({}, state, {
                upvoteIsPosting: false,
                items: state.items.map(item =>
                    (item._id == action.upvote.id)
                    ? {...item, replies: item.replies.map(reply =>
                        (reply._id == action.upvote.subId) 
                        ? {...reply, votes: [...reply.votes, action.upvote.res.newVote ] }
                        : reply 
                    )}
                    : item
                )
            })
        case CREATE_UPVOTE_FAIL:
            return Object.assign({}, state, {
                upvoteIsPosting: false
            })
        case REQUEST_CREATE_REPLY:
            return Object.assign({}, state, {
                isPosting: true
            })
        case CREATE_REPLY_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                items: state.items.map(item =>
                    (item._id == action.reply.res.challenge._id)
                    ? {...item, replies: [...item.replies, action.reply.res.reply] }
                    : item
                )
            })
        case CREATE_REPLY_FAIL:
            return Object.assign({}, state, {
                isPosting: false
            })
        case REQUEST_REMOVE_RESOURCE:
            return Object.assign({}, state, {
                isPosting: true
            })
        case REMOVE_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                items: removeResource(state.items, action)
            })
        case REMOVE_RESOURCE_FAIL: 
            return Object.assign({}, state, {
                isPosting: false
            })
        default: return state
    }
}


function auth(
    state = {
        isLoggedIn: false,
        profile: {}
    },
    action) {
    
    switch(action.type) {
        case LOGGING_IN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                profile: action.profile
            })
        case REQUEST_USER_DETAILS:
            return state
        case RECEIVE_USER_DETAILS:
            return { ...state, profile: action.profile }
        default: return state
    }
}

function removeResource(state, action) {
    const resourceData = action.resource.res

    if (resourceData.resource == 'challenge') {
        
        return state.filter(challenge => challenge._id != resourceData.id)
    
    } else if (resourceData.type == 'reply') {
    
        return state.map(challenge => 
            (challenge._id == resourceData.challengeID)
            ? {...challenge, replies: challenge.replies.filter(reply => reply._id != resourceData.id) }
            : challenge
        )
    
    } else return state
}


const AppReducer = combineReducers({
    nav,
    challenges,
    auth
})

export default AppReducer