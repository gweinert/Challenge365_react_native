import React from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

const CHECKMARK_FACTOR = 3


let styles

const SuccessIndicator = ({text}) => (
    <View style={styles.bookmarkSuccessContainer}>
        <View style={styles.checkmarkContainer}>
            <View style={[styles.checkmarkStem]} />
            <View style={[styles.checkmarkKick]} />
        </View>
        <Text style={styles.bookmarkSuccessText}>{text}</Text>
    </View> 
)

SuccessIndicator.propTypes = {
    text: PropTypes.string
}

SuccessIndicator.defaultProps = {
    text: "Success!"
}

export default SuccessIndicator

styles = StyleSheet.create({
    bookmarkSuccessContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        backgroundColor: 'rgba(169, 169, 169, 0.7)',
        borderRadius: 10,
        top: '50%',
        left: '50%',
        marginLeft: -75,
        marginTop: 0,
    },

    checkmarkContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        position: 'relative',
        top: -40,
        transform: [{rotate: '45deg'}]       
    },

    bookmarkSuccessText: {
        color: '#fff',
        marginTop: 20,
        fontSize: 16,
    },

    checkmarkStem: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 3*CHECKMARK_FACTOR,
        height: 12*CHECKMARK_FACTOR,
        left: 13*CHECKMARK_FACTOR,
        top: 8*CHECKMARK_FACTOR,
    },
    checkmarkKick: {
        position: 'absolute',
        width: 3*CHECKMARK_FACTOR,
        height: 3*CHECKMARK_FACTOR,
        backgroundColor: '#fff',
        left: 10*CHECKMARK_FACTOR,
        top: 17*CHECKMARK_FACTOR
    }
})