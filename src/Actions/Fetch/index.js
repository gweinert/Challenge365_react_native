const json = require('../../../app.json')
const IP_ADDRESS = json.ip 

import {
    REQUEST_FETCH_RESOURCE,
    FETCH_RESOURCE_SUCCESS,
    FETCH_RESOURCE_FAIL
} from '../ActionCreators'

function requestFetchResource() {
    return {
        type: REQUEST_FETCH_RESOURCE
    }
}

function fetchResourceSuccess(resource) {
    return {
        type: FETCH_RESOURCE_SUCCESS,
        resource
    }
}

function fetchResourceFail() {
    return {
        type: FETCH_RESOURCE_FAIL
    }
}

function fetchResource(resource, id) {

    return dispatch => {
        dispatch(requestFetchResource())
        
        return fetch(`${IP_ADDRESS}/${resource}/${id}`,
        { credentials: 'include' })    
        .then(res => {
            if (res.ok) return res.json()
            
            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            
            if (!resJson.success) {
                const { err } = resJson
                return dispatch(fetchResourceFail(err))
            }
            
            const { data } = resJson
            return dispatch(fetchResourceSuccess(data))

        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldFetchResource(state, resource) {
    if(state[resource].items.length < 1){
        return true
    }
    else if (state[resource].isFetching) {
        return false
    } else return false
}

export function fetchResourceIfNeeded(resource, id = '') {
    return (dispatch, getState) => {
        if (shouldFetchResource(getState(), resource)) {
            return dispatch(fetchResource(resource, id))
        }
    }
}