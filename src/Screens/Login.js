import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
}                           from 'react-native'
import { 
    fetchUserDetailsIfNeeded
}                           from '../Actions'
import { connect }          from 'react-redux'


const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken
} = FBSDK

let styles

class Login extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        auth: PropTypes.object
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this._requestUser()
    }

    componentWillReceiveProps(nextProps) {
        const { navigation } = this.props
        if (nextProps.auth.isLoggedIn && !this.props.auth.isLoggedIn) {
            navigation.navigate('App')
        }
    }

    _requestUser() {
        const { navigation } = this.props
        AccessToken.getCurrentAccessToken()
        .then( (data) => {
            if (data != null) {
                navigation.dispatch(fetchUserDetailsIfNeeded(data.accessToken))
            }
        })
    }

    _onLoginFinished = (error, result) => {
        if (error) {
            alert("Login failed with error: " + result.error);
        } else if (result.isCancelled) {
            alert("Login was cancelled");
        } else {
            console.log("Login was successful with permissions: ")
            this._requestUser()
        }
    }

    render() {
        const { auth } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Challenge Me</Text>
                { auth.isFetchingUser ? 
                    <ActivityIndicator />
                    :
                    <LoginButton
                        readPermissions={["public_profile"]}
                        onLoginFinished={this._onLoginFinished}
                        onLogoutFinished={() => alert("User logged out")}
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state

    return {
        auth
    }
}

export default connect(mapStateToProps)(Login)

styles = StyleSheet.create({
    
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    text: {
        fontSize: 24, 
        color: 'black'
    }

})