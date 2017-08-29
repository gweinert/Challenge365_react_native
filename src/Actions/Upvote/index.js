const json = require('../../../app.json')
const IP_ADDRESS = json.ip 

import {
    REQUEST_CREATE_UPVOTE,
    CREATE_CHALLENGE_UPVOTE_SUCCESS,
    CREATE_REPLY_UPVOTE_SUCCESS,
    CREATE_UPVOTE_FAIL
} from '../ActionCreators'

function requestCreateUpvote() {
    return {
        type: REQUEST_CREATE_UPVOTE
    }
}

function createChallengeUpvoteSuccess(upvote) {
    return {
        type: CREATE_CHALLENGE_UPVOTE_SUCCESS,
        upvote
    }
}

function createReplyUpvoteSuccess(upvote) {
    return {
        type: CREATE_REPLY_UPVOTE_SUCCESS,
        upvote
    }
}

function createUpvoteFail(err) {
    return {
        type: CREATE_UPVOTE_FAIL,
        err
    }
}

function createUpvote(upvote) {
    
    let {
        type,
        userID,
        id,
        subId // might be undefined need to check...
    } = upvote
    subId = subId == undefined ? '' : subId
    const formData = new FormData()
    formData.append("UserID", userID)

    return dispatch => {
        dispatch(requestCreateUpvote())

        return fetch(`${IP_ADDRESS}/upvote/${type}/${id}/${subId}`,        
        { 
            credentials: 'include',
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(( resJson ) => {
            if(resJson.success == 1){
                if (type == 'challenge') {
                    return dispatch(createChallengeUpvoteSuccess({res: resJson, type: type, id: id, subId: subId}))
                } else if (type == 'reply') {
                    return dispatch(createReplyUpvoteSuccess({res: resJson, type: type, id: id, subId: subId}))
                } else dispatch(createUpvoteFail({res: resJson}))
            }
            return dispatch(createUpvoteFail({res: resJson}))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function userVoted(state, upvote) {
    
    // id is challenge id
    const { type, id } = upvote
    let voted = false

    state.challenge.items.filter(challengeItem => challengeItem._id == id)
    .every(challengeItem => {
        
        voted = challengeItem.votes.some( vote => vote.userID == state.auth.profile._id)

        if (voted && type == 'challenge') return false

        if (type == 'reply') {
            const reply = challengeItem.replies.find(reply => reply._id == upvote.subId)
                
            voted = reply.votes.some(vote => vote.userID == state.auth.profile._id)
                
            if (voted) return false
        }
    })

    console.log("uvser voted state", state)
    console.log("user voted upvote", upvote)
    console.log("user voted...", voted)

    return voted
}

function shouldCreateUpvote(state, upvote) {
    // console.log("should post upvote...")
    if (state.challenge.upvoteIsPosting) {
        return false
    } else if (userVoted(state, upvote)) {
        return false
        //return true// remove this used for testing
    } else return true
}

export function createUpvoteIfNotPosting(upvote) {
    return (dispatch, getState) => {
        if (shouldCreateUpvote(getState(), upvote)) {
            return dispatch(createUpvote(upvote))
        }
    }
}