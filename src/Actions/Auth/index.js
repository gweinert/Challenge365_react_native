const json = require('../../../app.json')
const IP_ADDRESS = json.ip 

import {
    LOGGING_IN,
    LOGOUT_USER,
    REQUEST_USER_DETAILS,
    RECEIVE_USER_DETAILS,
    REQUEST_CREATE_BOOKMARK,
    CREATE_BOOKMARK_SUCCESS,
    CREATE_BOOKMARK_FAIL,
    REQUEST_DELETE_BOOKMARK,
    DELETE_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_FAIL,
} from '../ActionCreators'


// export const login = (profile) => {
//     return {
//         type: LOGGING_IN,
//         profile
//     }
// }

const requestUserDetails = () => {
    return {
        type: REQUEST_USER_DETAILS
    }
}

const receiveUserDetails = (userDetails) => {
    return {
        type: RECEIVE_USER_DETAILS,
        profile: userDetails
    }
}

function fetchUserDetailsAndRegister(token) {
    return dispatch => {
        dispatch(requestUserDetails())

        const headerOptions = new Headers({"access_token": token})
        const options = { headers: headerOptions }

        return fetch(`${IP_ADDRESS}/auth/facebook/token`, options)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new TypeError("Oops, probably a 404!");
        })
        .then(resJson => {
            if (resJson.success) {
                dispatch(receiveUserDetails({...resJson.user, token}))
            }
        }).catch((error) => {
            console.error(error);
        })
    }
}

function shouldFetchUserDetails (state) {
    if (state.auth.profile.displayName) {
        return false
    } else return true
}

export function fetchUserDetailsIfNeeded(token) {
    return (dispatch, getState) => {
        if (shouldFetchUserDetails(getState())) {
            return dispatch(fetchUserDetailsAndRegister(token))
        }
    }
}

export function logout() {
    return {
        type: LOGOUT_USER
    }
}


////////////////////////////
//      BOOKMARK          //
////////////////////////////


function requestCreateBookmark() {
    return {
        type: REQUEST_CREATE_BOOKMARK
    }
}

function createBookmarkSuccess(challengeId) {
    return {
        bookmark: challengeId,
        type: CREATE_BOOKMARK_SUCCESS
    }
}

function createBookmarkFail() {
    return {
        type: CREATE_BOOKMARK_FAIL
    }
}

function createBookmark(formData, id) {
    console.log("CRETEBOOKMARK")
    return dispatch => {
        dispatch(requestCreateBookmark())
        
        return fetch(`${IP_ADDRESS}/user/bookmark/${id}`,
        { 
            credentials: 'include',
            method: 'POST',
            body: formData
        })    
        .then(res => {
            if (res.ok) return res.json()
            
            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            
            if (!resJson.success) {
                const { err } = resJson
                return dispatch(createBookmarkFail(err))
            }
            
            const { data } = resJson
            return dispatch(createBookmarkSuccess(data))

        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldCreateBookMark(state, id) {
    if(state.auth.isPosting) {
        return false
    } else if (state.auth.profile.bookmarkedChallenges.indexOf(id) > -1) {
        return false
    }else return true
}

export function createBookmarkSafely(formData, id) {
    return (dispatch, getState) => {
        if (shouldCreateBookMark(getState(), id)) {
            return dispatch(createBookmark(formData, id))
        }
    }
}


//delete bookmark
function requestDeleteBookmark() {
    return {
        type: REQUEST_DELETE_BOOKMARK
    }
}

function deleteBookmarkSuccess(challengeId) {
    return {
        bookmark: challengeId,
        type: DELETE_BOOKMARK_SUCCESS
    }
}

function deleteBookmarkFail() {
    return {
        type: DELETE_BOOKMARK_FAIL
    }
}

function deleteBookmark(formData, id) {
    return dispatch => {
        dispatch(requestDeleteBookmark())
        
        return fetch(`${IP_ADDRESS}/user/bookmark/delete/${id}`,
        { 
            credentials: 'include',
            method: 'POST',
            body: formData
        })    
        .then(res => {
            if (res.ok) return res.json()
            
            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            
            if (!resJson.success) {
                const { err } = resJson
                return dispatch(deleteBookmarkFail(err))
            }
            
            const { data } = resJson
            return dispatch(deleteBookmarkSuccess(data))

        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldDeleteBookmark(state) {
    if (state.isPosting) {
        return false
    } else return true
}

export function deleteBookmarkSafely(formData, id) {
    return (dispatch, getState) => {
        if (shouldDeleteBookmark(getState())) {
            return dispatch(deleteBookmark(formData, id))
        }
    }
}