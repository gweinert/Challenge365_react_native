const json = require('../../../app.json')
const IP_ADDRESS = json.ip 

import {
    REQUEST_CREATE_RESOURCE,
    CREATE_RESOURCE_SUCCESS,
    CREATE_RESOURCE_FAIL
} from '../ActionCreators'

function requestCreateResource() {
    return {
        type: REQUEST_CREATE_RESOURCE
    }
}

function createResourceSuccess(resource) {
    return {
        type: CREATE_RESOURCE_SUCCESS,
        resource
    }
}

function createResourceFail() {
    return {
        type: CREATE_RESOURCE_FAIL
    }
}

function createResource(resource, formData) {
    return dispatch => {
        dispatch(requestCreateResource())

        return fetch(`${IP_ADDRESS}/${resource}`,
        { 
            credentials: 'include',
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new TypeError("Oops, probably a 404!");
            
        })
        .then(( resJson ) => {
            if(resJson.success == 1){
                return dispatch(createResourceSuccess({res: resJson}))
                // if (type == 'challenge') {
                //     return dispatch(createChallengeUpvoteSuccess({res: resJson, type: type, id: id, subId: subId}))
                // } else if (type == 'reply') {
                //     return dispatch(createReplyUpvoteSuccess({res: resJson, type: type, id: id, subId: subId}))
                // } else dispatch(createUpvoteFail({res: resJson}))
            }
            return dispatch(createResourceFail())
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldCreateResource(state, resource) {
    if (state.challenge.isPosting) {
        return false
    } else return true
}

export function createResourceSafely(resource, data) {
    return (dispatch, getState) => {
        if (shouldCreateResource(getState(), resource)) {
            return dispatch(createResource(resource, data))
        }
    }
}