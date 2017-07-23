// ///////////////////////
// CHALLENGES
// ///////////////////////


export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES'
export const RECEIVE_CHALLENGES = 'RECEIVE_CHALLENGES'
export const REQUEST_CREATE_CHALLENGE = 'REQUEST_CREATE_CHALLENGE'
export const CREATE_CHALLENGE_SUCCESS = 'CREATE_CHALLENGE_SUCCESS'



function requestChallenges() {
    return {
        type: REQUEST_CHALLENGES
    }
}

function receiveChallenges(challenges) {
    return {
        type: RECEIVE_CHALLENGES,
        challenges: challenges
    }
}

function requestCreateChallenge() {
    return {
        type: REQUEST_CREATE_CHALLENGE
    }
}

function createChallengeSuccess(newChallenge) {
    return {
        type: CREATE_CHALLENGE_SUCCESS,
        challenge: newChallenge
    }
}

function fetchChallenges() {
    console.log("fetching...")
    return dispatch => {
        dispatch(requestChallenges())
        // return fetch(`http://localhost:3000/challenges`,
        return fetch(`http://192.168.0.102:3000/challenge`,        
        { credentials: 'include' })    
        .then(res => res.json())
        .then(( resJson ) => {
            const sortedChallenges = sortChallengesByVotes(resJson)
            return dispatch(receiveChallenges(sortedChallenges))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldFetchChallenges(state) {
    console.log("should fetch?", state)
  const challenges = state.challenges.items
  if (challenges.length < 1) {
    return true
  } else if (challenges.isFetching) {
    return false
  } else {
    // return challenges.didInvalidate
    return false
  }
}

function postChallenge(formData) {
    console.log("posting challenge...")
    return dispatch => {
        dispatch(requestCreateChallenge())

        return fetch(`http://192.168.0.102:3000/challenge`,        
        { 
            credentials: 'include',
            method: 'POST',
            body: formData 
        })
        .then(res => res.json())
        .then(( resJson ) => {
            const newChallenge = resJson.challenge
            return dispatch(createChallengeSuccess(newChallenge))
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
}

function shouldPostChallenge(state) {
    const { isPosting } = state.challenges
    if (isPosting) {
        return false
    } else return true
}

export function fetchChallengesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchChallenges(getState())) {
            return dispatch(fetchChallenges())
        }
    }
}

export function postChallengeIfNotPosting(formData) {
    return (dispatch, getState) => {
        if (shouldPostChallenge(getState())) {
            return dispatch(postChallenge(formData))
        }
    }
}

function sortChallengesByVotes(json) {
    const { challenges } = json
    return challenges.sort((a, b) => b.votes.length - a.votes.length)
}

// ///////////////////////
// AUTH
// ///////////////////////

export const LOGGING_IN = 'LOGGING_IN'
export const REQUEST_USER_DETAILS = 'REQUEST_USER_DETAILS' 
export const RECEIVE_USER_DETAILS = 'RECEIVE_USER_DETAILS' 


export const login = (profile) => {
    return {
        type: LOGGING_IN,
        profile
    }
}

export const requestUserDetails = () => {
    return {
        type: REQUEST_USER_DETAILS
    }
}

export const receiveUserDetails = (userDetails) => {
    return {
        type: RECEIVE_USER_DETAILS,
        profile: userDetails
    }
}

function fetchUserDetails(token) {
    return dispatch => {
        dispatch(requestUserDetails())
    
        return fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            dispatch(receiveUserDetails(json))   
        })
        .catch(() => {
            console.error('ERROR GETTING DATA FROM FACEBOOK')
        })
    }
}

function shouldFetchUserDetails (state) {
    if (state.auth.profile.name) {
        return false
    } else return true
}

export function fetchUserDetailsIfNeeded(token) {
    return (dispatch, getState) => {
        if (shouldFetchUserDetails(getState())) {
            return dispatch(fetchUserDetails(token))
        }
    }
}


//////////////////////////
//      UPVOTE          //
//////////////////////////

export const REQUEST_CREATE_UPVOTE              = 'REQUEST_CREATE_UPVOTE'
export const CREATE_CHALLENGE_UPVOTE_SUCCESS    = 'CREATE_UPVOTE_SUCCESS'
export const CREATE_REPLY_UPVOTE_SUCCESS        = 'REQUEST_CREATE_REPLY_UPVOTE_SUCCESS'
export const CREATE_UPVOTE_FAIL                 = 'CREATE_UPVOTE_FAIL'



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

        return fetch(`http://192.168.0.102:3000/upvote/${type}/${id}/${subId}`,        
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
                console.log("RESJSON", resJson)
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

    state.challenges.items.filter(challengeItem => challengeItem._id == id)
    .every(challengeItem => {
        
        voted = challengeItem.votes.some( vote => vote.userID == state.auth.profile.id)

        if (voted && type == 'challenge') return false

        if (type == 'reply') {
            challengeItem.replies.every(reply => {
                
                voted = reply.votes.some(vote => vote.userID == state.auth.profile.id)
                
                if (voted) return false
            })
        }
    })

    return voted
}

function shouldCreateUpvote(state, upvote) {
    if (state.challenges.upvoteIsPosting) {
        return false
    } else if (userVoted(state, upvote)) {
        // return false
        return true// remove this used for testing
    } else return true
}

export function createUpvoteIfNotPosting(upvote) {
    return (dispatch, getState) => {
        if (shouldCreateUpvote(getState(), upvote)) {
            return dispatch(createUpvote(upvote))
        }
    }
}


///////////////////////////
//       REPLY 
/////////////////////////
export const REQUEST_CREATE_REPLY = 'REQUEST_CREATE_REPLY'
export const CREATE_REPLY_SUCCESS = 'CREATE_REPLY_SUCCESS'
export const CREATE_REPLY_FAIL = 'CREATE_REPLY_FAIL'
export const REQUEST_DELETE_REPLY = 'REQUEST_DELETE_REPLY'
export const DELETE_REPLY_SUCCESS = 'DELETE_REPLY_SUCCESS'
export const DELETE_REPLY_FAIL = 'DELETE_REPLY_FAIL'

function requestCreateReply() {
    return {
        type: REQUEST_CREATE_REPLY
    }
}

function createReplySuccess(reply) {
    return {
        type: CREATE_REPLY_SUCCESS,
        reply
    }
}

function createReplyFail() {
    return {
        type: CREATE_REPLY_FAIL
    }
}

function requestDeleteReply() {
    return {
        type: REQUEST_DELETE_REPLY
    }
}

function deleteReplySuccess(reply) {
    return {
        type: DELETE_REPLY_SUCCESS,
        reply
    }
}

function deleteReplyFail() {
    return {
        type: DELETE_REPLY_FAIL
    }
}

function deleteReply(reply) {

    const { 
        userID,
        id     
    } = reply

    const formData = new FormData()
    formData.append("UserID", userID)
    
    return dispatch => {
        dispatch(requestD())

        return fetch(`http://192.168.0.102:3000/reply/delete/${id}`,
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
                return dispatch(deleteReplySuccess({res: resJson}))
            }
            return dispatch(deleteReplyFail({res: resJson}))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function createReply(formData) {

    
    return dispatch => {
        dispatch(requestCreateReply())

        return fetch(`http://192.168.0.102:3000/reply/`,
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
                return dispatch(createReplySuccess({res: resJson}))
            }
            return dispatch(createReplyFail({res: resJson}))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldPostReply(state) {
    if (state.challenges.isPosting) {
        return false
    } else return true
}

export function deleteReplySafely(reply) {
    return (dispatch, getState) => {
        if (shouldPostReply(getState())) {
            return dispatch(deleteReply(reply))
        }
    }
}

export function createReplyIfNotPosting(reply) {
    return (dispatch, getState) => {
        if (shouldPostReply(getState())) {
            return dispatch(createReply(reply))
        }
    }
}



////////////////////////
//       DELETE       //
///////////////////////
export const REQUEST_REMOVE_RESOURCE = 'REQUEST_REMOVE_RESOURCE'
export const REMOVE_RESOURCE_SUCCESS = 'REMOVE_RESOURCE_SUCCESS'
export const REMOVE_RESOURCE_FAIL    = 'REMOVE_RESOURCE_FAIL'

function requestRemoveResource() {
    return {
        type: REQUEST_REMOVE_RESOURCE
    }
}

function removeResourceSuccess(resource) {
    return {
        type: REMOVE_RESOURCE_SUCCESS,
        resource
    }
}

function removeResourceFail() {
    return  {
        type: REMOVE_RESOURCE_FAIL
    }
}

function removeResource({resource, id, formData}) {
    return dispatch => {
        dispatch(requestRemoveResource())

        return fetch(`http://192.168.0.102:3000/${resource}/remove/${id}`,
        { 
            credentials: 'include',
            method: 'POST',
            body: formData
        })
        .then(res => {
            console.log("res", res)
            if (res.ok) {
                return res.json()
            }

            throw new TypeError("Oops, probably a 404!");

        })
        .then(( resJson ) => {
            if(resJson.success == 1){
                return dispatch(removeResourceSuccess({res: resJson}))
            }
            return dispatch(removeResourceFail({res: resJson}))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldRemoveResource(state) {
    if(state.isPosting) {
        return false
    } else return true
}

export function removeResourceSafely(resourceInfo) {
    return (dispatch, getState) => {
        if (shouldRemoveResource(getState())) {
            return dispatch(removeResource(resourceInfo))
        }
    }
}

