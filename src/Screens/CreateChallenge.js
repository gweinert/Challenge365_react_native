import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text,
    View, 
    Image 
}                           from 'react-native';
import { connect }          from 'react-redux'
import ChallengeForm        from '../Components/Challenge/Form'
import Loader               from '../Components/Loader/Loader'




const CreateChallenge = (props) => {

    return (
        <View style={styles.container}>
            <Loader show={props.challenge.isPosting} />
            <Image source={require('../Images/bluebg_web.jpg')} style={styles.bgColor1}></Image>
            <Text style={styles.title}>Add New Challenge</Text>
            <ChallengeForm {...props}/>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { challenge, auth } = state

    return {
        challenge,
        auth
    }
}

CreateChallenge.navigationOptions = {
        tabBarLabel: 'Create',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: (props) => {
            const activeTabStyle = props.focused ? styles.activeTabStyle : {}
            const imgSrc = props.focused ? require('../Images/create_nc_active.png') : require('../Images/create_nc.png')
            
            return (
                <View style={[styles.navTab, activeTabStyle]}>
                    <Image
                        source={imgSrc}
                        style={[styles.icon]}
                    />
                </View>
            );
        },

        gesturesEnabled: false,
        
    }

export default connect(mapStateToProps)(CreateChallenge)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: 'transparent',
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 10,
    },

    bgColor1: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundColor: '#00243D',
    },
    
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
});