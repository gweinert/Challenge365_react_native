import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { 
    StyleSheet, 
    Text,
    View,
    Image,
    StatusBar,
    Dimensions,
    ActivityIndicator,
    TouchableHighlight,
}                           from 'react-native'
import { logout }           from '../../Actions'
import ChallengeItem        from '../../Components/Challenge/Item'
import TabGrid              from './TabGrid'


const FBSDK = require('react-native-fbsdk')
const { LoginButton } = FBSDK;

const { width, height } = Dimensions.get('window')
const gs                = require('../../Styles/Global')
let styles

class Profile extends Component {

    static propTypes = {
        challenge: PropTypes.object,
        auth: PropTypes.object,
        navigation: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
        challenges: PropTypes.array,
        replies: PropTypes.array,
        userProfile: PropTypes.object,
    }

    static defaultProps = {
        userProfile: {},
        challenges: [],
        replies: [],
    }

    constructor(props) {
        super(props)
    }

    _onGridItemPress = (id) => {
        const {
            auth,
            navigation,
        } = this.props

        if (this.state.activeTab == 'replies') {
            let reply = replies.find(reply => reply._id == id)
            id = reply.challengeId
        }
        
        navigation.navigate('Detail', {id, auth})
    }

    _onLogoutFinished = () => {
        const { navigation, dispatch } = this.props
        dispatch(logout())
        navigation.navigate("Login")
    }
    
    
    render() {
        const { 
            userProfile, 
            navigation, 
            challenges, 
            replies
        } = this.props
        
        const itemStyles = {
            container: {
                width: (width/2) - 30,
                height: (height / 3) - 30,
                marginLeft: 15,
                marginBottom: 15,
            }
        }

        const gridData = {
            challenges: challenges,
            replies: replies
        }

        if (userProfile && Object.keys(userProfile).length) {

            return (
                <View style={[gs.container, styles.container]}>
                    <StatusBar barStyle="light-content" />
                    
                    <Image source={require('../../Images/bluebg_web.jpg')} style={styles.bgColor1}></Image>
                    <View style={styles.top}>
                        
                        {navigation.state.params ? 
                            <TouchableHighlight 
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <View style={styles.arrow}></View>
                            </TouchableHighlight>
                            :
                            null
                        }
                
                        <Image 
                            style={styles.profileImage}
                            source={{uri: userProfile.profileImg}}
                        />
                        <Text style={styles.title}>{userProfile.displayName}</Text>
                    </View>

                    {!navigation.state.params ? 
                        <View style={styles.logoutButtonContainer}>
                            <LoginButton
                                onLogoutFinished={this._onLogoutFinished}
                            />
                        </View> 
                        : null
                    }

                    <TabGrid
                        data={gridData}
                        onGridItemPress={this._onGridItemPress}
                        itemStyles={itemStyles}
                    />
                
                </View>                    
            );
        }

        return <ActivityIndicator />        
    }
}

export default Profile

styles = StyleSheet.create({
    
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },

    bgColor1: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundColor: '#00243D',
    },

    top: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    backButton: {
        width: 30,
        height: 30,
        marginRight: 10,
    },

    arrow: {
        width: 20,
        height: 20,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginLeft: 10,
        marginTop: 6,
        padding: 3,
        borderColor: '#fff',
        transform: [{'rotate': '135deg'}]
    },

    logoutButtonContainer: {
        marginBottom: 10,
    },

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: 'transparent',
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 20,
    },

    

    navTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
})