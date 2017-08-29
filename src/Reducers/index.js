import { combineReducers }      from 'redux';
import { NavigationActions }    from 'react-navigation';
import { AppNavigator }         from '../Navigators';
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
    REQUEST_FETCH_RESOURCE,
    FETCH_RESOURCE_SUCCESS,
    FETCH_RESOURCE_FAIL,
    REQUEST_USER_DETAILS,
    RECEIVE_USER_DETAILS,
    LOGGING_IN
}                   from '../Actions/ActionCreators'

import challenge    from './challenge'
import auth         from './auth'
import user         from './user'


//Start with home screen
// const firstAction = AppNavigator.router.getActionForPathAndParams('Main')
// console.log("firstAction", firstAction)
// const tempNavState = AppNavigator.router.getStateForAction(firstAction)
// console.log("templNavState", tempNavState)
// const secondAction = AppNavigator.router.getActionForPathAndParams('Home')
// const initialNavState = AppNavigator.router.getStateForAction(
//     secondAction,
//     tempNavState
// )

const firstAction = AppNavigator.router.getActionForPathAndParams('Login')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)



// const secondAction = AppNavigator.router.getActionForPathAndParams('Home')
// const initialNavState = AppNavigator.router.getStateForAction(
//     secondAction,
//     tempNavState
// )

function nav(state = initialNavState, action) {
// function nav(state, action) {
    
    // let nextState
    // switch(action.type) {
    //     case: 'Home': 
    //         nextState = AppNavigator.router.
    // }
    const nextState = AppNavigator.router.getStateForAction(action, state)
    // console.log("NAV", nextState)

    return nextState || state
}

const AppReducer = combineReducers({
    nav,
    challenge: challenge,
    auth: auth,
    user: user
})

export default AppReducer