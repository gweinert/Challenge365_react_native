import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import { 
    View,
    TouchableHighlight
 }                          from 'react-native'
import { connect }          from 'react-redux'
import { 
    fetchResourceIfNeeded,
    fetchUserChallengesIfNeeded,
    fetchUserRepliesIfNeeded,
    fetchUserProfileIfNeeded,
}                           from '../Actions'
import Profile              from '../Components/Profile/Profile'

class UserProfileScreen extends Component {

    static propTypes = {
        challenge: PropTypes.object,
        auth: PropTypes.object,
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { navigation } = this.props
        const userId = navigation.state.params.id
        
        this._fetchProfileData(userId)
    }

    _fetchProfileData(userId) {
        const { dispatch } = this.props

        dispatch(fetchUserProfileIfNeeded(userId))
        dispatch(fetchUserChallengesIfNeeded(userId))
        dispatch(fetchUserRepliesIfNeeded(userId))
    }

    
    
    render() {
        const { auth, user, navigation } = this.props
        const { challenges, replies } = user.currentDetail
        let userProfile = user.currentDetail.profile
        

        return (
            <Profile
                challenges={challenges}
                replies={replies}
                userProfile={userProfile}
                navigation={navigation}
            />
        )

    }
}

const mapStateToProps = (state) => {
    const { auth, user } = state

    return {
        auth,
        user
    }
}

export default connect(mapStateToProps)(UserProfileScreen)

// styles = StyleSheet.create({

//     navTab: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         borderWidth: 1,
//         borderColor: '#bdbdbd',
//     },

//     activeTabStyle: {
//         backgroundColor: 'black',
//         borderColor: 'black',
//     },

//     icon: {
//         width: 23,
//         height: 23,
//     },
// })

