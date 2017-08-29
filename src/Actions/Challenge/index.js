const json = require('../../../app.json')
const IP_ADDRESS = json.ip 

import {
    REQUEST_CHALLENGES,
    RECEIVE_CHALLENGES
} from '../ActionCreators'

function requestChallenges() {
    return {
        type: REQUEST_CHALLENGES
    }
}

function receiveChallenges(challenges, currentPagination) {
    return {
        type: RECEIVE_CHALLENGES,
        challenges: challenges,
        pagination: currentPagination
    }
}

function fetchChallenges(position, pagination = 0) {
    // console.log("fetching... CHALLENGES", pagination)
    let Longitute = ''
    let Latitude = ''
    if (position && typeof position == "object") {
        Longitute = position.coords.longitude
        Latitude = position.coords.latitude
    }
    return dispatch => {
        dispatch(requestChallenges())
        
        return fetch(`${IP_ADDRESS}/challenge/${pagination}?Longitude=${Longitute}&Latitude=${Latitude}`,        
        { credentials: 'include' })    
        .then(res => {
            if (res.ok) return res.json()
            
            throw new TypeError("Oops, probably a 404!");
        })
        .then(( resJson ) => {
            const { challenges } = resJson
            let sortedChallenges = sortChallengesByVotes(challenges)
            
            return dispatch(receiveChallenges(sortedChallenges, pagination))
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function shouldFetchChallenges(state) {
  const challenges = state.challenge.items

  if (state.challenge.isFetching ) {
    return false
  } else if (!state.challenge.moreItemsToFetch) {
      return false
  } else {
    return true
  }
}

export function fetchChallengesIfNeeded(position, pagination) {
    return (dispatch, getState) => {
        if (shouldFetchChallenges(getState())) {
            return dispatch(fetchChallenges(position, pagination))
        }
    }
}

function sortChallengesByVotes(challenges) {
    return challenges.sort((a, b) => b.votes.length - a.votes.length)
}



