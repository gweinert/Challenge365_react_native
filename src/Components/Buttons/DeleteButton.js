import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    TouchableOpacity,
    Text
}                           from 'react-native'
import { connect }          from 'react-redux'
import { removeResourceSafely }   from '../../Actions'

class DeleteButton extends Component {

    static PropTypes = {
        id: PropTypes.string.isRequired,
        resource: PropTypes.string.isRequired,
        auth: PropTypes.object.isRequired,
        challenge: PropTypes.object.isRequired,
        title: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
        onDelete: PropTypes.func,
        
    }

    static defaultProps = {
        title: 'Delete',
        onDelete: () => {}
    }

    _onPress = () => {
        const {
            auth,
            dispatch,
            resource,
            id,
            onDelete
        } = this.props
        
        let formData = new FormData()
        formData.append("UserID", auth.profile._id)
        formData.append("access_token", auth.profile.token)
        
        dispatch(removeResourceSafely({resource, id, formData}, onDelete))
    }

    render() {

        const {
            id,
            resource,
            auth,
            challenge,
            title,
            parent
        } = this.props
        let challengeItem
        let itemToDelete

        // resource can be either challenge or reply. 
        // only things you can delete
        if (resource == 'challenge') {
            itemToDelete = challenge.items.find(challenge => (
                challenge.userID == auth.profile._id && challenge._id == id )
            )
        } else if (resource == 'reply') {
            if(parent) {
                challengeItem = parent
        
                itemToDelete = challengeItem.replies.find(reply => (
                    reply.userID == auth.profile._id && reply._id == id )
                )
            }
        }

        if (itemToDelete !== undefined) {
            return (
                <TouchableOpacity
                    onPress={this._onPress}>
                    <Text>{title}</Text>
                </TouchableOpacity>
            )
        } else return null
    }
}

const mapStateToProps = (state) => {
    const { auth, challenge } = state

    return {
        auth,
        challenge
    }
}

export default connect(mapStateToProps)(DeleteButton)