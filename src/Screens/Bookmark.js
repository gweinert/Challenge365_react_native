import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text,
    View,
    FlatList,
    Button,
    TouchableOpacity,
    Image,
    BackgroundImage,
    StatusBar,
    Dimensions
}                           from 'react-native'
import { connect }          from 'react-redux'
import ChallengeItem        from '../Components/Challenge/Item'
import { deleteBookmarkSafely } from '../Actions'

const { width, height } = Dimensions.get('window')
const gs                = require('../Styles/Global')
let styles

class Bookmark extends Component {

    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: (props) => {
            const activeTabStyle = props.focused ? styles.activeTabStyle : {}
            const imgSrc = props.focused ? require('../Images/bookmark_active.png') : require('../Images/bookmark.png')
            
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
            bookmarks: [],
            showDelete: false
        }
        this._onChallengeItemPress = this._onChallengeItemPress.bind(this)
        this._onBookmarkLongPress = this._onBookmarkLongPress.bind(this)
        this._deleteBookmark = this._deleteBookmark.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.auth.profile.bookmarkedChallenges && nextProps.challenge.items.length) &&
            (nextProps.auth.profile.bookmarkedChallenges.length !== this.state.bookmarks.length)) {
            this._buildBookmarks(nextProps)
        }
    }

    _buildBookmarks(nextProps) {
        const { challenge, auth } = nextProps
        const challenges = challenge.items
        const bookmarkIds = auth.profile.bookmarkedChallenges        
        let bookmarks = []

        bookmarkIds.forEach(id => {
            if (id) {
                const bookmark = challenges.find(challenge => challenge._id == id)

                if (bookmark) {
                    bookmarks.push(bookmark)
                }
            }
        })

        this.setState({bookmarks})
    }

    _onChallengeItemPress(item) {
        const {
            auth,
            navigation
        } = this.props
        
        navigation.navigate('Detail', {id: item._id, auth})
        
    }

    _onBookmarkLongPress() {
        this.setState({showDelete: !this.state.showDelete})
    }

    _deleteBookmark(challengeId) {
        const { dispatch, auth } = this.props
        const formData = new FormData()
        formData.append("UserID", auth.profile._id)


        dispatch(deleteBookmarkSafely(formData, challengeId))
    }
    
    
    render() {

        const { bookmarks, showDelete } = this.state
        let groupedBookmarks = []
        
        bookmarks.length && bookmarks.forEach((el, i) => {
            if ((i) % 4 == 0) {
                groupedBookmarks.push([el])
            } else {
                groupedBookmarks[parseInt(i / 4)].push(el)
            }
        })

        const challengeItemStyles = {
            container: {
                width: (width/2) - 30,
                height: height / 3,
                marginLeft: 15,
                marginBottom: 15,
            },

            title: {
                color: '#fff',    
                marginTop: 0,
                marginBottom: 10,
                fontWeight: '300',
                fontSize: 20,
                backgroundColor: 'transparent',
            },

            text: {
                color: '#fff',
                margin: 0,
                fontWeight: '500',
                fontSize: 12,
                backgroundColor: 'transparent', 
            },
        }

        const showDeleteStyle = showDelete ? {height: 20, width: 20} : {height: 0, width: 0}

        return (
            <View style={[gs.container, styles.container]}>
                <StatusBar barStyle="light-content" />
                
                <Image source={require('../Images/bluebg_web.jpg')} style={styles.bgColor1}></Image>
                <Text style={styles.title}>BOOKMARKS</Text>
               
                <FlatList
                    horizontal={true}
                    data={groupedBookmarks}
                    extraData={bookmarks.length}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (
                        <View style={styles.bookmarkSep}
                                key={index}>
                            { item.map((challengeItem, chalIndex) => (
                                <View key={chalIndex} style={styles.bookmarkContainer}>

                                    <ChallengeItem
                                        key={challengeItem._id}
                                        styles={challengeItemStyles}
                                        item={challengeItem}
                                        onPress={this._onChallengeItemPress}
                                        onLongPress={this._onBookmarkLongPress}
                                        showVotes={false}
                                    />

                                    <TouchableOpacity
                                        style={[styles.bookmarkDelete, showDeleteStyle]}
                                        onPress={() => this._deleteBookmark(challengeItem._id)}
                                    >
                                        <Text style={styles.bookmarkDeleteText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { challenge, auth } = state

    return {
        challenge,
        auth
    }
}

export default connect(mapStateToProps)(Bookmark)

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

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: 'transparent',
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 20,
    },

    bookmarkContainer: {
        position: 'relative',
    },
    
    replyPreview: {
        backgroundColor: 'transparent'
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    text: {
        color: '#fff',
        margin: 0,
        fontWeight: '500',
        fontSize: 15,
    },

    bookmarkSep: {
        paddingTop: 10,
        maxWidth: width - 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    bookmarkDelete: {
        position: 'absolute',
        top: -10,
        left: 5,
        backgroundColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
    },

    bookmarkDeleteText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
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
        width: 16,
        height: 16,
    },
})