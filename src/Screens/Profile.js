import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import {
    View,
    Image,
    StyleSheet
}                           from 'react-native'
import { connect }          from 'react-redux'
import { 
    fetchResourceIfNeeded,
    fetchUserChallengesIfNeeded,
    fetchUserRepliesIfNeeded,
}                           from '../Actions'
import Profile              from '../Components/Profile/Profile'

class ProfileScreen extends Component {

    static propTypes = {
        challenge: PropTypes.object,
        auth: PropTypes.object,
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
    }

    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: (props) => {
            const activeTabStyle = props.focused ? styles.activeTabStyle : {}
            const imgSrc = props.focused ? require('../Images/profile_active.png') : require('../Images/profile.png')
            
            return (
                <View style={[styles.navTab, activeTabStyle]}>
                    <Image
                        source={imgSrc}
                        style={[styles.icon]}
                    />
                </View>
            )
        },

        gesturesEnabled: false,
        
    }

    constructor(props) {
        super(props)
        this.state = {
            challenges: [],
            replies: []
        }
    }

    componentDidMount() {
        const { auth } = this.props
        
        this._fetchProfileData(auth.profile._id)
    }

    _fetchProfileData(profileId) {
        const { dispatch } = this.props

        dispatch(fetchUserChallengesIfNeeded(profileId))
        dispatch(fetchUserRepliesIfNeeded(profileId))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.currentDetail.id == nextProps.auth.profile._id) {
            this.setState({
                challenges: nextProps.user.currentDetail.challenges,
                replies: nextProps.user.currentDetail.replies
            })
        }
    }
    
    render() {
        const { auth, user, navigation, dispatch } = this.props
        const { challenges, replies } = this.state
        let userProfile = auth.profile

        return (
            <Profile
                challenges={challenges}
                replies={replies}
                userProfile={userProfile}
                navigation={navigation}
                dispatch={dispatch}
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

export default connect(mapStateToProps)(ProfileScreen)

styles = StyleSheet.create({

    navTab: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#bdbdbd',
    },

    activeTabStyle: {
        backgroundColor: 'black',
        borderColor: 'black',
    },

    icon: {
        width: 23,
        height: 23,
    },
})
