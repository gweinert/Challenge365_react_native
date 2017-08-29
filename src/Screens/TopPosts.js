import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image
}                           from 'react-native'
import { connect }          from 'react-redux'
import { 
    fetchResourceIfNeeded
}                           from '../Actions'
import ReplyItem            from '../Components/Reply/Item'
import Dropdown             from '../Components/Dropdown/dropdown'

const FILTER_OPTIONS = ['All', 'Adventure', 'Hike', 'Bike', 'Snowboard', 'Skateboard', 'Surf']


class TopPosts extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        challenge: PropTypes.object,
        user: PropTypes.object,
    }
    
    static navigationOptions = {
        tabBarLabel: 'Top Posts',
        
        tabBarIcon: (props) => {
            const activeTabStyle = props.focused ? styles.activeTabStyle : {}
            const imgSrc = props.focused ? require('../Images/crown_nc_active.png') : require('../Images/crown_nc.png')
            
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
            scrollPositionY: 0,
            filter: FILTER_OPTIONS[0],
            replies: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.challenge.items.length !== this.state.replies.length) {
            this._buildReplies(nextProps.challenge)
        }
    }

    _onScroll = (event) => {
        this.setState({scrollPositionY: event.nativeEvent.contentOffset.y})
    }

    // @DEV what happens when we load more new challenges "pagination"
    _buildReplies = (challenge) => {
        const challenges = challenge.items
        let replies = []
        
        challenges.forEach(challenge => {
            challenge.replies.forEach(reply => {
                replies.push({...reply, challenge})
            })
        })

        // return replies
        this.setState({replies: replies})
    }

    _onFilterSelect = (filter) => {
        this.setState({filter})
    }
    
    render() {
        const { challenge, navigation } = this.props
        const { replies, filter } = this.state

        const filteredReplies = replies.length ? 
            replies.filter(reply => {
                return (reply.challenge.category.toLowerCase() === filter.toLowerCase()) || filter === 'All'
            }) 
            : []
        
        return (
            <View style={styles.container}>
                <Image source={require('../Images/bluebg_web.jpg')} style={styles.bgColor1}></Image>
                <Text style={styles.title}>Top Replies</Text>
                <Dropdown
                    children={FILTER_OPTIONS}
                    onSelect={this._onFilterSelect}
                    defaultValue={FILTER_OPTIONS[0]}
                    containerStyles={{marginBottom: 20}}
                    buttonTextStyles={{fontSize: 20, fontWeight: '600', color: '#fff', backgroundColor: 'transparent'}}
                    anchor="bottom"
                    arrow={true}
                    buttonStyles={{maxWidth: 150}}
                />
                <FlatList
                    onScroll={this._onScroll}
                    scrollEventThrottle={3}
                    //ListHeaderComponent={this.renderDetailHeader()}
                    data={filteredReplies}
                    keyExtractor={(item) => item._id}                    
                    renderItem={({item, index}) => (
                        <ReplyItem
                            navigation={navigation}
                            item={item}
                            challenge={item.challenge}
                            currentScrollPositionY={this.state.scrollPositionY}
                        />
                    )}
                />
            </View>
        )
    }
}

const mapStateTopProps = (state) => {
    const { user, challenge } = state
    return {
        user,
        challenge
    }
}

export default connect(mapStateTopProps)(TopPosts)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    bgColor1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00243D',
    },
    
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1, 
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
    info: {
        marginLeft: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
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