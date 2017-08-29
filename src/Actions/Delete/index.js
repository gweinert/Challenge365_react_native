const json = require('../../../app.json')
const IP_ADDRESS = json.ip 

import {
    REQUEST_REMOVE_RESOURCE,
    REMOVE_RESOURCE_SUCCESS,
    REMOVE_RESOURCE_FAIL,
} from '../ActionCreators'

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

function removeResource({resource, id, formData}, cb) {
    return dispatch => {
        dispatch(requestRemoveResource())

        return fetch(`${IP_ADDRESS}/${resource}/remove/${id}`,
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
                cb()
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

export function removeResourceSafely(resourceInfo, cb = () => {}) {
    return (dispatch, getState) => {
        if (shouldRemoveResource(getState())) {
            return dispatch(removeResource(resourceInfo, cb))
        }
    }
}