// const IP_ADDRESS = `192.168.1.53` // black velvet
 //const IP_ADDRESS = `192.168.0.192` //home
//const IP_ADDRESS = `192.168.0.105` //   hollys
//const IP_ADDRESS = `192.168.0.8` // sb

import {
    fetchUserDetailsIfNeeded,
    createBookmarkSafely,
    deleteBookmarkSafely,
    login,
    logout,
} from './Auth'

import { fetchChallengesIfNeeded }              from './Challenge'
import { createResourceSafely }                 from './Create'
import { removeResourceSafely }                 from './Delete'
import { fetchResourceIfNeeded }                from './Fetch'
import { createUpvoteIfNotPosting }             from './Upvote'
import { 
    fetchUserChallengesIfNeeded,
    fetchUserRepliesIfNeeded,
    fetchUserProfileIfNeeded,
}                                               from './User'



export { 
    fetchUserDetailsIfNeeded,
    createBookmarkSafely,
    deleteBookmarkSafely,
    login,
    logout,
    fetchChallengesIfNeeded,
    createResourceSafely,
    removeResourceSafely,
    fetchResourceIfNeeded,
    createUpvoteIfNotPosting,
    fetchUserChallengesIfNeeded,
    fetchUserRepliesIfNeeded,
    fetchUserProfileIfNeeded
 }