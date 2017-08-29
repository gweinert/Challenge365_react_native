const json = require('../../../app.json')
const IP_ADDRESS = json.ip 
// user challenges and replies
import {
    REQUEST_USER_CHALLENGES, 
    RECEIVE_USER_CHALLENGES,
    REQUEST_USER_REPLIES,
    RECEIVE_USER_REPLIES,
    REQUEST_USER_PROFILE,
    RECEIVE_USER_PROFILE
} from '../ActionCreators'

//get users challenges and replies
function requestUserChallenges() {
    return {
        type: REQUEST_USER_CHALLENGES
    }
}

function receiveUserChallenges(id, data) {
    return {
        type: RECEIVE_USER_CHALLENGES,
        id,
        data
    }
}

function requestUserReplies() {
    return {
        type: REQUEST_USER_REPLIES
    }
}

function receiveUserReplies(data) {
    return {
        type: RECEIVE_USER_REPLIES,
        data
    }
}


// hit two endpoints

function fetchUserChallenges(id) {    
    
    return dispatch => {
        dispatch(requestUserChallenges())
        
        return fetch(`${IP_ADDRESS}/challenge/0?UserID=${id}`,        
        { credentials: 'include' })    
        .then(res => {
            if (res.ok) return res.json()

            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            const { data } = resJson
            return dispatch(receiveUserChallenges(id, data))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function fetchUserReplies(id) {
    return dispatch => {
        dispatch(requestUserReplies())
        
        return fetch(`${IP_ADDRESS}/reply/getUser/${id}`,
        { credentials: 'include' })    
        .then(res => {
            if (res.ok) return res.json()

            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            const { data } = resJson
            
            return dispatch(receiveUserReplies(data))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldFetchUserChallenges(state) {
    const { user } = state
    if (user.isFetchingChallenges) {
        return false
    } else return true
}

export function fetchUserChallengesIfNeeded(id, token) {
    return (dispatch, getState) => {
        if (shouldFetchUserChallenges(getState())) {
            return dispatch(fetchUserChallenges(id))
        }
    }

}

function shouldFetchUserReplies(state) {
    const { user } = state
    if (user.isFetchingReplies) {
        return false
    } else return true
}

export function fetchUserRepliesIfNeeded(id, token) {
    return (dispatch, getState) => {
        if (shouldFetchUserReplies(getState())) {
            return dispatch(fetchUserReplies(id))
        }
    }

}



///get user details of someone other than current user

function requestUserProfile() {
    return {
        type: REQUEST_USER_PROFILE
    }
}

function receiveUserProfile(id, profile) {
    return {
        type: RECEIVE_USER_PROFILE,
        profile
    }
}

function fetchUserProfile(id, token) {
    return dispatch => {
        dispatch(requestUserProfile())
        
        const headerOptions = new Headers({"access_token": token})
        const options = { 
            headers: headerOptions,
            credentials: "include"
        }
        
        return fetch(`${IP_ADDRESS}/user/detail/${id}`, options)
        .then(res => {
            if (res.ok) return res.json()

            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            const { data } = resJson
            return dispatch(receiveUserProfile(id, data))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldFetchUserProfile(state) {
    const { user } = state

    if (user.isFetchingProfile) {
        return false
    } else return true
}

export function fetchUserProfileIfNeeded(id, token) {
    return (dispatch, getState) => {
        if (shouldFetchUserProfile(getState())) {
            return dispatch(fetchUserProfile(id, token))
        }
    }
}