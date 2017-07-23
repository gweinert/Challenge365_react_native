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
        challenges: PropTypes.object.isRequired,
        title: PropTypes.oneOf([PropTypes.string, PropTypes.node])
    }

    static defaultProps = {
        title: 'Delete'
    }

    _onPress = () => {
        const {
            auth,
            challenges,
            dispatch,
            resource,
            id
        } = this.props
        
        let formData = new FormData()
        formData.append("UserID", auth.profile.id)
        
        dispatch(removeResourceSafely({resource, id, formData}))
    }

    render() {
        console.log("DELETEBUTTON", this)
        const {
            id,
            resource,
            auth,
            challenges,
            title
        } = this.props
        let itemToDelete

        // resource can be either challenge or reply. 
        // only things you can delete
        if (resource == 'challenge') {
            itemToDelete = challenges.items.find(challenge => (
                challenge.userID == auth.profile.id && challenge._id == id )
            )
        } else if (resource == 'reply') {
            challenges.items.every(challenge => {
                itemToDelete = challenge.replies.find(reply => (
                    reply.userID == auth.profile.id && reply._id == id)
                )
                if (itemToDelete != undefined) return false //leave loop early
            })
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
    const { auth, challenges } = state

    return {
        auth,
        challenges
    }
}

export default connect(mapStateToProps)(DeleteButton)