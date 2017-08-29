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
        auth: PropTypes.object.isRequired,
        color: PropTypes.string
    }

    static defaultProps = {
        color: '#fff'
    }

    _onPress = () => {
        const { type, id, subId, auth, dispatch } = this.props
        const upvote = {
            type,
            id,
            subId,
            userID: auth.profile._id
        }
        
        dispatch(createUpvoteIfNotPosting(upvote))
    
    }

    
    render() {
        const {
            color
        } = this.props
        
        return (
            <TouchableOpacity 
                style={[styles.upvote, {borderColor: color}]}
                onPress={this._onPress}
            >
                <View style={[styles.checkmarkStem, {backgroundColor: color}]}></View>
                <View style={[styles.checkmarkKick, {backgroundColor: color}]}></View>
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
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'transparent',
        position: 'relative',
        transform: [{rotate: '45deg'}]        
    },
    checkmarkStem: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 3,
        height: 12,
        left: 13,
        top: 8,
    },
    checkmarkKick: {
        position: 'absolute',
        width: 3,
        height: 3,
        backgroundColor: '#fff',
        left: 10,
        top: 17
    }
})