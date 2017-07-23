import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    ListView,
    FlatList,
    Button,
    TouchableOpacity,
    ActivityIndicator }     from 'react-native';
import {
    fetchChallengesIfNeeded,
    fetchUserDetailsIfNeeded,
    login }                 from '../Actions'
import { connect }          from 'react-redux'
import ChallengeItem        from '../Components/Challenge/Item'

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  LoginButton,
  AccessToken
} = FBSDK;


const gs                = require('../Styles/Global')
let styles

class Home extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `Challenges`,
        headerRight: (
            <Button
                title={'Add'}
                onPress={() => navigation.navigate("CreateChallenge")}
            />
        )
    })

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { dispatch } = this.props
        AccessToken.getCurrentAccessToken()
            .then( (data) => {
                if (data != null) {
                    dispatch(login(data))
                    dispatch(fetchUserDetailsIfNeeded(data.accessToken))
                }
            })
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchChallengesIfNeeded())
        
    }

    _onLoginFinished = (error, result) => {
        if (error) {
            alert("Login failed with error: " + result.error);
        } else if (result.isCancelled) {
            alert("Login was cancelled");
        } else {
            console.log("Login was successful with permissions: ")
            AccessToken.getCurrentAccessToken()
            .then( (data) => {
                console.log(data)
                this.props.dispatch(login(data))
            })
        }
    }

    _onChallengeItemPress = (item , index) => {
        const {
            auth,
            navigation
        } = this.props
        
        // navigation.navigate('Detail', {item, index, auth})
        navigation.navigate('Detail', {index, auth})
        
    }
    
    render() {
        console.log("HOME PROPS", this.props)
        if (!this.props.auth.isLoggedIn) {
            console.log("login with fb view")
            return (
                <View>
                    <LoginButton
                    readPermissions={["public_profile"]}
                    onLoginFinished={this._onLoginFinished}
                    onLogoutFinished={() => alert("User logged out")}/>
                </View>
            )
        }
        else if (this.props.challenges.isFetching) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
                </View>
            );
        }
        else {
            return (
                <View style={[gs.container, styles.container]}>
                    <FlatList
                        data={this.props.challenges.items}
                        keyExtractor={(item) => item._id}                    
                        renderItem={({item, index}) => (
                            <ChallengeItem 
                                item={item}
                                index={index} 
                                onPress={this._onChallengeItemPress}
                            >
                                <View
                                    style={[styles.replyPreview, gs.circle,  gs[`highlightBorder${item.theme}`]]}
                                    //class={`reply-preview circle highlight-${challenge.theme}`}
                                    //onclick={() => actions.router.go(`/challenge-detail/${index}`)}
                                >
                                    <Text
                                        style={[gs.circleText, gs[`highlightColor${item.theme}`]]}
                                    >
                                        {item.replies.length}
                                    </Text>
                                </View>
                            </ChallengeItem>
                        )}
                    />
                </View>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const { challenges, auth } = state

    return {
        challenges,
        auth
    }
}

export default connect(mapStateToProps)(Home)

styles = StyleSheet.create({
    
    container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    
    replyPreview: {
        position: 'absolute',
        right: 0,
        bottom: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'transparent'
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})