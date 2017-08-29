import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableHighlight, 
    FlatList,
    ScrollView,
    Image,
    Dimensions
}                               from 'react-native'
import { connect }              from 'react-redux'
import { 
    createResourceSafely,
    createBookmarkSafely
}                               from '../Actions'
import ChallengeItem            from '../Components/Challenge/Item'
import ReplyItem                from '../Components/Reply/Item'
import ImagePicker              from '../Components/ImagePicker/ImagePicker'
import DeleteButton             from '../Components/Buttons/DeleteButton'
import Dropdown                 from '../Components/Dropdown/dropdown'
import Loader                   from '../Components/Loader/Loader'
import SuccessIndicator         from '../Components/SuccessIndicator/SuccessIndicator'



const gs = require('../Styles/Global')
let { height, width } = Dimensions.get('window')
let styles
let headerStyles

class Detail extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        challenge: PropTypes.object,
        auth: PropTypes.object,
    }

    static navigationOptions = {
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: () => (
            <Image
                source={require('../Images/home_nc.png')}
                style={[styles.icon]}
            />
        ),
    }

    constructor(props) {
        super(props)
        this.state = {
            scrollPositionY: 0,
            bookmarkSuccess: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this._checkBookmarkSuccess(nextProps)
    }

    _checkBookmarkSuccess(nextProps) {
        if (this.props.auth.profile.bookmarkedChallenges && nextProps.auth.profile.bookmarkedChallenges.length !== this.props.auth.profile.bookmarkedChallenges.length) {
            this.setState({bookmarkSuccess: true})
            setTimeout(() => {
                this.setState({bookmarkSuccess: false})
            }, 1500)
        }
    }
    

    _onScroll = (event) => {
        this.setState({scrollPositionY: event.nativeEvent.contentOffset.y})
    }

    _onPressBackButton = () => {
        this.props.navigation.goBack()
    }

    _onDelete = () => {
        this.props.navigation.navigate('Home')
    }

    _onPhotoSelect = (imgSource) => {
         const {
            state,
            dispatch 
        }  = this.props.navigation
        const auth = state.params.auth

        const mediaFile = {
            uri: imgSource.uri,
            type: 'image/jpeg',
            name: imgSource.fileName || 'image1'
        }

        let formData = new FormData()
        formData.append("UserID", auth.profile._id)
        formData.append("Username", auth.profile.displayName)        
        formData.append("access_token", auth.profile.token)
        formData.append("ChallengeID", state.params.id)        
        formData.append("Reply", mediaFile)
        
        dispatch(createResourceSafely('reply', formData))
    }

    _bookmarkChallenge = () => {
        const { state, dispatch }  = this.props.navigation
        const { id, auth } = state.params        
        
        let formData = new FormData()
        formData.append("UserID", auth.profile._id)

        dispatch(createBookmarkSafely(formData, id))
    }

    renderDetailHeader() {
        const { challenge } = this.props
        const {
            state,
            dispatch } = this.props.navigation
        const { id, auth } = state.params
        const challengeItem = challenge.items.find(challenge => challenge._id == id)
        const buttonImageStyles = {
            width: 30,
            height: 30,
        }
        
        return (
            <View style={styles.header}>
                
                <ChallengeItem
                    styles={headerStyles}
                    item={challengeItem} 
                >
                </ChallengeItem>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{challengeItem.description}</Text>
                </View>
                <Dropdown
                    buttonStyles={{
                        width: 60,
                        paddingBottom: 10,
                        }
                    }
                >
                    <DeleteButton
                        resource="challenge"
                        id={challengeItem._id}
                        onDelete={this._onDelete}
                    />
                </Dropdown>
                <View style={styles.replyTextContainer}>
                    <Text style={styles.replyText}>REPLIES </Text>
                </View>
                
                <TouchableHighlight 
                    style={styles.backButton}
                    onPress={this._onPressBackButton}
                >
                    <View style={styles.arrow}></View>
                </TouchableHighlight>
                
                <TouchableHighlight
                    style={[styles.bookmarkButton, styles.cirlcleButton]}
                    onPress={this._bookmarkChallenge}
                >
                    <Image
                        style={styles.bookmarkImageStyle}
                        source={require('../Images/bookmark.png')}
                    />
                </TouchableHighlight>
                
                <View style={[styles.replyContainer, styles.cirlcleButton]}>
                    <ImagePicker
                        textStyles={{fontSize: 28, color: '#fff', lineHeight: 50}}
                        key={'same'}
                        buttonImage={require('../Images/reply.png')}
                        buttonImageStyles={buttonImageStyles}
                        onPhotoSelect={this._onPhotoSelect}
                    />
                </View>

                {this.state.bookmarkSuccess ?
                    <SuccessIndicator
                        text="Bookmarked!"
                    />

                    : null
                }
            </View>
        )
    }
    
    render(){

        const { challenge } = this.props
        const {
            state,
            dispatch } = this.props.navigation
        const { id, auth } = state.params
        const challengeItem = challenge.items.find(challenge => challenge._id == id)
        
        if (challengeItem) {
            return (
                <View style={[gs.container, styles.container]}>
                    <Loader show={challenge.isPosting}/>
                    <FlatList
                        onScroll={this._onScroll}
                        scrollEventThrottle={3}
                        ListHeaderComponent={this.renderDetailHeader()}
                        data={challengeItem.replies}
                        keyExtractor={(replyItem) => replyItem._id}
                        renderItem={({item}) => (
                                <ReplyItem
                                    navigation={this.props.navigation} 
                                    style={{flex: 1}}
                                    challenge={challengeItem}
                                    item={item}
                                    currentScrollPositionY={this.state.scrollPositionY}
                                />
                            )
                        }
                    />
                </View>
            );
        } else return null
    }
}

const mapStateToProps = (state) => ({
    challenge: state.challenge,
    auth: state.auth,
})

export default connect(mapStateToProps)(Detail)

styles = StyleSheet.create({
    container: {
        paddingBottom: 10
    },
    header: {
        flex: 0,
        position: 'relative',
    },
    margin: {
        marginLeft: 10
    },

    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width/2),
        height: height/2,
        position: 'absolute',
        right: 0,
        top: 0,
    },

    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'right',
        backgroundColor: 'transparent',
    },

    cirlcleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#bdbdbd',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#eeeeee',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 0
        }
    },

    bookmarkImageStyle: {
        width: 25,
        height: 25,
    },

    bookmarkButton: {
        position: 'absolute',
        right: 80,
        bottom: 60,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    replyContainer: {
        position: 'absolute',
        right: 10,
        bottom: 60,

    },

    replyTextContainer: {
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 15,
        
    },

    replyText: {
        color: 'grey',
        fontWeight: '700',
    },

    icon: {
        width: 26,
        height: 26,
    },

    backButton: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 20,
        left: 10,
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

    
})

headerStyles = StyleSheet.create({
    container: {
        width: width,
        position: 'relative',
    },

    bg: {
        flex: 1,
        width: '100%'
    },

    top: {
        width: (width/2) - 10,
    },

    bgImage: {
        flex: 1,
        width: '100%',
        height: height/2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
    },

    bgStyle: {
        position: 'absolute',
        left: 0,
        width: width,
        height: '100%',
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    bgLeft: {
        position: 'absolute',
        right: 0,
        width: (width/2),      
        height: '100%',
        paddingBottom: 10,        
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        
    }
})

