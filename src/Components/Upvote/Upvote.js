import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { 
    Text,
    View,
    TouchableOpacity,
    StyleSheet
}                                   from 'react-native'
import { createUpvoteIfNotPosting } from '../../Actions'
import { connect }                  from 'react-redux'

let styles

class Upvote extends Component {

    static propTypes = {
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        subId: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    _onPress = () => {
        const { type, id, subId, auth, dispatch } = this.props
        const upvote = {
            type,
            id,
            subId,
            userID: auth.profile.id
        }

        // console.log("thison press props", this)
        
        dispatch(createUpvoteIfNotPosting(upvote))
    
    }

    
    render() {
        const {
            style
        } = this.props

        return (
            <TouchableOpacity 
                style={[styles.upvote, style]}
                onPress={this._onPress}
            >
                <Text style={styles.checkmarkStem}></Text>
                <Text style={styles.checkmarkKick}></Text>
            </TouchableOpacity>
        )
    
    }
}

const mapStateToProps = (state) => {
    const { auth } = state

    return {
        auth
    }
}

export default connect(mapStateToProps)(Upvote)



styles = StyleSheet.create({
    upvote: {
        width: 30,
        height: 30,
        borderStyle: 'solid',
        borderRadius: 30 / 2,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'transparent',
        position: 'relative',
        transform: [{rotate: '45deg'}]        
    },
    checkmarkStem: {
        position: 'absolute',
        backgroundColor: 'black',
        width: 3,
        height: 12,
        left: 13,
        top: 8,
    },
    checkmarkKick: {
        position: 'absolute',
        width: 3,
        height: 3,
        backgroundColor: 'black',
        left: 10,
        top: 17
    }
})