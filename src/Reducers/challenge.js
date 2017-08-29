import {
    REQUEST_CHALLENGES,
    RECEIVE_CHALLENGES,   
    REQUEST_CREATE_UPVOTE,
    CREATE_CHALLENGE_UPVOTE_SUCCESS,
    CREATE_REPLY_UPVOTE_SUCCESS,
    CREATE_UPVOTE_FAIL,
    REQUEST_CREATE_RESOURCE,
    CREATE_RESOURCE_SUCCESS,
    CREATE_RESOURCE_FAIL,
    REQUEST_REMOVE_RESOURCE,
    REMOVE_RESOURCE_SUCCESS,
    REMOVE_RESOURCE_FAIL,
} from '../Actions/ActionCreators'

export default function challenge(
    state = {
        isFetching: false,
        isPosting: false,
        upvoteIsPosting: false,
        items: [],
        pagination: 0,
        moreItemsToFetch: true
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
                items: [...state.items, ...action.challenges],
                pagination: action.pagination ? action.pagination + 1 : 1,
                moreItemsToFetch: action.challenges.length ? true : false //stops app from requesting empty resource
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
        case REQUEST_CREATE_RESOURCE:
            return Object.assign({}, state, {
                isPosting: true
            })
        case CREATE_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                items: createResource(state.items, action)
            })
        case CREATE_RESOURCE_FAIL: 
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



function createResource(state, action) {
    const resourceData = action.resource.res

    if (resourceData.hasOwnProperty('challenge') && resourceData.challenge.name) {
    
        return [...state, resourceData.challenge]
    
    } else if (resourceData.hasOwnProperty('reply')) {
    
        return state.map(challenge =>
            (challenge._id == resourceData.challenge._id)
            ? {...challenge, replies: [...challenge.replies, resourceData.reply] }
            : challenge
        )
    
    } else return state
}


function removeResource(state, action) {
    const resourceData = action.resource.res

    if (resourceData.resource == 'challenge') {
        
        return state.filter(challenge => challenge._id != resourceData.id)
    
    } else if (resourceData.resource == 'reply') {
    
        return state.map(challenge => 
            (challenge._id == resourceData.challengeID)
            ? {...challenge, replies: challenge.replies.filter(reply => reply._id != resourceData.id) }
            : challenge
        )
    
    } else return state
}