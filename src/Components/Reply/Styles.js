import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    media: {
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderStyle: 'solid',
        borderColor: '#e6e6e6',
        borderRadius: 3,
        marginTop: 0,
        marginBottom: 10,
    },

    image: {
        width: '100%',
        paddingTop: '100%'
    },
    video: {
        minHeight: 100,
        width: '100%',
        paddingTop: '100%'
    }

});