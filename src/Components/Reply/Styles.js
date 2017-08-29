import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    itemContainer: {
        position: 'relative',
        backgroundColor: 'transparent',
        marginBottom: 15,
    },

    topInfo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    username: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        color: '#fff',
        fontWeight: '400',
        backgroundColor: 'transparent',
    },

    voteContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center',        
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    voteText: {
        marginLeft: 6,
        color: '#fff',
    },

    media: {
        borderWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderStyle: 'solid',
        borderRadius: 3,
        marginTop: 0,
    },

    image: {
        width: '100%',
        paddingTop: '120%'
    },
    video: {
        minHeight: 100,
        width: '100%',
        paddingTop: '120%'
    }

});