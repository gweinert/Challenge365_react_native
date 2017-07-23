import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text,
    View }                  from 'react-native';
import ChallengeForm        from '../Components/Challenge/Form'
import { connect }          from 'react-redux'



const CreateChallenge = (props) => {
    console.log("create-challenge", props)
    return (
        <View style={styles.container}>
            <ChallengeForm {...props}/>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { challenges, auth } = state

    return {
        challenges,
        auth
    }
}

export default connect(mapStateToProps)(CreateChallenge)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});