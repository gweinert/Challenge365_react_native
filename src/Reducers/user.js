import {
    REQUEST_FETCH_RESOURCE,
    FETCH_RESOURCE_SUCCESS,
    FETCH_RESOURCE_FAIL,
    REQUEST_USER_CHALLENGES,
    RECEIVE_USER_CHALLENGES,
    REQUEST_USER_REPLIES,
    RECEIVE_USER_REPLIES,
    REQUEST_USER_PROFILE,
    RECEIVE_USER_PROFILE,
}  from '../Actions/ActionCreators'

export default function user(
    state = {
        isFetching: false,
        isFetchingChallenges: false,
        isFetchingReplies: false,
        isFetchingProfile: false,
        currentDetail: {
            challenges: [],
            replies: [],
            id: null,
            profile: null
        }
    }, 
    action) {
        switch (action.type) {
            case REQUEST_FETCH_RESOURCE:
                return Object.assign({}, state, {
                    isFetching: true
                })
            case FETCH_RESOURCE_SUCCESS:
                return Object.assign({}, state, {
                    isFetching: false,
                    currentDetail: action.resource
                })
            case FETCH_RESOURCE_FAIL:
                return Object.assign({}), state, {
                    isFetching: false
                }
            case REQUEST_USER_CHALLENGES:
                return Object.assign({}, state, {
                    isFetchingChallenges: true
                })
            case RECEIVE_USER_CHALLENGES:
                return Object.assign({}, state, {
                    isFetchingChallenges: false,
                    currentDetail: {
                        ...state.currentDetail, 
                        challenges: action.data, 
                        id: action.id
                    }
                })
            case REQUEST_USER_REPLIES:
                return Object.assign({}, state, {
                    isFetchingReplies: true
                })
            case RECEIVE_USER_REPLIES:
                return Object.assign({}, state, {
                    isFetchingReplies: false,
                    currentDetail: {...state.currentDetail, replies: buildUserReplies(state, action.data)}
                })
            case REQUEST_USER_PROFILE:
                return Object.assign({}, state, {
                    isFetchingProfile: true
                })
            case RECEIVE_USER_PROFILE:
                return Object.assign({}, state, {
                    isFetchingProfile: false,
                    currentDetail: {...state.currentDetail, profile: action.profile}
                })
            default: return state
        }
}

function buildUserReplies(state, challenges) {
    let replies = []
    challenges.forEach(challenge => {
            challenge.replies.forEach(reply => {
                if (reply.userID == state.currentDetail.id) {
                    replies.push(reply)
                }
            })
    })

    return replies
}

function buildUserLeaderboard(users) {
    return users.map(user => {

        points = {
            total: 0,
            snowboard: 0,
            ski: 0,
            skateboard: 0,
            surf: 0
        }
        
        user.completedChallenges && user.completedChallenges.forEach(comepletedChallenge => {
            points.total += comepletedChallenge.votes.length
            points[completedChallenge] += comepletedChallenge.votes.length
        })

        return {...user, points}
    })
}